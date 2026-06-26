import asyncio
import base64
import difflib
import json
import os
import re
import socket
import shutil
import subprocess
import time
import traceback
import struct
import unicodedata
import urllib.request
import urllib.parse
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

    async def _main(self):
        decky.logger.info("TrailerHero loaded")

    async def _unload(self):
        decky.logger.info("TrailerHero unloaded")

    async def get_steam_trailer(self, appid: int) -> dict:
        return await asyncio.to_thread(self._get_steam_trailer_sync, int(appid))

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

    def _get_steam_trailer_sync(self, appid: int) -> dict:
        if appid in self._cache:
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
                "name": movie.get("name") or "Steam trailer",
                "url": candidates[0],
                "candidates": candidates
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

        dash_h264 = movie.get("dash_h264")
        if dash_h264:
            candidates.append(dash_h264)

        dash_av1 = movie.get("dash_av1")
        if dash_av1:
            candidates.append(dash_av1)

        hls_url = movie.get("hls_h264")
        if hls_url:
            candidates.append(hls_url)

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
        return {
            "ok": bool(candidates),
            "videoId": clean_video_id,
            "title": payload.get("title") or "",
            "targetHeight": safe_target,
            "candidates": candidates,
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
                protocol in {"mhtml"} or
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
