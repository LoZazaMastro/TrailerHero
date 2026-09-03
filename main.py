import asyncio
import base64
import difflib
import hashlib
import http.server
import json
import mimetypes
import os
import re
import secrets
import socket
import shutil
import subprocess
import tempfile
import threading
import time
import traceback
import struct
import unicodedata
import urllib.request
import urllib.parse
import uuid
from urllib.parse import urlparse
from pathlib import Path

import decky


IS_WINDOWS = os.name == "nt"


class Plugin:
    def __init__(self):
        self._cache = {}
        self._steam_app_list = None
        self._steam_app_list_loaded_at = 0
        self._steam_search_cache = {}
        self._plugin_dir = Path(
            getattr(decky, "DECKY_PLUGIN_DIR", Path(__file__).resolve().parent)
        )
        self._yt_dlp_name = "yt-dlp.exe" if IS_WINDOWS else "yt-dlp"
        self._yt_dlp_path = self._plugin_dir / self._yt_dlp_name
        self._deno_path = self._plugin_dir / ("deno.exe" if IS_WINDOWS else "deno")
        self._ffmpeg_name = "ffmpeg.exe" if IS_WINDOWS else "ffmpeg"
        self._ffmpeg_path = self._plugin_dir / self._ffmpeg_name
        settings_root = Path(
            getattr(decky, "DECKY_PLUGIN_SETTINGS_DIR", self._plugin_dir / "data")
        )
        self._settings_dir = settings_root
        self._trailers_dir = settings_root / "trailers"
        self._trailer_library_file = settings_root / "trailer-library.json"
        self._trailer_lock = threading.RLock()
        self._jobs_lock = threading.RLock()
        self._jobs = {}
        self._job_cancels = {}
        self._media_token = secrets.token_urlsafe(24)
        self._media_server = None
        self._media_thread = None
        self._preview_dir = Path(tempfile.gettempdir()) / "TrailerHeroPreview"
        self._preview_lock = threading.RLock()
        self._preview_jobs = {}

    async def _main(self):
        self._settings_dir.mkdir(parents=True, exist_ok=True)
        self._trailers_dir.mkdir(parents=True, exist_ok=True)
        self._preview_dir.mkdir(parents=True, exist_ok=True)
        self._cleanup_preview_cache()
        self._start_media_server()
        decky.logger.info("TrailerHero loaded")

    async def _unload(self):
        with self._jobs_lock:
            for cancel_event in self._job_cancels.values():
                cancel_event.set()
        server = self._media_server
        self._media_server = None
        if server:
            try:
                server.shutdown()
                server.server_close()
            except Exception:
                decky.logger.exception("TrailerHero media server shutdown failed")
        decky.logger.info("TrailerHero unloaded")

    async def get_steam_trailer_preview_status(self, preview_id: str) -> dict:
        return await asyncio.to_thread(self._get_steam_trailer_preview_status_sync, str(preview_id or ""))

    async def report_frontend_error(self, surface: str, message: str, stack: str = "") -> dict:
        clean_surface = self._trim_message(str(surface or "surface").replace("\n", " "), 80)
        clean_message = self._trim_message(str(message or "Unknown frontend error").replace("\n", " "), 500)
        clean_stack = self._trim_message(str(stack or "").replace("\r", ""), 3000)
        decky.logger.error(
            f"TrailerHero frontend error [{clean_surface}]: {clean_message}"
            + (f"\n{clean_stack}" if clean_stack else "")
        )
        return {"ok": True}

    async def get_local_trailer(self, appid: int = 0) -> dict:
        return await asyncio.to_thread(self._get_local_trailer_sync, int(appid or 0))

    async def get_steam_trailer_preview(
        self,
        appid: int,
        movie_id: str = "",
        quality: int = 2160
    ) -> dict:
        return await asyncio.to_thread(
            self._get_steam_trailer_preview_sync,
            int(appid),
            str(movie_id or ""),
            int(quality or 2160)
        )

    async def get_local_trailer_picker_start(self) -> dict:
        return await asyncio.to_thread(self._get_local_trailer_picker_start_sync)

    async def choose_local_trailer_file(self, start_path: str = "") -> dict:
        return await asyncio.to_thread(
            self._choose_local_trailer_file_sync,
            str(start_path or "")
        )

    async def inspect_local_trailer_path(self, path: str) -> dict:
        return await asyncio.to_thread(
            self._inspect_local_trailer_path_sync,
            str(path or "")
        )

    async def list_local_trailer_directory(self, path: str = "") -> dict:
        return await asyncio.to_thread(
            self._list_local_trailer_directory_sync,
            str(path or "")
        )

    async def import_local_trailer(self, appid: int, path: str, title: str = "") -> dict:
        return await asyncio.to_thread(
            self._import_local_trailer_sync,
            int(appid),
            str(path),
            str(title or "")
        )

    async def start_trailer_download(
        self,
        appid: int,
        source: str,
        value: str,
        quality: int = 1080,
        title: str = "",
        source_appid: int = 0
    ) -> dict:
        clean_appid = self._validate_appid(appid)
        clean_source = str(source or "").strip().lower()
        if clean_source not in {"steam", "youtube"}:
            raise ValueError("Unsupported trailer source")
        safe_quality = self._validate_quality(quality)
        job_id = self._create_job("download", 1)
        cancel_event = self._job_cancels[job_id]

        def worker():
            result = self._download_assignment_sync(
                clean_appid,
                clean_source,
                str(value or ""),
                safe_quality,
                str(title or ""),
                int(source_appid or 0),
                cancel_event,
                job_id
            )
            self._finish_job(job_id, result)

        self._launch_job(job_id, worker)
        return {"ok": True, "jobId": job_id}

    async def start_bulk_download(self, items: list, quality: int = 1080) -> dict:
        safe_quality = self._validate_quality(quality)
        clean_items = []
        for raw in list(items or [])[:5000]:
            if not isinstance(raw, dict):
                continue
            try:
                appid = self._validate_appid(raw.get("appid") or raw.get("appId"))
            except (TypeError, ValueError):
                continue
            clean_items.append({
                "appid": appid,
                "title": str(raw.get("title") or "").strip(),
                "source": str(raw.get("source") or "auto").strip().lower(),
                "value": str(raw.get("value") or "").strip(),
                "sourceAppId": int(raw.get("sourceAppId") or 0),
            })
        if not clean_items:
            return {"ok": False, "error": "No games available for bulk download"}
        job_id = self._create_job("bulk-download", len(clean_items))
        cancel_event = self._job_cancels[job_id]

        def worker():
            downloaded = 0
            failed = 0
            skipped = 0
            errors = []
            for index, item in enumerate(clean_items):
                if cancel_event.is_set():
                    self._cancelled_job(job_id, downloaded, failed, skipped)
                    return
                self._update_job(
                    job_id,
                    current=index,
                    currentTitle=item["title"],
                    message=f'{index + 1}/{len(clean_items)} · {item["title"]}'
                )
                try:
                    source, value, source_appid = self._resolve_bulk_source(item)
                    if not source or not value:
                        skipped += 1
                    else:
                        self._download_assignment_sync(
                            item["appid"], source, value, safe_quality,
                            item["title"], source_appid, cancel_event, None
                        )
                        downloaded += 1
                except InterruptedError:
                    self._cancelled_job(job_id, downloaded, failed, skipped)
                    return
                except Exception as error:
                    failed += 1
                    if len(errors) < 12:
                        errors.append({"appid": item["appid"], "title": item["title"], "error": str(error)})
                self._update_job(
                    job_id,
                    current=index + 1,
                    downloaded=downloaded,
                    failed=failed,
                    skipped=skipped
                )
            self._finish_job(job_id, {
                "ok": True,
                "downloaded": downloaded,
                "failed": failed,
                "skipped": skipped,
                "errors": errors
            })

        self._launch_job(job_id, worker)
        return {"ok": True, "jobId": job_id, "total": len(clean_items)}

    async def get_trailer_job(self, job_id: str) -> dict:
        with self._jobs_lock:
            job = self._jobs.get(str(job_id))
            return dict(job) if job else {"ok": False, "error": "Job not found"}

    async def cancel_trailer_job(self, job_id: str) -> dict:
        with self._jobs_lock:
            cancel_event = self._job_cancels.get(str(job_id))
            if not cancel_event:
                return {"ok": False, "error": "Job not found"}
            cancel_event.set()
            return {"ok": True, "jobId": str(job_id)}

    async def delete_local_trailer(self, appid: int) -> dict:
        return await asyncio.to_thread(self._delete_local_trailer_sync, int(appid))

    async def delete_all_local_trailers(self) -> dict:
        return await asyncio.to_thread(self._delete_all_local_trailers_sync)

    async def cleanup_unassigned_trailers(self) -> dict:
        return await asyncio.to_thread(self._cleanup_unassigned_trailers_sync)

    def _start_media_server(self):
        if self._media_server:
            return
        plugin = self

        class MediaHandler(http.server.BaseHTTPRequestHandler):
            protocol_version = "HTTP/1.1"

            def do_HEAD(self):
                self._serve(False)

            def do_GET(self):
                self._serve(True)

            def do_OPTIONS(self):
                self.send_response(204)
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
                self.send_header("Access-Control-Allow-Headers", "Range")
                self.send_header("Access-Control-Max-Age", "600")
                self.send_header("Cross-Origin-Resource-Policy", "cross-origin")
                self.send_header("Content-Length", "0")
                self.end_headers()

            def _serve(self, include_body: bool):
                parsed = urllib.parse.urlparse(self.path)
                parts = [part for part in parsed.path.split("/") if part]
                if len(parts) != 4 or parts[0] != plugin._media_token or parts[1] not in {"media", "preview"}:
                    self.send_error(404)
                    return
                try:
                    if parts[1] == "media":
                        appid = plugin._validate_appid(parts[2])
                        path = plugin._media_path_for(appid, parts[3])
                    else:
                        path = plugin._preview_media_path(parts[2], parts[3])
                except (TypeError, ValueError, FileNotFoundError):
                    self.send_error(404)
                    return
                size = path.stat().st_size
                start = 0
                end = size - 1
                range_header = self.headers.get("Range", "")
                if range_header:
                    match = re.match(r"bytes=(\d*)-(\d*)", range_header)
                    if not match:
                        self.send_error(416)
                        return
                    if match.group(1):
                        start = min(int(match.group(1)), max(0, size - 1))
                    if match.group(2):
                        end = min(int(match.group(2)), size - 1)
                    if start > end:
                        self.send_error(416)
                        return
                length = max(0, end - start + 1)
                self.send_response(206 if range_header else 200)
                self.send_header("Accept-Ranges", "bytes")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Access-Control-Allow-Headers", "Range")
                self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
                self.send_header("Access-Control-Expose-Headers", "Accept-Ranges, Content-Length, Content-Range")
                self.send_header("Cross-Origin-Resource-Policy", "cross-origin")
                self.send_header("Cache-Control", "no-cache")
                self.send_header("Content-Type", mimetypes.guess_type(path.name)[0] or "application/octet-stream")
                self.send_header("Content-Length", str(length))
                if range_header:
                    self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
                self.end_headers()
                if not include_body:
                    return
                try:
                    with path.open("rb") as stream:
                        stream.seek(start)
                        remaining = length
                        while remaining > 0:
                            chunk = stream.read(min(1024 * 1024, remaining))
                            if not chunk:
                                break
                            self.wfile.write(chunk)
                            remaining -= len(chunk)
                except (BrokenPipeError, ConnectionResetError):
                    return

            def log_message(self, _format, *_args):
                return

        server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), MediaHandler)
        server.daemon_threads = True
        self._media_server = server
        self._media_thread = threading.Thread(
            target=server.serve_forever,
            name="TrailerHeroMedia",
            daemon=True
        )
        self._media_thread.start()

    def _validate_appid(self, value) -> int:
        appid = int(value)
        if appid <= 0 or appid > 0xFFFFFFFF:
            raise ValueError("Invalid app id")
        return appid

    def _validate_quality(self, value) -> int:
        quality = int(value or 1080)
        if quality not in {720, 1080, 1440, 2160}:
            raise ValueError("Unsupported quality preset")
        return quality

    def _safe_media_path(self, relative_path: str) -> Path:
        root = self._trailers_dir.resolve()
        candidate = (root / str(relative_path or "")).resolve()
        try:
            candidate.relative_to(root)
        except ValueError as error:
            raise ValueError("Invalid trailer path") from error
        return candidate

    def _preview_media_path(self, preview_id: str, filename: str = "preview.mp4") -> Path:
        if not re.fullmatch(r"[a-f0-9]{24}", str(preview_id or "")):
            raise ValueError("Invalid preview id")
        if filename != "preview.mp4":
            raise ValueError("Invalid preview filename")
        root = self._preview_dir.resolve()
        candidate = (root / preview_id / filename).resolve()
        candidate.relative_to(root)
        if not candidate.is_file() or candidate.stat().st_size < 1024:
            raise FileNotFoundError(candidate)
        try:
            self._validate_video_file(candidate)
        except (OSError, ValueError) as error:
            raise FileNotFoundError(candidate) from error
        return candidate

    def _preview_url(self, preview_id: str) -> str:
        server = self._media_server
        if not server:
            return ""
        return f"http://127.0.0.1:{server.server_port}/{self._media_token}/preview/{preview_id}/preview.mp4"

    def _cleanup_preview_cache(self, max_entries: int = 6, max_age: int = 6 * 60 * 60):
        try:
            self._preview_dir.mkdir(parents=True, exist_ok=True)
            now = time.time()
            with self._preview_lock:
                active_preview_ids = {
                    key for key, job in self._preview_jobs.items()
                    if (
                        isinstance(job, dict)
                        and job.get("state") == "running"
                        and now - float(job.get("createdAt") or 0) <= 240
                    )
                }
            entries = sorted(
                (path for path in self._preview_dir.iterdir() if path.is_dir()),
                key=lambda path: path.stat().st_mtime,
                reverse=True
            )
            removable_index = 0
            for path in entries:
                try:
                    if path.name in active_preview_ids:
                        continue
                    if removable_index >= max_entries or now - path.stat().st_mtime > max_age:
                        shutil.rmtree(path, ignore_errors=True)
                    removable_index += 1
                except OSError:
                    pass
        except OSError:
            pass

    def _adaptive_preview_id(self, appid: int, movie_id: str, quality: int, url: str) -> str:
        raw = f"preview-clip-v3:{appid}:{movie_id}:{quality}:{url}".encode("utf-8")
        return hashlib.sha256(raw).hexdigest()[:24]

    def _get_steam_trailer_preview_status_sync(self, preview_id: str) -> dict:
        clean_id = str(preview_id or "")
        try:
            path = self._preview_media_path(clean_id)
            return {
                "ok": True,
                "ready": True,
                "pending": False,
                "previewId": clean_id,
                "url": self._preview_url(clean_id),
                "bytes": path.stat().st_size
            }
        except (ValueError, FileNotFoundError):
            pass
        with self._preview_lock:
            job = dict(self._preview_jobs.get(clean_id) or {})
        state = str(job.get("state") or "")
        age = time.time() - float(job.get("createdAt") or 0) if job else 0
        if state == "running" and age <= 240:
            return {
                "ok": True,
                "ready": False,
                "pending": True,
                "previewId": clean_id
            }
        if state == "failed" or job.get("error"):
            return {
                "ok": False,
                "ready": False,
                "pending": False,
                "previewId": clean_id,
                "error": str(job.get("error") or "Preview preparation failed")
            }
        if state == "running":
            return {
                "ok": False,
                "ready": False,
                "pending": False,
                "previewId": clean_id,
                "error": "Preview preparation timed out"
            }
        return {
            "ok": True,
            "ready": False,
            "pending": False,
            "previewId": clean_id
        }

    def _start_adaptive_preview(self, preview_id: str, urls, quality: int) -> bool:
        target_dir = self._preview_dir / preview_id
        final_path = target_dir / "preview.mp4"
        try:
            if final_path.is_file() and final_path.stat().st_size >= 1024:
                return False
            final_path.unlink(missing_ok=True)
        except OSError:
            pass

        source_values = urls if isinstance(urls, (list, tuple)) else [urls]
        sources = self._unique_urls([str(url or "").strip() for url in source_values])
        sources = [url for url in sources if url.startswith(("http://", "https://"))][:18]
        if not sources:
            return False

        now = time.time()
        job_token = uuid.uuid4().hex
        with self._preview_lock:
            current = dict(self._preview_jobs.get(preview_id) or {})
            current_age = now - float(current.get("createdAt") or 0)
            if current.get("state") == "running" and current_age < 180:
                return False
            self._preview_jobs[preview_id] = {
                "state": "running",
                "createdAt": now,
                "sourceCount": len(sources),
                "sourceIndex": 0,
                "token": job_token
            }

        def is_current_job() -> bool:
            with self._preview_lock:
                current_job = self._preview_jobs.get(preview_id) or {}
                return current_job.get("token") == job_token

        def worker():
            errors = []
            cancel_event = threading.Event()
            try:
                target_dir.mkdir(parents=True, exist_ok=True)
                for source_index, url in enumerate(sources):
                    if not is_current_job():
                        cancel_event.set()
                        return
                    staging = target_dir / f"preview-{job_token}-{source_index}.part.mp4"
                    try:
                        staging.unlink(missing_ok=True)
                    except OSError:
                        pass
                    with self._preview_lock:
                        current_job = self._preview_jobs.get(preview_id) or {}
                        if current_job.get("token") != job_token:
                            cancel_event.set()
                            return
                        current_job.update({
                            "sourceIndex": source_index,
                            "sourceUrl": url
                        })
                    try:
                        parsed_path = urllib.parse.urlparse(url).path.lower()
                        is_youtube_page = "youtube.com/" in url or "youtu.be/" in url
                        is_manifest = parsed_path.endswith((".m3u8", ".mpd"))
                        is_direct_iso = parsed_path.endswith((".mp4", ".m4v", ".mov"))
                        preview_quality = max(360, min(int(quality or 720), 720))
                        try:
                            self._download_adaptive_stream(
                                url,
                                staging,
                                preview_quality,
                                cancel_event,
                                prefer_compatibility=True,
                                preview_seconds=24
                            )
                        except Exception:
                            # A few Steam CDN files cannot be sectioned by yt-dlp. Keep a
                            # direct-file fallback instead of losing the preview entirely.
                            if is_direct_iso and not is_youtube_page and not is_manifest:
                                self._download_url(url, staging, cancel_event)
                            else:
                                raise
                        self._validate_video_file(staging)
                        if not is_current_job():
                            cancel_event.set()
                            staging.unlink(missing_ok=True)
                            return
                        os.replace(staging, final_path)
                        os.utime(target_dir, None)
                        with self._preview_lock:
                            current_job = self._preview_jobs.get(preview_id) or {}
                            if current_job.get("token") == job_token:
                                self._preview_jobs.pop(preview_id, None)
                        decky.logger.info(
                            f"TrailerHero preview ready: {preview_id} ({final_path.stat().st_size} bytes)"
                        )
                        self._cleanup_preview_cache()
                        return
                    except InterruptedError:
                        try:
                            staging.unlink(missing_ok=True)
                        except OSError:
                            pass
                        return
                    except Exception as error:
                        errors.append(f"{source_index + 1}/{len(sources)} {self._trim_message(str(error), 180)}")
                        try:
                            staging.unlink(missing_ok=True)
                        except OSError:
                            pass
                        decky.logger.warning(
                            f"TrailerHero preview source {source_index + 1}/{len(sources)} failed: {error}"
                        )
                raise RuntimeError(" | ".join(errors[-4:]) or "No preview source could be materialized")
            except Exception as error:
                with self._preview_lock:
                    current_job = self._preview_jobs.get(preview_id) or {}
                    if current_job.get("token") == job_token:
                        self._preview_jobs[preview_id] = {
                            "state": "failed",
                            "error": str(error),
                            "createdAt": time.time(),
                            "sourceCount": len(sources),
                            "token": job_token
                        }
                decky.logger.exception("TrailerHero preview materialization failed")

        threading.Thread(target=worker, name=f"TrailerHeroPreview-{preview_id[:6]}", daemon=True).start()
        return True

    def _load_trailer_library(self) -> dict:
        with self._trailer_lock:
            try:
                payload = json.loads(self._trailer_library_file.read_text(encoding="utf-8"))
            except (FileNotFoundError, json.JSONDecodeError, OSError):
                payload = {}
            assignments = payload.get("assignments") if isinstance(payload, dict) else None
            return {
                "version": 1,
                "assignments": assignments if isinstance(assignments, dict) else {}
            }

    def _save_trailer_library(self, library: dict):
        self._settings_dir.mkdir(parents=True, exist_ok=True)
        fd, temp_name = tempfile.mkstemp(
            prefix="trailer-library-",
            suffix=".tmp",
            dir=str(self._settings_dir)
        )
        try:
            with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as stream:
                json.dump(library, stream, ensure_ascii=False, indent=2, sort_keys=True)
                stream.flush()
                os.fsync(stream.fileno())
            os.replace(temp_name, self._trailer_library_file)
        finally:
            try:
                if os.path.exists(temp_name):
                    os.unlink(temp_name)
            except OSError:
                pass

    def _public_assignment(self, assignment: dict) -> dict:
        result = dict(assignment)
        appid = self._validate_appid(result.get("appid"))
        port = self._media_server.server_address[1] if self._media_server else 0
        base = f"http://127.0.0.1:{port}/{self._media_token}/media/{appid}"
        video_path = self._safe_media_path(result.get("video") or "")
        if not video_path.is_file():
            raise FileNotFoundError(video_path)
        result["videoUrl"] = f"{base}/video?v={int(video_path.stat().st_mtime_ns)}"
        result["videoBytes"] = video_path.stat().st_size
        audio_relative = result.get("audio")
        if audio_relative:
            audio_path = self._safe_media_path(audio_relative)
            if audio_path.is_file():
                result["audioUrl"] = f"{base}/audio?v={int(audio_path.stat().st_mtime_ns)}"
                result["audioBytes"] = audio_path.stat().st_size
        result["mode"] = "local"
        return result

    def _get_local_trailer_sync(self, appid: int = 0) -> dict:
        library = self._load_trailer_library()
        assignments = library["assignments"]
        if appid:
            key = str(self._validate_appid(appid))
            assignment = assignments.get(key)
            if not isinstance(assignment, dict):
                return {"ok": True, "appid": int(appid), "mode": "streaming", "assigned": False}
            try:
                return {"ok": True, "assigned": True, **self._public_assignment(assignment)}
            except (FileNotFoundError, ValueError):
                return {"ok": True, "appid": int(appid), "mode": "streaming", "assigned": False, "stale": True}
        entries = []
        stale = 0
        for assignment in assignments.values():
            if not isinstance(assignment, dict):
                continue
            try:
                entries.append(self._public_assignment(assignment))
            except (FileNotFoundError, ValueError):
                stale += 1
        entries.sort(key=lambda item: str(item.get("title") or item.get("appid")))
        return {"ok": True, "entries": entries, "count": len(entries), "stale": stale}

    def _media_path_for(self, appid: int, kind: str) -> Path:
        library = self._load_trailer_library()
        assignment = library["assignments"].get(str(appid))
        if not isinstance(assignment, dict):
            raise FileNotFoundError(appid)
        field = "video" if kind == "video" else "audio" if kind == "audio" else ""
        if not field or not assignment.get(field):
            raise FileNotFoundError(kind)
        path = self._safe_media_path(assignment[field])
        if not path.is_file():
            raise FileNotFoundError(path)
        return path

    def _validate_video_file(self, path: Path):
        if not path.is_file() or path.stat().st_size < 1024:
            raise ValueError("Selected video is empty or unreadable")
        extension = path.suffix.lower()
        if extension not in {".mp4", ".m4v", ".mov", ".webm", ".mkv"}:
            raise ValueError("Supported formats: MP4, M4V, MOV, WebM and MKV")
        with path.open("rb") as stream:
            header = stream.read(16)
        is_iso_media = len(header) >= 12 and header[4:8] == b"ftyp"
        is_ebml = header.startswith(b"\x1aE\xdf\xa3")
        if extension in {".mp4", ".m4v", ".mov"} and not is_iso_media:
            raise ValueError("The selected file is not a valid MP4/MOV video")
        if extension in {".webm", ".mkv"} and not is_ebml:
            raise ValueError("The selected file is not a valid WebM/MKV video")

    def _hash_file(self, path: Path) -> str:
        digest = hashlib.sha256()
        with path.open("rb") as stream:
            for chunk in iter(lambda: stream.read(1024 * 1024), b""):
                digest.update(chunk)
        return digest.hexdigest()

    def _commit_assignment(
        self,
        appid: int,
        video_path: Path,
        audio_path: Path | None,
        source: str,
        source_id: str,
        title: str,
        requested_quality: int | None = None,
        actual_height: int | None = None
    ) -> dict:
        clean_appid = self._validate_appid(appid)
        self._validate_video_file(video_path)
        assignment_id = uuid.uuid4().hex
        app_dir = self._trailers_dir / str(clean_appid)
        final_video = app_dir / f"{assignment_id}{video_path.suffix.lower()}"
        final_audio = app_dir / f"{assignment_id}-audio{audio_path.suffix.lower()}" if audio_path else None
        with self._trailer_lock:
            app_dir.mkdir(parents=True, exist_ok=True)
            os.replace(video_path, final_video)
            if audio_path:
                os.replace(audio_path, final_audio)
            assignment = {
                "appid": clean_appid,
                "title": title.strip() or f"App {clean_appid}",
                "source": source,
                "sourceId": source_id,
                "video": final_video.relative_to(self._trailers_dir).as_posix(),
                "audio": final_audio.relative_to(self._trailers_dir).as_posix() if final_audio else "",
                "requestedHeight": requested_quality or 0,
                "actualHeight": actual_height or 0,
                "sha256": self._hash_file(final_video),
                "createdAt": int(time.time())
            }
            library = self._load_trailer_library()
            old_assignment = library["assignments"].get(str(clean_appid))
            library["assignments"][str(clean_appid)] = assignment
            self._save_trailer_library(library)
            result = {"ok": True, "assigned": True, **self._public_assignment(assignment)}
            self._delete_assignment_files(old_assignment, keep={final_video, final_audio})
            return result

    def _delete_assignment_files(self, assignment, keep=None):
        if not isinstance(assignment, dict):
            return
        keep_paths = {path.resolve() for path in (keep or set()) if path}
        for field in ("video", "audio"):
            relative = assignment.get(field)
            if not relative:
                continue
            try:
                path = self._safe_media_path(relative)
                if path.resolve() not in keep_paths:
                    path.unlink(missing_ok=True)
            except (OSError, ValueError):
                decky.logger.warning("TrailerHero could not remove replaced media")

    def _get_local_trailer_picker_start_sync(self) -> dict:
        candidates = [Path.home()]
        if IS_WINDOWS:
            candidates.extend([Path(os.environ.get("USERPROFILE", "")), Path("C:/")])
        else:
            candidates.extend([Path("/home/deck"), Path("/")])
        for candidate in candidates:
            try:
                if str(candidate) and candidate.exists() and candidate.is_dir():
                    return {"ok": True, "path": str(candidate.resolve())}
            except (OSError, RuntimeError):
                continue
        return {"ok": True, "path": "C:/" if IS_WINDOWS else "/"}

    def _normalize_local_path_value(self, raw_path: str) -> str:
        value = str(raw_path or "").replace("\x00", "").strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
            value = value[1:-1].strip()
        if not value:
            return ""
        if value.lower().startswith("file:"):
            parsed = urllib.parse.urlparse(value)
            decoded_path = urllib.parse.unquote(parsed.path or "")
            netloc = urllib.parse.unquote(parsed.netloc or "")
            if IS_WINDOWS:
                if re.fullmatch(r"[A-Za-z]:", netloc):
                    value = f"{netloc}{decoded_path}"
                elif netloc and netloc.lower() != "localhost":
                    value = f"//{netloc}{decoded_path}"
                else:
                    value = decoded_path
                if re.match(r"^/[A-Za-z]:[/\\]", value):
                    value = value[1:]
                value = value.replace("/", "\\")
            else:
                value = f"//{netloc}{decoded_path}" if netloc and netloc != "localhost" else decoded_path
        return value

    def _choose_local_trailer_file_sync(self, start_path: str = "") -> dict:
        if not IS_WINDOWS:
            return {
                "ok": False,
                "supported": False,
                "cancelled": False,
                "error": "The native Windows picker is not available on this platform"
            }
        powershell = shutil.which("powershell.exe") or shutil.which("powershell") or shutil.which("pwsh.exe") or shutil.which("pwsh")
        if not powershell:
            system_root = os.environ.get("SystemRoot") or os.environ.get("WINDIR") or r"C:\Windows"
            bundled_powershell = Path(system_root) / "System32" / "WindowsPowerShell" / "v1.0" / "powershell.exe"
            if bundled_powershell.is_file():
                powershell = str(bundled_powershell)
        if not powershell:
            return {
                "ok": False,
                "supported": False,
                "cancelled": False,
                "error": "Windows PowerShell is not available"
            }

        normalized_start = self._normalize_local_path_value(start_path)
        try:
            start = Path(normalized_start).expanduser() if normalized_start else Path.home()
            if start.is_file():
                start = start.parent
            if not start.is_dir():
                start = Path.home()
            start = start.resolve()
        except (OSError, RuntimeError, ValueError):
            start = Path.home()

        script = r'''
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$dialog = New-Object System.Windows.Forms.OpenFileDialog
$dialog.Title = 'Choose a local trailer video'
$dialog.Filter = 'Video files (*.mp4;*.m4v;*.mov;*.webm;*.mkv)|*.mp4;*.m4v;*.mov;*.webm;*.mkv|All files (*.*)|*.*'
$dialog.Multiselect = $false
$dialog.CheckFileExists = $true
$dialog.CheckPathExists = $true
$dialog.DereferenceLinks = $true
$dialog.RestoreDirectory = $true
$dialog.AutoUpgradeEnabled = $true
$initial = $env:TRAILERHERO_PICKER_START
if ($initial -and [System.IO.Directory]::Exists($initial)) {
    $dialog.InitialDirectory = $initial
}
$owner = New-Object System.Windows.Forms.Form
$owner.ShowInTaskbar = $false
$owner.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::FixedToolWindow
$owner.StartPosition = [System.Windows.Forms.FormStartPosition]::Manual
$owner.Location = New-Object System.Drawing.Point(-32000, -32000)
$owner.Size = New-Object System.Drawing.Size(1, 1)
$owner.TopMost = $true
try {
    $owner.Show()
    $owner.Activate()
    $result = $dialog.ShowDialog($owner)
    if ($result -eq [System.Windows.Forms.DialogResult]::OK) {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($dialog.FileName)
        [Console]::Out.Write('THPICK:' + [Convert]::ToBase64String($bytes))
    } else {
        [Console]::Out.Write('THCANCEL')
    }
} finally {
    $dialog.Dispose()
    $owner.Close()
    $owner.Dispose()
}
'''
        env = os.environ.copy()
        env["TRAILERHERO_PICKER_START"] = str(start)
        creationflags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
        startupinfo = None
        if hasattr(subprocess, "STARTUPINFO"):
            startupinfo = subprocess.STARTUPINFO()
            startupinfo.dwFlags |= getattr(subprocess, "STARTF_USESHOWWINDOW", 0)
            startupinfo.wShowWindow = getattr(subprocess, "SW_HIDE", 0)
        try:
            result = subprocess.run(
                [
                    powershell,
                    "-NoLogo",
                    "-NoProfile",
                    "-STA",
                    "-ExecutionPolicy",
                    "Bypass",
                    "-Command",
                    script
                ],
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                env=env,
                creationflags=creationflags,
                startupinfo=startupinfo,
                timeout=60 * 60,
                check=False
            )
        except subprocess.TimeoutExpired:
            decky.logger.warning("TrailerHero native file picker timed out")
            return {
                "ok": False,
                "supported": True,
                "cancelled": False,
                "error": "The Windows file picker timed out"
            }
        except (OSError, subprocess.SubprocessError) as error:
            decky.logger.warning(f"TrailerHero native file picker failed to start: {error}")
            return {
                "ok": False,
                "supported": False,
                "cancelled": False,
                "error": "The Windows file picker could not be opened"
            }

        output = str(result.stdout or "").strip().lstrip("\ufeff")
        if result.returncode != 0:
            diagnostic = self._trim_message(result.stderr or output, 240)
            decky.logger.warning(f"TrailerHero native file picker failed: {diagnostic}")
            return {
                "ok": False,
                "supported": False,
                "cancelled": False,
                "error": "The Windows file picker could not be opened"
            }
        if "THCANCEL" in output or not output:
            return {"ok": True, "supported": True, "cancelled": True, "path": ""}
        match = re.search(r"THPICK:([A-Za-z0-9+/=]+)", output)
        if not match:
            return {
                "ok": False,
                "supported": True,
                "cancelled": False,
                "error": "The Windows file picker returned an invalid path"
            }
        try:
            selected_path = base64.b64decode(match.group(1), validate=True).decode("utf-8")
        except (ValueError, UnicodeDecodeError) as error:
            return {
                "ok": False,
                "supported": True,
                "cancelled": False,
                "error": f"The Windows file picker returned an invalid path: {error}"
            }
        info = self._inspect_local_trailer_path_sync(selected_path)
        return {**info, "supported": True, "cancelled": False}

    def _inspect_local_trailer_path_sync(self, raw_path: str) -> dict:
        value = self._normalize_local_path_value(raw_path)
        if not value:
            return {
                "ok": False,
                "exists": False,
                "isFile": False,
                "isDirectory": False,
                "path": "",
                "error": "No path was selected"
            }
        try:
            path = Path(value).expanduser().resolve()
            exists = path.exists()
            is_file = exists and path.is_file()
            is_directory = exists and path.is_dir()
            allowed_extensions = {".mp4", ".m4v", ".mov", ".webm", ".mkv"}
            valid_video = is_file and path.suffix.lower() in allowed_extensions
            error = ""
            if not exists:
                error = "The selected path does not exist"
            elif is_directory:
                error = "Select a video file instead of a folder"
            elif not valid_video:
                error = "Select an MP4, M4V, MOV, WebM or MKV video file"
            return {
                "ok": valid_video or is_directory,
                "exists": exists,
                "isFile": valid_video,
                "isDirectory": is_directory,
                "path": str(path),
                "parent": str(path.parent),
                "name": path.name,
                "extension": path.suffix.lower(),
                "error": error
            }
        except (OSError, RuntimeError, ValueError) as error:
            return {
                "ok": False,
                "exists": False,
                "isFile": False,
                "isDirectory": False,
                "path": value,
                "error": str(error) or "The selected path is not valid"
            }

    def _list_local_trailer_directory_sync(self, raw_path: str) -> dict:
        drives_sentinel = "__TRAILERHERO_DRIVES__"
        value = self._normalize_local_path_value(raw_path)
        if IS_WINDOWS and value == drives_sentinel:
            entries = []
            for code in range(ord("A"), ord("Z") + 1):
                drive = Path(f"{chr(code)}:/")
                try:
                    if drive.exists() and drive.is_dir():
                        entries.append({
                            "name": f"{chr(code)}:",
                            "path": str(drive),
                            "isDirectory": True,
                            "isFile": False,
                            "size": 0
                        })
                except OSError:
                    continue
            return {
                "ok": True,
                "path": drives_sentinel,
                "displayPath": "This PC",
                "parent": "",
                "entries": entries,
                "total": len(entries),
                "truncated": False,
                "virtualRoot": True
            }

        if not value:
            value = str(self._get_local_trailer_picker_start_sync().get("path") or ("C:/" if IS_WINDOWS else "/"))
        try:
            directory = Path(value).expanduser().resolve()
            if not directory.exists():
                return {
                    "ok": False,
                    "path": value,
                    "displayPath": value,
                    "parent": "",
                    "entries": [],
                    "error": "The selected folder does not exist"
                }
            if not directory.is_dir():
                directory = directory.parent
            allowed_extensions = {".mp4", ".m4v", ".mov", ".webm", ".mkv"}
            entries = []
            for child in directory.iterdir():
                try:
                    is_directory = child.is_dir()
                    is_file = child.is_file() and child.suffix.lower() in allowed_extensions
                    if not is_directory and not is_file:
                        continue
                    entries.append({
                        "name": child.name,
                        "path": str(child.resolve()),
                        "isDirectory": is_directory,
                        "isFile": is_file,
                        "size": int(child.stat().st_size) if is_file else 0
                    })
                except (OSError, RuntimeError):
                    continue
            entries.sort(key=lambda entry: (not entry["isDirectory"], entry["name"].casefold()))
            total = len(entries)
            max_entries = 800
            entries = entries[:max_entries]
            parent_path = ""
            try:
                parent = directory.parent
                if parent != directory:
                    parent_path = str(parent)
                elif IS_WINDOWS:
                    parent_path = drives_sentinel
            except (OSError, RuntimeError):
                parent_path = drives_sentinel if IS_WINDOWS else ""
            return {
                "ok": True,
                "path": str(directory),
                "displayPath": str(directory),
                "parent": parent_path,
                "entries": entries,
                "total": total,
                "truncated": total > len(entries),
                "virtualRoot": False
            }
        except (OSError, RuntimeError, ValueError) as error:
            return {
                "ok": False,
                "path": value,
                "displayPath": value,
                "parent": "",
                "entries": [],
                "error": str(error) or "The selected folder could not be opened"
            }

    def _import_local_trailer_sync(self, appid: int, raw_path: str, title: str) -> dict:
        clean_appid = self._validate_appid(appid)
        source_value = self._normalize_local_path_value(raw_path)
        if not source_value:
            raise ValueError("No trailer file was selected")
        source_path = Path(source_value).expanduser().resolve()
        self._validate_video_file(source_path)
        staging = Path(tempfile.mkdtemp(prefix="import-", dir=str(self._trailers_dir)))
        try:
            staged_video = staging / f"video{source_path.suffix.lower()}"
            shutil.copy2(source_path, staged_video)
            return self._commit_assignment(
                clean_appid,
                staged_video,
                None,
                "import",
                str(source_path.name),
                title
            )
        finally:
            shutil.rmtree(staging, ignore_errors=True)

    def _create_job(self, kind: str, total: int) -> str:
        job_id = uuid.uuid4().hex
        with self._jobs_lock:
            self._jobs[job_id] = {
                "ok": True,
                "jobId": job_id,
                "kind": kind,
                "state": "queued",
                "current": 0,
                "total": total,
                "createdAt": int(time.time())
            }
            self._job_cancels[job_id] = threading.Event()
            if len(self._jobs) > 80:
                finished = [key for key, value in self._jobs.items() if value.get("state") in {"done", "failed", "cancelled"}]
                for old_id in finished[:-40]:
                    self._jobs.pop(old_id, None)
                    self._job_cancels.pop(old_id, None)
        return job_id

    def _launch_job(self, job_id: str, worker):
        def run():
            self._update_job(job_id, state="running", startedAt=int(time.time()))
            try:
                worker()
            except InterruptedError:
                self._update_job(job_id, state="cancelled", finishedAt=int(time.time()))
            except Exception as error:
                decky.logger.exception("TrailerHero job failed")
                self._update_job(
                    job_id,
                    state="failed",
                    error=str(error),
                    finishedAt=int(time.time())
                )
        threading.Thread(target=run, name=f"TrailerHeroJob-{job_id[:8]}", daemon=True).start()

    def _update_job(self, job_id: str, **changes):
        with self._jobs_lock:
            if job_id in self._jobs:
                self._jobs[job_id].update(changes)

    def _finish_job(self, job_id: str, result: dict):
        self._update_job(
            job_id,
            state="done" if result.get("ok") else "failed",
            result=result,
            current=self._jobs.get(job_id, {}).get("total", 1),
            finishedAt=int(time.time())
        )

    def _cancelled_job(self, job_id: str, downloaded: int, failed: int, skipped: int):
        self._update_job(
            job_id,
            state="cancelled",
            downloaded=downloaded,
            failed=failed,
            skipped=skipped,
            finishedAt=int(time.time())
        )

    def _download_url(self, url: str, destination: Path, cancel_event: threading.Event, progress=None):
        request = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 TrailerHero/1.5", "Accept": "*/*"}
        )
        with urllib.request.urlopen(request, timeout=30) as response, destination.open("wb") as output:
            total = int(response.headers.get("Content-Length") or 0)
            if total > 20 * 1024 * 1024 * 1024:
                raise ValueError("Trailer exceeds the 20 GB safety limit")
            if total:
                free = shutil.disk_usage(destination.parent).free
                if total + 512 * 1024 * 1024 > free:
                    raise OSError("Not enough free space to save this trailer")
            written = 0
            while True:
                if cancel_event.is_set():
                    raise InterruptedError("Download cancelled")
                chunk = response.read(1024 * 1024)
                if not chunk:
                    break
                output.write(chunk)
                written += len(chunk)
                if written > 20 * 1024 * 1024 * 1024:
                    raise ValueError("Trailer exceeds the 20 GB safety limit")
                if progress and total:
                    progress(min(0.99, written / total))
            output.flush()
            os.fsync(output.fileno())

    def _url_extension(self, url: str, fallback: str = ".mp4") -> str:
        suffix = Path(urllib.parse.urlparse(url).path).suffix.lower()
        return suffix if suffix in {".mp4", ".m4v", ".mov", ".webm", ".mkv", ".m4a", ".aac", ".ogg", ".opus"} else fallback

    def _download_adaptive_stream(
        self,
        url: str,
        destination: Path,
        quality: int,
        cancel_event: threading.Event | None = None,
        job_id: str | None = None,
        prefer_compatibility: bool = False,
        preview_seconds: int | None = None
    ):
        if not self._yt_dlp_path.is_file():
            raise RuntimeError("Bundled yt-dlp is missing")
        if not self._ffmpeg_path.is_file():
            raise RuntimeError("Bundled ffmpeg is missing")
        destination.parent.mkdir(parents=True, exist_ok=True)
        safe_quality = max(360, min(int(quality or 1080), 2160))
        format_selector = (
            f"bv*[vcodec^=avc1][height<={safe_quality}]+ba[acodec^=mp4a]/"
            f"bv*[vcodec^=avc1][height<={safe_quality}]+ba/"
            f"b[ext=mp4][height<={safe_quality}]/"
            f"bv*[height<={safe_quality}]+ba/b[height<={safe_quality}]/b"
        )
        if prefer_compatibility:
            # Prefer a progressive AVC/AAC MP4 for SteamUI previews. Split streams
            # remain as fallbacks when a progressive rendition is unavailable.
            format_selector = (
                f"b[ext=mp4][vcodec^=avc1][acodec^=mp4a][height<={safe_quality}]/"
                f"bv*[vcodec^=avc1][height<={safe_quality}]+ba[acodec^=mp4a]/"
                f"b[vcodec^=avc1][ext=mp4][height<={safe_quality}]/"
                f"bv*[ext=mp4][height<={safe_quality}]+ba[ext=m4a]/"
                f"b[ext=mp4][height<={safe_quality}]/"
                f"bv*[height<={safe_quality}]+ba/b[height<={safe_quality}]/b"
            )
        base_command = [
            str(self._yt_dlp_path),
            "--no-playlist", "--no-part", "--newline", "--no-cookies",
            "--force-ipv4", "--socket-timeout", "12",
            "--retries", "3", "--fragment-retries", "3", "--extractor-retries", "3",
            "--ffmpeg-location", str(self._ffmpeg_path.parent),
            "-f", format_selector,
            "--merge-output-format", "mp4",
            "--remux-video", "mp4",
        ]
        if preview_seconds:
            clip_seconds = max(8, min(int(preview_seconds), 45))
            base_command.extend([
                "--download-sections", f"*00:00:00-00:00:{clip_seconds:02d}",
                "--concurrent-fragments", "4"
            ])
        base_command.extend(["-o", str(destination)])
        if self._deno_path.is_file():
            base_command.extend(["--js-runtimes", f"deno:{self._deno_path}", "--remote-components", "ejs:npm"])
        is_youtube = "youtube.com/" in url or "youtu.be/" in url
        attempts = [base_command + [url]]
        if is_youtube:
            attempts.append(base_command + [
                "--extractor-args", "youtube:player_client=web_safari,tv_simply,android_vr",
                url,
            ])
        creationflags = getattr(subprocess, "CREATE_NO_WINDOW", 0) if IS_WINDOWS else 0
        startupinfo = None
        if IS_WINDOWS and hasattr(subprocess, "STARTUPINFO"):
            startupinfo = subprocess.STARTUPINFO()
            startupinfo.dwFlags |= getattr(subprocess, "STARTF_USESHOWWINDOW", 0)
            startupinfo.wShowWindow = getattr(subprocess, "SW_HIDE", 0)
        last_tail = []
        for attempt_index, command in enumerate(attempts):
            destination.unlink(missing_ok=True)
            decky.logger.info(f"TrailerHero yt-dlp materialization attempt {attempt_index + 1}/{len(attempts)}")
            process = subprocess.Popen(
                command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True,
                encoding="utf-8", errors="replace", creationflags=creationflags,
                startupinfo=startupinfo
            )
            tail = []
            try:
                assert process.stdout is not None
                while True:
                    if cancel_event and cancel_event.is_set():
                        process.terminate()
                        raise InterruptedError("Download cancelled")
                    line = process.stdout.readline()
                    if line:
                        tail.append(line.strip())
                        tail = tail[-30:]
                        match = re.search(r"\[download\]\s+([0-9.]+)%", line)
                        if match and job_id:
                            self._update_job(job_id, progress=min(0.99, float(match.group(1)) / 100.0))
                    elif process.poll() is not None:
                        break
                    else:
                        time.sleep(0.05)
                if process.returncode == 0 and destination.is_file() and destination.stat().st_size >= 1024:
                    return
                last_tail = tail
                decky.logger.warning("TrailerHero yt-dlp attempt failed; refreshing extraction with alternate anonymous clients")
            finally:
                if process.poll() is None:
                    process.kill()
        diagnostic = " | ".join(last_tail[-6:])
        if is_youtube:
            raise RuntimeError("YouTube download blocked after extractor/EJS refresh (possible PO-token enforcement): " + diagnostic)
        raise RuntimeError("yt-dlp/ffmpeg failed: " + diagnostic)

    def _download_assignment_sync(
        self,
        appid: int,
        source: str,
        value: str,
        quality: int,
        title: str,
        source_appid: int,
        cancel_event: threading.Event,
        job_id: str | None
    ) -> dict:
        staging = Path(tempfile.mkdtemp(prefix="download-", dir=str(self._trailers_dir)))
        try:
            video_url = ""
            audio_url = ""
            video_extension = ".mp4"
            audio_extension = ".m4a"
            actual_height = 0
            source_id = value
            if source == "youtube":
                video_id = self._extract_youtube_id(value)
                if not video_id:
                    raise ValueError("Invalid YouTube trailer")
                video_url = f"https://www.youtube.com/watch?v={video_id}"
                video_extension = ".mp4"
                actual_height = quality
                source_id = video_id
                title = title or "YouTube trailer"
            else:
                steam_appid = self._validate_appid(source_appid or appid)
                steam = self._resolve_steam_download(steam_appid, value, quality)
                video_url = steam["url"]
                actual_height = steam["height"]
                video_extension = self._url_extension(video_url, ".mp4")
                source_id = steam["movieId"]
                title = title or steam["name"]
            if cancel_event.is_set():
                raise InterruptedError("Download cancelled")
            if video_extension not in {".mp4", ".m4v", ".mov", ".webm", ".mkv"}:
                video_extension = self._url_extension(video_url, ".mp4")
            video_path = staging / f"video{video_extension}"
            if source == "youtube" or (source == "steam" and steam.get("adaptive")):
                video_path = staging / "video.mp4"
                self._download_adaptive_stream(video_url, video_path, quality, cancel_event, job_id)
            else:
                self._download_url(
                    video_url,
                    video_path,
                    cancel_event,
                    (lambda ratio: self._update_job(job_id, progress=ratio)) if job_id else None
                )
            audio_path = None
            if audio_url:
                if audio_extension not in {".m4a", ".mp4", ".aac", ".webm", ".ogg", ".opus"}:
                    audio_extension = self._url_extension(audio_url, ".m4a")
                audio_path = staging / f"audio{audio_extension}"
                self._download_url(audio_url, audio_path, cancel_event)
            return self._commit_assignment(
                appid,
                video_path,
                audio_path,
                source,
                source_id,
                title,
                quality,
                actual_height
            )
        finally:
            shutil.rmtree(staging, ignore_errors=True)

    def _resolve_steam_download(self, appid: int, movie_id: str, quality: int) -> dict:
        payload = self._fetch_appdetails(appid)
        movies = payload.get(str(appid), {}).get("data", {}).get("movies") or []
        selected = next((movie for movie in movies if str(movie.get("id")) == str(movie_id)), None)
        selected = selected or self._pick_movie(movies) if movies else None
        if not selected:
            raise RuntimeError("No Steam trailer available")
        candidates = []
        for group_name in ("mp4", "webm"):
            group = selected.get(group_name)
            if not isinstance(group, dict):
                continue
            for label, url in group.items():
                if not isinstance(url, str) or not url.startswith(("http://", "https://")):
                    continue
                match = re.search(r"(2160|1440|1080|720|480)", str(label)) or re.search(r"(2160|1440|1080|720|480)", url)
                height = int(match.group(1)) if match else quality
                candidates.append({"url": url, "height": height, "group": group_name})
        if not candidates:
            for field in ("hls_h264", "dash_h264", "dash_av1"):
                url = selected.get(field)
                if isinstance(url, str) and url.startswith(("http://", "https://")):
                    return {
                        "url": url,
                        "height": quality,
                        "movieId": str(selected.get("id") or ""),
                        "name": str(selected.get("name") or "Steam trailer"),
                        "adaptive": True,
                        "format": "hls" if field.startswith("hls") else "dash"
                    }
            raise RuntimeError("Steam trailer has no downloadable file or adaptive manifest")
        candidates.sort(key=lambda item: (
            item["height"] > quality,
            abs(quality - item["height"]),
            -item["height"],
            item["group"] != "mp4"
        ))
        selected_file = candidates[0]
        return {
            "url": selected_file["url"],
            "height": selected_file["height"],
            "movieId": str(selected.get("id") or ""),
            "name": str(selected.get("name") or "Steam trailer"),
            "adaptive": False
        }

    def _resolve_steam_preview(self, appid: int, movie_id: str, quality: int) -> dict:
        payload = self._fetch_appdetails(appid)
        app_data = payload.get(str(appid), {})
        movies = app_data.get("data", {}).get("movies") or []
        requested_id = str(movie_id or "")
        selected = next(
            (movie for movie in movies if str(movie.get("id") or "") == requested_id),
            None
        )
        selected = selected or (self._pick_movie(movies) if movies else None)
        if not selected:
            raise RuntimeError("No Steam trailer available")

        direct_candidates = []
        for group_name in ("mp4", "webm"):
            group = selected.get(group_name)
            if not isinstance(group, dict):
                continue
            for label, url in group.items():
                if not isinstance(url, str) or not url.startswith(("http://", "https://")):
                    continue
                match = re.search(r"(2160|1440|1080|720|480)", str(label)) or re.search(
                    r"(2160|1440|1080|720|480)", url
                )
                height = int(match.group(1)) if match else quality
                direct_candidates.append({
                    "url": url,
                    "height": height,
                    "kind": "file",
                    "format": group_name,
                    "generated": False
                })

        movie_asset_id = str(selected.get("id") or "")
        if movie_asset_id:
            generated_variants = (
                ("movie2160.mp4", 2160),
                ("movie1440.mp4", 1440),
                ("movie1080.mp4", 1080),
                ("movie720.mp4", 720),
                ("movie_max.mp4", 1080),
                ("movie480.mp4", 480),
            )
            for base in (
                f"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/{movie_asset_id}",
                f"https://cdn.akamai.steamstatic.com/steam/apps/{movie_asset_id}"
            ):
                for filename, height in generated_variants:
                    direct_candidates.append({
                        "url": f"{base}/{filename}",
                        "height": height,
                        "kind": "file",
                        "format": "mp4",
                        "generated": True
                    })

        direct_candidates.sort(key=lambda item: (
            bool(item.get("generated")),
            item["height"] > quality,
            abs(quality - item["height"]),
            -item["height"],
            item["format"] != "mp4"
        ))

        adaptive_candidates = []
        for field, format_name in (
            ("hls_h264", "hls"),
            ("dash_h264", "dash"),
            ("dash_av1", "dash-av1")
        ):
            url = selected.get(field)
            if isinstance(url, str) and url.startswith(("http://", "https://")):
                adaptive_candidates.append({
                    "url": url,
                    "height": quality,
                    "kind": "stream",
                    "format": format_name,
                    "generated": False
                })

        declared_direct = [candidate for candidate in direct_candidates if not candidate.get("generated")]
        generated_direct = [candidate for candidate in direct_candidates if candidate.get("generated")]
        if declared_direct:
            selected_source = declared_direct[0]
        elif adaptive_candidates:
            selected_source = adaptive_candidates[0]
        elif generated_direct:
            selected_source = generated_direct[0]
        else:
            raise RuntimeError("Steam trailer has no playable source")

        direct_urls = self._unique_urls([candidate["url"] for candidate in direct_candidates])
        declared_urls = [candidate["url"] for candidate in direct_candidates if not candidate.get("generated")]
        adaptive_urls = [candidate["url"] for candidate in adaptive_candidates]
        generated_urls = [candidate["url"] for candidate in direct_candidates if candidate.get("generated")]
        materialization_candidates = self._unique_urls([
            selected_source["url"],
            *declared_urls,
            *adaptive_urls,
            *generated_urls
        ])
        poster = selected.get("thumbnail")
        return {
            "url": selected_source["url"],
            "height": selected_source["height"],
            "movieId": movie_asset_id,
            "name": str(selected.get("name") or "Steam trailer"),
            "poster": poster if isinstance(poster, str) else "",
            "streaming": selected_source["kind"] == "stream",
            "format": selected_source["format"],
            "candidates": direct_urls,
            "adaptiveCandidates": adaptive_urls,
            "materializationCandidates": materialization_candidates,
            "requestedMovieId": requested_id,
            "catalogRefreshed": True
        }

    def _resolve_bulk_source(self, item: dict) -> tuple[str, str, int]:
        source = item.get("source")
        value = item.get("value")
        source_appid = int(item.get("sourceAppId") or 0)
        if source in {"steam", "youtube"} and value:
            return source, value, source_appid
        appid = item["appid"]
        if appid < 2147483648:
            trailer = self._get_steam_trailer_sync(appid)
            if trailer.get("ok"):
                return "steam", str(trailer.get("movieId") or ""), appid
        title = item.get("title") or ""
        if title:
            result = self._search_youtube_trailer_sync(title)
            if result.get("ok") and result.get("videoId"):
                return "youtube", str(result["videoId"]), 0
        return "", "", 0

    def _delete_local_trailer_sync(self, appid: int) -> dict:
        clean_appid = self._validate_appid(appid)
        with self._trailer_lock:
            library = self._load_trailer_library()
            assignment = library["assignments"].pop(str(clean_appid), None)
            self._save_trailer_library(library)
        self._delete_assignment_files(assignment)
        return {"ok": True, "appid": clean_appid, "deleted": bool(assignment)}

    def _delete_all_local_trailers_sync(self) -> dict:
        with self._trailer_lock:
            library = self._load_trailer_library()
            assignments = list(library["assignments"].values())
            library["assignments"] = {}
            self._save_trailer_library(library)
        for assignment in assignments:
            self._delete_assignment_files(assignment)
        cleanup = self._cleanup_unassigned_trailers_sync()
        return {"ok": True, "deleted": len(assignments), "filesRemoved": cleanup.get("filesRemoved", 0)}

    def _cleanup_unassigned_trailers_sync(self) -> dict:
        with self._trailer_lock:
            library = self._load_trailer_library()
            referenced = set()
            for assignment in library["assignments"].values():
                if not isinstance(assignment, dict):
                    continue
                for field in ("video", "audio"):
                    if assignment.get(field):
                        try:
                            referenced.add(self._safe_media_path(assignment[field]).resolve())
                        except ValueError:
                            pass
            removed = 0
            bytes_removed = 0
            for path in self._trailers_dir.rglob("*"):
                if not path.is_file() or path.resolve() in referenced:
                    continue
                if any(part.startswith(("download-", "import-")) for part in path.parts):
                    try:
                        if time.time() - path.stat().st_mtime < 6 * 60 * 60:
                            continue
                    except OSError:
                        continue
                try:
                    bytes_removed += path.stat().st_size
                    path.unlink()
                    removed += 1
                except OSError:
                    decky.logger.warning("TrailerHero could not remove an unassigned trailer")
            for directory in sorted(self._trailers_dir.rglob("*"), key=lambda path: len(path.parts), reverse=True):
                if directory.is_dir():
                    try:
                        directory.rmdir()
                    except OSError:
                        pass
        return {"ok": True, "filesRemoved": removed, "bytesRemoved": bytes_removed}

    def _get_steam_trailer_preview_sync(self, appid: int, movie_id: str, quality: int) -> dict:
        clean_appid = self._validate_appid(appid)
        safe_quality = self._validate_quality(quality)
        try:
            preview = self._resolve_steam_preview(clean_appid, movie_id, safe_quality)
            materialization_candidates = list(preview.pop("materializationCandidates", []) or [])
            primary_source = str(
                materialization_candidates[0] if materialization_candidates else preview.get("url") or ""
            )
            preview_id = self._adaptive_preview_id(
                clean_appid,
                str(preview.get("movieId") or movie_id),
                safe_quality,
                primary_source
            )
            status = self._get_steam_trailer_preview_status_sync(preview_id)
            if status.get("ready"):
                local_url = status["url"]
                preview.update({
                    "url": local_url,
                    "candidates": self._unique_urls([local_url, *(preview.get("candidates") or [])]),
                    "streaming": False,
                    "format": "mp4",
                    "pending": False,
                    "previewId": preview_id
                })
            else:
                started = self._start_adaptive_preview(
                    preview_id,
                    materialization_candidates or [primary_source],
                    safe_quality
                )
                preview.update({
                    "pending": bool(materialization_candidates or primary_source),
                    "previewId": preview_id,
                    "materializationStarted": bool(started)
                })
                if preview.get("streaming"):
                    # Browsers cannot play the raw DASH/HLS manifest in a normal video element.
                    # Keep direct file candidates for immediate playback while the local MP4 is prepared.
                    preview["url"] = ""
            return {"ok": True, "appid": clean_appid, **preview}
        except Exception as error:
            decky.logger.exception("TrailerHero failed to resolve Steam trailer preview")
            return {"ok": False, "appid": clean_appid, "error": str(error)}

    async def get_steam_trailer(self, appid: int, refresh: bool = False) -> dict:
        return await asyncio.to_thread(
            self._get_steam_trailer_sync,
            int(appid),
            bool(refresh)
        )

    async def eval_in_big_picture(self, code: str) -> dict:
        try:
            return await asyncio.to_thread(self._eval_in_big_picture_sync, code)
        except Exception as error:
            decky.logger.exception("TrailerHero failed to reach Steam Big Picture")
            return {
                "status": "Debugger Steam non pronto",
                "error": str(error)
            }

    async def search_youtube_trailer(self, query: str) -> dict:
        return await asyncio.to_thread(self._search_youtube_trailer_sync, str(query))

    async def resolve_steam_app_id(self, query: str) -> dict:
        return await asyncio.to_thread(self._resolve_steam_app_id_sync, str(query))

    def _get_steam_trailer_sync(self, appid: int, refresh: bool = False) -> dict:
        if refresh:
            self._cache.pop(appid, None)
        elif appid in self._cache:
            return self._cache[appid]

        try:
            payload = self._fetch_appdetails(appid)
            app_data = payload.get(str(appid), {})
            if not app_data.get("success"):
                return self._remember(appid, {
                    "ok": False,
                    "appid": appid,
                    "error": "Steam non ha restituito dettagli per questo gioco."
                })

            movies = app_data.get("data", {}).get("movies") or []
            if not movies:
                return self._remember(appid, {
                    "ok": False,
                    "appid": appid,
                    "error": "Nessun trailer Steam trovato."
                })

            movie = self._pick_movie(movies)
            movie_id = movie.get("id")
            if not movie_id:
                return self._remember(appid, {
                    "ok": False,
                    "appid": appid,
                    "error": "Trailer trovato, ma senza id riproducibile."
                })

            candidates = self._movie_candidates(movie)
            result = {
                "ok": True,
                "appid": appid,
                "movieId": str(movie_id),
                "name": movie.get("name") or "Steam trailer",
                "url": candidates[0],
                "candidates": candidates,
                "movies": [
                    {
                        "id": str(candidate.get("id") or ""),
                        "name": str(candidate.get("name") or f"Steam trailer {candidate.get('id') or ''}"),
                        "highlight": bool(candidate.get("highlight"))
                    }
                    for candidate in movies
                    if candidate.get("id")
                ]
            }
            return self._remember(appid, result)
        except Exception as error:
            decky.logger.exception("TrailerHero failed to fetch Steam trailer")
            return {
                "ok": False,
                "appid": appid,
                "error": str(error)
            }

    def _fetch_appdetails(self, appid: int) -> dict:
        url = f"https://store.steampowered.com/api/appdetails?appids={appid}&filters=movies"
        request = urllib.request.Request(
            url,
            headers={
                "Accept": "application/json",
                "User-Agent": "TrailerHero Decky Plugin"
            }
        )
        with urllib.request.urlopen(request, timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))

    def _pick_movie(self, movies: list) -> dict:
        highlighted = [movie for movie in movies if movie.get("highlight")]
        return highlighted[0] if highlighted else movies[0]

    def _movie_candidates(self, movie: dict) -> list:
        movie_id = movie["id"]
        shared_base = f"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/{movie_id}"
        cdn_base = f"https://cdn.akamai.steamstatic.com/steam/apps/{movie_id}"
        candidates = []

        for group_name in ("mp4", "webm"):
            group = movie.get(group_name)
            if isinstance(group, dict):
                for quality in ("max", "2160", "1440", "1080", "720", "480"):
                    url = group.get(quality)
                    if isinstance(url, str) and url.startswith(("http://", "https://")):
                        candidates.append(url)

        hls_url = movie.get("hls_h264")
        if hls_url:
            candidates.append(hls_url)

        dash_h264 = movie.get("dash_h264")
        if dash_h264:
            candidates.append(dash_h264)

        dash_av1 = movie.get("dash_av1")
        if dash_av1:
            candidates.append(dash_av1)

        direct_movie_files = [
            "movie2160.mp4",
            "movie1440.mp4",
            "movie1080.mp4",
            "movie720.mp4",
            "movie_max.mp4",
            "movie480.mp4",
        ]
        candidates.extend(f"{shared_base}/{file_name}" for file_name in direct_movie_files)
        candidates.extend(f"{cdn_base}/{file_name}" for file_name in direct_movie_files)

        return self._unique_urls(candidates)

    def _remember(self, appid: int, result: dict) -> dict:
        self._cache[appid] = result
        return result

    def _unique_urls(self, urls: list) -> list:
        unique = []
        seen = set()
        for url in urls:
            if isinstance(url, str) and url.startswith(("http://", "https://")) and url not in seen:
                seen.add(url)
                unique.append(url)
        return unique

    def _resolve_steam_app_id_sync(self, query: str) -> dict:
        clean_query = self._clean_steam_lookup_query(query)
        if not clean_query:
            return {"ok": False, "query": "", "error": "Titolo Steam vuoto"}

        cache_key = self._steam_title_key(clean_query)
        cached = self._steam_search_cache.get(cache_key)
        if cached and time.time() - cached.get("created_at", 0) < 24 * 60 * 60:
            return cached["result"]

        store_candidates = self._steam_store_search_candidates(clean_query)
        ranked = self._rank_steam_app_candidates(clean_query, store_candidates)
        matched, best_rejected = self._resolve_ranked_steam_app(clean_query, ranked)
        if matched:
            self._steam_search_cache[cache_key] = {
                "created_at": time.time(),
                "result": matched
            }
            return matched

        app_list_candidates = self._steam_app_list_candidates(clean_query)
        if app_list_candidates:
            ranked = self._rank_steam_app_candidates(clean_query, [
                *store_candidates,
                *app_list_candidates
            ])
            matched, app_list_best_rejected = self._resolve_ranked_steam_app(clean_query, ranked)
            best_rejected = best_rejected or app_list_best_rejected
            if matched:
                self._steam_search_cache[cache_key] = {
                    "created_at": time.time(),
                    "result": matched
                }
                return matched

        result = {
            "ok": False,
            "query": clean_query,
            "error": "Nessun trailer Steam affidabile trovato",
            "bestName": best_rejected.get("name") if best_rejected else "",
            "bestAppid": best_rejected.get("appid") if best_rejected else None,
        }
        self._steam_search_cache[cache_key] = {
            "created_at": time.time(),
            "result": result
        }
        return result

    def _resolve_ranked_steam_app(self, clean_query: str, ranked: list) -> tuple[dict | None, dict | None]:
        best_rejected = None
        for candidate in ranked[:12]:
            if not self._is_acceptable_steam_match(clean_query, candidate):
                best_rejected = best_rejected or candidate
                continue

            trailer = self._get_steam_trailer_sync(candidate["appid"])
            if trailer.get("ok") and trailer.get("candidates"):
                return {
                    "ok": True,
                    "query": clean_query,
                    "appid": candidate["appid"],
                    "name": candidate["name"],
                    "score": candidate["score"],
                    "source": candidate["source"],
                    "trailerName": trailer.get("name") or "Steam trailer"
                }, best_rejected

            best_rejected = best_rejected or candidate

        return None, best_rejected

    def _clean_steam_lookup_query(self, value: str) -> str:
        text = " ".join(str(value or "").split())
        text = re.sub(r"(?i)\s+\|\s+steam.*$", "", text)
        text = re.sub(r"(?i)^(?:shortcut|non[- ]steam game)[:\s-]+", "", text)
        text = re.sub(r"[®©™]", "", text)
        return text.strip()

    def _steam_title_key(self, value: str) -> str:
        text = unicodedata.normalize("NFKD", str(value or ""))
        text = "".join(ch for ch in text if not unicodedata.combining(ch))
        text = text.lower().replace("&", " and ")
        text = re.sub(r"[^a-z0-9]+", " ", text)
        roman = {
            "i": "1",
            "ii": "2",
            "iii": "3",
            "iv": "4",
            "v": "5",
            "vi": "6",
            "vii": "7",
            "viii": "8",
            "ix": "9",
            "x": "10",
        }
        tokens = [roman.get(token, token) for token in text.split()]
        return "".join(tokens)

    def _steam_title_tokens(self, value: str) -> set:
        text = unicodedata.normalize("NFKD", str(value or ""))
        text = "".join(ch for ch in text if not unicodedata.combining(ch))
        text = text.lower().replace("&", " and ")
        text = re.sub(r"[^a-z0-9]+", " ", text)
        roman = {
            "i": "1",
            "ii": "2",
            "iii": "3",
            "iv": "4",
            "v": "5",
            "vi": "6",
            "vii": "7",
            "viii": "8",
            "ix": "9",
            "x": "10",
        }
        noise = {
            "a", "an", "the", "game", "pc", "windows", "steam",
            "edition", "standard", "digital", "deluxe", "ultimate",
            "complete", "collection", "bundle"
        }
        return {
            roman.get(token, token)
            for token in text.split()
            if len(token) > 1 and token not in noise
        }

    def _steam_store_search_candidates(self, query: str) -> list:
        encoded = urllib.parse.urlencode({
            "term": query,
            "l": "english",
            "cc": "us",
        })
        url = f"https://store.steampowered.com/api/storesearch/?{encoded}"
        request = urllib.request.Request(
            url,
            headers={
                "Accept": "application/json",
                "User-Agent": "TrailerHero Decky Plugin"
            }
        )
        try:
            with urllib.request.urlopen(request, timeout=10) as response:
                payload = json.loads(response.read().decode("utf-8"))
        except Exception as error:
            decky.logger.warning(f"TrailerHero Steam store search failed: {error}")
            return []

        candidates = []
        for index, item in enumerate((payload.get("items") or [])[:20]):
            if item.get("type") != "app":
                continue
            appid = item.get("id")
            name = item.get("name")
            if isinstance(appid, int) and isinstance(name, str) and name.strip():
                candidates.append({
                    "appid": appid,
                    "name": name.strip(),
                    "source": "storesearch",
                    "index": index
                })
        return candidates

    def _steam_app_list_candidates(self, query: str) -> list:
        target_key = self._steam_title_key(query)
        if not target_key:
            return []

        try:
            apps = self._get_steam_app_list()
        except Exception as error:
            decky.logger.info(f"TrailerHero Steam app list fallback skipped: {error}")
            return []

        matches = []
        for app in apps:
            if app["key"] == target_key:
                matches.append({
                    "appid": app["appid"],
                    "name": app["name"],
                    "source": "applist",
                    "index": 0
                })
        return matches[:8]

    def _get_steam_app_list(self) -> list:
        if self._steam_app_list is not None and time.time() - self._steam_app_list_loaded_at < 24 * 60 * 60:
            return self._steam_app_list

        url = "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
        request = urllib.request.Request(
            url,
            headers={
                "Accept": "application/json",
                "User-Agent": "TrailerHero Decky Plugin"
            }
        )
        with urllib.request.urlopen(request, timeout=20) as response:
            payload = json.loads(response.read().decode("utf-8"))

        apps = []
        for item in payload.get("applist", {}).get("apps", []):
            appid = item.get("appid")
            name = item.get("name")
            if isinstance(appid, int) and isinstance(name, str) and name.strip():
                apps.append({
                    "appid": appid,
                    "name": name.strip(),
                    "key": self._steam_title_key(name)
                })

        self._steam_app_list = apps
        self._steam_app_list_loaded_at = time.time()
        return apps

    def _rank_steam_app_candidates(self, query: str, candidates: list) -> list:
        query_key = self._steam_title_key(query)
        query_tokens = self._steam_title_tokens(query)
        ranked = []
        seen = set()
        for candidate in candidates:
            appid = candidate.get("appid")
            name = candidate.get("name")
            if not isinstance(appid, int) or not isinstance(name, str) or appid in seen:
                continue
            seen.add(appid)

            name_key = self._steam_title_key(name)
            name_tokens = self._steam_title_tokens(name)
            ratio = difflib.SequenceMatcher(None, query_key, name_key).ratio() if query_key and name_key else 0
            overlap = len(query_tokens & name_tokens)
            coverage = overlap / max(1, len(query_tokens))
            precision = overlap / max(1, len(name_tokens))
            exact_bonus = 400 if query_key == name_key else 0
            containment_bonus = 180 if query_key and name_key and (query_key in name_key or name_key in query_key) else 0
            source_bonus = 80 if candidate.get("source") == "applist" else 0
            order_bonus = max(0, 80 - int(candidate.get("index") or 0) * 8)
            score = int(ratio * 360 + coverage * 260 + precision * 140 + exact_bonus + containment_bonus + source_bonus + order_bonus)
            ranked.append({
                **candidate,
                "score": score,
                "ratio": ratio,
                "coverage": coverage,
                "precision": precision,
                "queryTokens": sorted(query_tokens),
                "nameTokens": sorted(name_tokens),
            })

        ranked.sort(key=lambda item: item["score"], reverse=True)
        return ranked

    def _is_acceptable_steam_match(self, query: str, candidate: dict) -> bool:
        query_key = self._steam_title_key(query)
        name_key = self._steam_title_key(candidate.get("name") or "")
        if query_key and query_key == name_key:
            return True

        query_tokens = self._steam_title_tokens(query)
        if len(query_tokens) <= 1:
            return False

        return (
            candidate.get("score", 0) >= 690 and
            candidate.get("coverage", 0) >= 0.78 and
            candidate.get("precision", 0) >= 0.52 and
            candidate.get("ratio", 0) >= 0.58
        )

    def _search_youtube_trailer_sync(self, query: str) -> dict:
        result = self._search_youtube_videos_sync(query, limit=10)
        results = result.get("results") or []
        if not results:
            return {
                "ok": False,
                "query": result.get("query") or " ".join(str(query or "").split()),
                "error": result.get("error") or "Nessun risultato YouTube coerente con il titolo del gioco"
            }

        best = results[0]
        video_id = best.get("videoId") or best.get("id")
        if not video_id:
            return {
                "ok": False,
                "query": result.get("query") or " ".join(str(query or "").split()),
                "error": "Nessun video YouTube riproducibile trovato"
            }

        return {
            "ok": True,
            "query": result.get("query") or " ".join(str(query or "").split()),
            "videoId": video_id,
            "title": best.get("title") or "YouTube trailer",
            "channel": best.get("channel") or best.get("uploader") or "",
            "length": best.get("length") or "",
            "duration": best.get("duration"),
            "url": best.get("url") or best.get("webpage_url") or f"https://www.youtube.com/watch?v={video_id}"
        }

    async def search_youtube_videos(self, query: str, limit: int = 10) -> dict:
        return await asyncio.to_thread(self._search_youtube_videos_sync, str(query), int(limit))

    async def resolve_youtube_streams(self, video_id: str, target_height: int = 2160) -> dict:
        return await asyncio.to_thread(
            self._resolve_youtube_streams_sync,
            str(video_id),
            int(target_height or 2160)
        )

    async def get_youtube_trailer_preview(self, video_id: str, target_height: int = 1080) -> dict:
        return await asyncio.to_thread(
            self._get_youtube_trailer_preview_sync,
            str(video_id),
            int(target_height or 1080)
        )

    def _get_youtube_trailer_preview_sync(self, video_id: str, target_height: int = 1080) -> dict:
        clean_video_id = self._extract_youtube_id(video_id)
        if not clean_video_id:
            return {"ok": False, "error": "Invalid YouTube trailer"}
        quality = max(360, min(int(target_height or 1080), 1080))
        watch_url = f"https://www.youtube.com/watch?v={clean_video_id}"
        preview_id = hashlib.sha256(f"youtube-preview-clip-v3:{clean_video_id}:{quality}".encode("utf-8")).hexdigest()[:24]
        target = self._preview_dir / preview_id / "preview.mp4"
        if target.is_file() and target.stat().st_size >= 1024:
            os.utime(target.parent, None)
            return {
                "ok": True, "ready": True, "pending": False,
                "previewId": preview_id, "videoId": clean_video_id,
                "url": self._preview_url(preview_id), "bytes": target.stat().st_size,
                "thumbnail": f"https://i.ytimg.com/vi/{clean_video_id}/hqdefault.jpg"
            }
        self._start_adaptive_preview(preview_id, watch_url, quality)
        return {
            "ok": True, "ready": False, "pending": True,
            "previewId": preview_id, "videoId": clean_video_id,
            "thumbnail": f"https://i.ytimg.com/vi/{clean_video_id}/hqdefault.jpg"
        }

    def _resolve_youtube_streams_sync(self, video_id: str, target_height: int = 2160) -> dict:
        clean_video_id = self._extract_youtube_id(video_id)
        if not clean_video_id:
            return {"ok": False, "error": "Link YouTube non valido", "candidates": []}

        yt_dlp = self._require_yt_dlp_invocation()
        url = f"https://www.youtube.com/watch?v={clean_video_id}"
        command = [
            *yt_dlp["command"],
            "--no-warnings",
            "--no-check-certificate",
            "--skip-download",
            "--no-playlist",
            "--dump-single-json",
            url,
        ]
        result = self._run_command(command, timeout=65, env=yt_dlp.get("env"))
        if result.returncode != 0:
            return {
                "ok": False,
                "videoId": clean_video_id,
                "error": self._command_error(result, "YouTube direct stream non disponibile"),
                "candidates": []
            }

        try:
            payload = json.loads(result.stdout or "{}")
        except json.JSONDecodeError as error:
            return {
                "ok": False,
                "videoId": clean_video_id,
                "error": f"Risposta yt-dlp non valida: {error}",
                "candidates": []
            }

        safe_target = max(360, min(int(target_height or 2160), 2160))
        candidates = self._rank_youtube_stream_candidates(payload.get("formats") or [], safe_target)
        audio_candidates = self._rank_youtube_audio_candidates(payload.get("formats") or [])
        return {
            "ok": bool(candidates),
            "videoId": clean_video_id,
            "title": payload.get("title") or "",
            "targetHeight": safe_target,
            "candidates": candidates,
            "audioCandidates": audio_candidates,
            "error": "" if candidates else "Nessuno stream YouTube diretto riproducibile trovato"
        }

    def _extract_youtube_id(self, value: str) -> str | None:
        text = str(value or "").strip()
        patterns = [
            r"(?:youtube\.com/watch\?v=|youtube\.com/embed/|youtube-nocookie\.com/embed/|youtu\.be/)([A-Za-z0-9_-]{11})",
            r"^([A-Za-z0-9_-]{11})$",
        ]
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(1)
        return None

    def _rank_youtube_stream_candidates(self, formats: list, target_height: int) -> list:
        candidates = []
        seen_urls = set()
        for entry in formats:
            url = entry.get("url")
            height = entry.get("height") or 0
            vcodec = str(entry.get("vcodec") or "")
            protocol = str(entry.get("protocol") or "")
            ext = str(entry.get("ext") or "")
            if (
                not isinstance(url, str) or
                not url.startswith(("http://", "https://")) or
                url in seen_urls or
                not isinstance(height, int) or
                height <= 0 or
                not vcodec or
                vcodec == "none" or
                protocol not in {"http", "https"} or
                ext in {"mhtml", "storyboard"}
            ):
                continue
            seen_urls.add(url)
            candidates.append({
                "url": url,
                "height": height,
                "width": entry.get("width") or 0,
                "fps": entry.get("fps") or 0,
                "ext": ext,
                "vcodec": vcodec,
                "acodec": entry.get("acodec") or "",
                "formatId": str(entry.get("format_id") or ""),
                "filesize": entry.get("filesize") or entry.get("filesize_approx") or 0,
            })

        if not candidates:
            return []

        def codec_rank(candidate: dict) -> int:
            codec = str(candidate.get("vcodec") or "").lower()
            if codec.startswith("avc1"):
                return 4
            if codec.startswith("vp09") or codec.startswith("vp9"):
                return 3
            if codec.startswith("av01") or codec.startswith("av1"):
                return 2
            return 1

        def ext_rank(candidate: dict) -> int:
            ext = str(candidate.get("ext") or "").lower()
            if ext == "mp4":
                return 3
            if ext == "webm":
                return 2
            return 1

        def candidate_key(candidate: dict):
            height = int(candidate.get("height") or 0)
            over_target_penalty = 1 if height > target_height else 0
            distance = abs(target_height - height)
            return (
                over_target_penalty,
                distance if height <= target_height else distance + 10000,
                -height,
                -codec_rank(candidate),
                -ext_rank(candidate),
                -int(candidate.get("fps") or 0),
            )

        candidates.sort(key=candidate_key)
        return candidates[:12]

    def _rank_youtube_audio_candidates(self, formats: list) -> list:
        candidates = []
        seen_urls = set()
        for entry in formats:
            url = entry.get("url")
            acodec = str(entry.get("acodec") or "")
            vcodec = str(entry.get("vcodec") or "")
            protocol = str(entry.get("protocol") or "")
            ext = str(entry.get("ext") or "")
            if (
                not isinstance(url, str) or
                not url.startswith(("http://", "https://")) or
                url in seen_urls or
                not acodec or
                acodec == "none" or
                vcodec not in {"", "none"} or
                protocol not in {"http", "https"} or
                ext in {"mhtml", "storyboard"}
            ):
                continue
            seen_urls.add(url)
            candidates.append({
                "url": url,
                "ext": ext,
                "acodec": acodec,
                "abr": entry.get("abr") or entry.get("tbr") or 0,
                "formatId": str(entry.get("format_id") or ""),
                "filesize": entry.get("filesize") or entry.get("filesize_approx") or 0,
            })

        def candidate_key(candidate: dict):
            codec = str(candidate.get("acodec") or "").lower()
            ext = str(candidate.get("ext") or "").lower()
            compatibility = 3 if codec.startswith(("mp4a", "aac")) else 2 if codec.startswith("opus") else 1
            container = 3 if ext in {"m4a", "mp4"} else 2 if ext == "webm" else 1
            return (-compatibility, -container, -float(candidate.get("abr") or 0))

        candidates.sort(key=candidate_key)
        return candidates[:6]

    def _search_youtube_videos_sync(self, query: str, limit: int = 10) -> dict:
        clean_query = " ".join(str(query or "").split())
        if not clean_query:
            return {"ok": False, "query": "", "error": "Query YouTube vuota", "results": []}

        safe_limit = max(1, min(int(limit or 10), 10))
        raw_limit = max(18, safe_limit * 3)
        results = []
        backend = "html"
        errors = []

        try:
            results = self._search_youtube_results_ytdlp(clean_query, raw_limit)
            backend = "yt-dlp"
        except Exception as error:
            errors.append(str(error))
            decky.logger.warning(f"TrailerHero yt-dlp YouTube search failed, falling back to HTML: {error}")
            try:
                results = self._search_youtube_results_html(clean_query, raw_limit)
                backend = "html"
            except Exception as html_error:
                errors.append(str(html_error))
                decky.logger.exception("TrailerHero YouTube search failed")
                return {
                    "ok": False,
                    "query": clean_query,
                    "backend": backend,
                    "error": " | ".join(errors[-2:]) or "YouTube search failed",
                    "results": []
                }

        normalized_results = self._rank_youtube_results(clean_query, results)
        return {
            "ok": bool(normalized_results),
            "query": clean_query,
            "backend": backend,
            "results": normalized_results[:safe_limit]
        }

    def _search_youtube_results_ytdlp(self, clean_query: str, raw_limit: int) -> list:
        yt_dlp = self._require_yt_dlp_invocation()
        seen = set()
        combined = []
        # The visible/default query remains the Steam game title. Internally we add
        # trailer-specific searches first to keep auto results precise.
        searches = [
            f"{clean_query} official trailer video game",
            f"{clean_query} launch trailer game",
            f"{clean_query} trailer",
            clean_query,
        ]
        per_query_limit = max(8, min(raw_limit, 18))
        for search_query in searches:
            command = [
                *yt_dlp["command"],
                "--no-warnings",
                "--no-check-certificate",
                "--skip-download",
                "--flat-playlist",
                "--print",
                "%(id)s\t%(title)s\t%(uploader)s\t%(duration)s\t%(webpage_url)s",
                f"ytsearch{per_query_limit}:{search_query}",
            ]
            result = self._run_command(command, timeout=45, env=yt_dlp.get("env"))
            if result.returncode != 0:
                raise RuntimeError(self._command_error(result, "YouTube search failed"))
            for raw_line in (result.stdout or "").splitlines():
                line = raw_line.strip()
                if not line:
                    continue
                parts = line.split("\t")
                if len(parts) < 2:
                    continue
                video_id = parts[0].strip()
                if not video_id or video_id in seen:
                    continue
                seen.add(video_id)
                title = parts[1].strip() or video_id
                channel = parts[2].strip() if len(parts) > 2 else ""
                duration_raw = parts[3].strip() if len(parts) > 3 else ""
                duration = None
                if duration_raw:
                    try:
                        duration = int(float(duration_raw))
                    except ValueError:
                        duration = None
                url = parts[4].strip() if len(parts) > 4 else ""
                if not (url.startswith("http://") or url.startswith("https://")):
                    url = f"https://www.youtube.com/watch?v={video_id}"
                combined.append({
                    "videoId": video_id,
                    "id": video_id,
                    "title": title,
                    "channel": channel,
                    "uploader": channel,
                    "duration": duration,
                    "length": self._format_duration(duration),
                    "url": url,
                    "webpage_url": url,
                    "rank": len(combined),
                    "searchQuery": search_query,
                })
                if len(combined) >= raw_limit:
                    return combined
        return combined

    def _run_command(self, command: list, timeout: int = 60, env: dict | None = None):
        decky.logger.info(f"TrailerHero executing command: {' '.join(command)}")
        run_env = os.environ.copy()
        run_env.pop("LD_LIBRARY_PATH", None)
        run_env.pop("PYTHONHOME", None)
        run_env.pop("PYTHONPATH", None)
        if env:
            run_env.update(env)
        run_kwargs = {
            "capture_output": True,
            "text": True,
            "check": False,
            "timeout": timeout,
            "env": run_env,
        }
        if IS_WINDOWS:
            run_kwargs["creationflags"] = getattr(subprocess, "CREATE_NO_WINDOW", 0)
        return subprocess.run(command, **run_kwargs)

    def _resolve_yt_dlp_invocation(self) -> dict | None:
        def executable_exists(path: Path) -> bool:
            return path.exists() and path.is_file() and (IS_WINDOWS or os.access(path, os.X_OK))

        candidates = [
            self._yt_dlp_path,
            self._plugin_dir / "bin" / self._yt_dlp_name,
            Path(__file__).resolve().parent / self._yt_dlp_name,
            Path(__file__).resolve().parent / "bin" / self._yt_dlp_name,
        ]
        for candidate in candidates:
            if executable_exists(candidate):
                return {"command": [str(candidate)], "env": None, "path": str(candidate)}

        system_yt_dlp = shutil.which(self._yt_dlp_name) or shutil.which("yt-dlp")
        if system_yt_dlp:
            return {"command": [system_yt_dlp], "env": None, "path": system_yt_dlp}
        return None

    def _require_yt_dlp_invocation(self) -> dict:
        invocation = self._resolve_yt_dlp_invocation()
        if invocation:
            return invocation
        raise RuntimeError("yt-dlp is not available")

    def _command_error(self, result, fallback: str) -> str:
        stderr = (result.stderr or "").strip()
        stdout = (result.stdout or "").strip()
        if stderr and stdout:
            return self._trim_message(f"{stderr.splitlines()[-1]} | {stdout.splitlines()[-1]}", 220)
        if stderr:
            return self._trim_message(stderr.splitlines()[-1], 220)
        if stdout:
            return self._trim_message(stdout.splitlines()[-1], 220)
        return fallback

    def _trim_message(self, value: str, limit: int) -> str:
        text = str(value or "")
        return text if len(text) <= limit else text[:limit - 1] + "…"

    def _format_duration(self, seconds) -> str:
        if not isinstance(seconds, int) or seconds <= 0:
            return ""
        minutes, sec = divmod(seconds, 60)
        hours, minutes = divmod(minutes, 60)
        if hours:
            return f"{hours}:{minutes:02d}:{sec:02d}"
        return f"{minutes}:{sec:02d}"

    def _search_youtube_results_html(self, clean_query: str, raw_limit: int) -> list:
        # HTML fallback kept from the previous TrailerHero scraper, but now scoped to
        # trailer-specific searches and ranked after extraction.
        seen = set()
        combined = []
        for search_query in (
            f"\"{clean_query}\" official trailer game",
            f"\"{clean_query}\" launch trailer game",
            clean_query,
        ):
            results = self._search_youtube_results(search_query)
            for result in results:
                video_id = result.get("videoId")
                if not video_id or video_id in seen:
                    continue
                seen.add(video_id)
                result["id"] = video_id
                result["url"] = f"https://www.youtube.com/watch?v={video_id}"
                result["webpage_url"] = result["url"]
                result["rank"] = len(combined)
                combined.append(result)
                if len(combined) >= raw_limit:
                    return combined
        return combined

    def _rank_youtube_results(self, clean_query: str, results: list) -> list:
        ranked = []
        for rank, result in enumerate(results):
            video_id = result.get("videoId") or result.get("id")
            if not video_id:
                continue
            normalized = {
                "id": video_id,
                "videoId": video_id,
                "title": result.get("title") or "YouTube trailer",
                "channel": result.get("channel") or result.get("uploader") or "",
                "uploader": result.get("uploader") or result.get("channel") or "",
                "duration": result.get("duration"),
                "length": result.get("length") or self._format_duration(result.get("duration")),
                "url": result.get("url") or result.get("webpage_url") or f"https://www.youtube.com/watch?v={video_id}",
                "webpage_url": result.get("webpage_url") or result.get("url") or f"https://www.youtube.com/watch?v={video_id}",
                "rank": int(result.get("rank") or rank),
                "thumbnail": result.get("thumbnail") or f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg",
                "thumbnails": result.get("thumbnails") or [
                    {"url": f"https://i.ytimg.com/vi/{video_id}/mqdefault.jpg", "width": 320, "height": 180},
                    {"url": f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg", "width": 480, "height": 360},
                ],
            }
            normalized["score"] = self._score_youtube_result(clean_query, normalized)
            ranked.append(normalized)

        # Prefer results that actually match the Steam game title, but keep a few
        # fallback results so the dropdown can still show choices for difficult games.
        ranked.sort(key=lambda item: item["score"], reverse=True)
        strict = [item for item in ranked if self._matches_game_title(clean_query, item)]
        loose = [item for item in ranked if item not in strict]
        return [*strict, *loose]

    def _normalize_title_text(self, value: str) -> str:
        return " ".join(
            word for word in re.split(r"[^a-z0-9]+", str(value or "").lower())
            if word and word not in {
                "the", "and", "game", "games", "official", "trailer", "launch",
                "announcement", "reveal", "gameplay", "video", "4k", "2160p",
                "1440p", "1080p", "hd", "uhd", "steam", "pc", "ps5", "xbox"
            }
        )

    def _matches_game_title(self, game_title: str, result: dict) -> bool:
        expected = self._normalize_title_text(game_title)
        title = self._normalize_title_text(result.get("title") or "")
        channel = self._normalize_title_text(result.get("channel") or result.get("uploader") or "")
        if not expected or not title:
            return False

        expected_words = expected.split()
        title_words = set(title.split())
        if expected in title:
            return True

        if len(expected_words) == 1:
            word = expected_words[0]
            return word in title_words or word in channel.split()

        matched = sum(1 for word in expected_words if word in title_words)
        if expected_words[0] not in title_words:
            return False
        return matched >= max(2, len(expected_words) - 1)

    def _score_youtube_result(self, query: str, result: dict) -> int:
        title = (result.get("title") or "").lower()
        channel = (result.get("channel") or result.get("uploader") or "").lower()
        query_words = [
            word for word in re.split(r"[^a-z0-9]+", query.lower())
            if len(word) > 2 and word not in {"the", "and", "game", "games"}
        ]

        score = 0
        for word in query_words:
            if word in title:
                score += 10
            if word in channel:
                score += 3

        bonuses = {
            "official trailer": 28,
            "launch trailer": 18,
            "announcement trailer": 14,
            "reveal trailer": 14,
            "gameplay trailer": 10,
            "official": 16,
            "trailer": 16,
            "4k": 10,
            "2160p": 10,
            "uhd": 8,
        }
        for text, bonus in bonuses.items():
            if text in title:
                score += bonus

        penalties = {
            "fan made": 35,
            "fanmade": 35,
            "concept": 25,
            "music": 18,
            "soundtrack": 18,
            "walkthrough": 18,
            "let's play": 18,
            "lets play": 18,
            "review": 14,
            "reaction": 14,
            "part 1": 10,
            "episode": 10,
            "ost": 14,
            "playlist": 20,
            "shorts": 18,
        }
        for text, penalty in penalties.items():
            if text in title:
                score -= penalty

        if self._matches_game_title(query, result):
            score += 30
        else:
            score -= 120

        if "official" in channel:
            score += 8
        if any(word in channel for word in query_words):
            score += 5

        duration = result.get("duration")
        if isinstance(duration, int) and duration > 0:
            if 45 <= duration <= 420:
                score += 12
            elif duration < 30:
                score -= 18
            elif duration > 900:
                score -= 22

        rank = int(result.get("rank") or 0)
        score += max(0, 40 - rank * 4)
        return score

    def _eval_in_big_picture_sync(self, code: str) -> dict:
        target = self._find_big_picture_target()
        if not target:
            return {
                "status": "Debugger Steam non trovato",
                "error": "No Big Picture DevTools target found"
            }

        payload = {
            "id": 1,
            "method": "Runtime.evaluate",
            "params": {
                "expression": code,
                "returnByValue": True,
                "awaitPromise": False
            }
        }
        response = self._websocket_json_request(target["webSocketDebuggerUrl"], payload)
        result = response.get("result", {}).get("result", {})

        if "exceptionDetails" in response.get("result", {}):
            exception = response["result"]["exceptionDetails"]
            error_text = exception.get("text") or "Runtime.evaluate exception"
            error_object = exception.get("exception") or {}
            error_description = error_object.get("description") or error_object.get("value")
            return {
                "status": "Errore nello script TrailerHero",
                "error": error_description or error_text
            }

        value = result.get("value")
        if isinstance(value, dict):
            value["tab"] = target.get("title")
            return value

        return {
            "status": "Risposta inattesa da Steam",
            "error": "Runtime.evaluate returned no object value",
            "tab": target.get("title")
        }

    def _find_big_picture_target(self) -> dict | None:
        with urllib.request.urlopen("http://127.0.0.1:8080/json", timeout=3) as response:
            targets = json.loads(response.read().decode("utf-8"))

        def score(target: dict) -> int:
            title = (target.get("title") or "").lower()
            url = (target.get("url") or "").lower()
            if "sharedjscontext" in title:
                return -100
            if "quickaccess" in title or "mainmenu" in title or "notification" in title:
                return -100
            if "big picture" in title or "modalit" in title:
                return 100
            if "browsertype=3" in url and "browserviewpopup" not in url:
                return 60
            return 0

        candidates = [
            target for target in targets
            if target.get("type") == "page" and target.get("webSocketDebuggerUrl")
        ]
        candidates.sort(key=score, reverse=True)
        return candidates[0] if candidates and score(candidates[0]) > 0 else None

    def _websocket_json_request(self, ws_url: str, payload: dict) -> dict:
        parsed = urlparse(ws_url)
        host = parsed.hostname or "127.0.0.1"
        port = parsed.port or 80
        path = parsed.path
        if parsed.query:
            path = f"{path}?{parsed.query}"

        with socket.create_connection((host, port), timeout=5) as sock:
            sock.settimeout(8)
            self._websocket_handshake(sock, host, port, path)
            self._websocket_send_text(sock, json.dumps(payload))

            while True:
                message = self._websocket_recv_text(sock)
                response = json.loads(message)
                if response.get("id") == payload["id"]:
                    return response

    def _websocket_handshake(self, sock: socket.socket, host: str, port: int, path: str):
        key = base64.b64encode(os.urandom(16)).decode("ascii")
        request = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {host}:{port}\r\n"
            "Upgrade: websocket\r\n"
            "Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\n"
            "Sec-WebSocket-Version: 13\r\n"
            "\r\n"
        )
        sock.sendall(request.encode("ascii"))
        response = self._recv_until(sock, b"\r\n\r\n")
        if b" 101 " not in response.split(b"\r\n", 1)[0]:
            raise RuntimeError("DevTools WebSocket handshake failed")

    def _websocket_send_text(self, sock: socket.socket, text: str):
        payload = text.encode("utf-8")
        header = bytearray([0x81])
        length = len(payload)
        if length < 126:
            header.append(0x80 | length)
        elif length < 65536:
            header.append(0x80 | 126)
            header.extend(struct.pack("!H", length))
        else:
            header.append(0x80 | 127)
            header.extend(struct.pack("!Q", length))

        mask = os.urandom(4)
        masked = bytes(byte ^ mask[index % 4] for index, byte in enumerate(payload))
        sock.sendall(bytes(header) + mask + masked)

    def _websocket_recv_text(self, sock: socket.socket) -> str:
        chunks = []
        while True:
            first, second = self._recv_exact(sock, 2)
            opcode = first & 0x0F
            masked = bool(second & 0x80)
            length = second & 0x7F

            if length == 126:
                length = struct.unpack("!H", self._recv_exact(sock, 2))[0]
            elif length == 127:
                length = struct.unpack("!Q", self._recv_exact(sock, 8))[0]

            mask = self._recv_exact(sock, 4) if masked else b""
            payload = self._recv_exact(sock, length) if length else b""
            if masked:
                payload = bytes(byte ^ mask[index % 4] for index, byte in enumerate(payload))

            if opcode == 0x8:
                raise RuntimeError("DevTools WebSocket closed")
            if opcode == 0x9:
                continue
            if opcode in (0x1, 0x0):
                chunks.append(payload)
                if first & 0x80:
                    return b"".join(chunks).decode("utf-8")

    def _recv_exact(self, sock: socket.socket, length: int) -> bytes:
        data = b""
        while len(data) < length:
            chunk = sock.recv(length - len(data))
            if not chunk:
                raise RuntimeError("Unexpected socket close")
            data += chunk
        return data

    def _recv_until(self, sock: socket.socket, marker: bytes) -> bytes:
        data = b""
        while marker not in data:
            chunk = sock.recv(4096)
            if not chunk:
                raise RuntimeError("Unexpected socket close")
            data += chunk
        return data
