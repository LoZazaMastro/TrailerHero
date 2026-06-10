import asyncio
import base64
import json
import os
import re
import socket
import struct
import urllib.request
import urllib.parse
from urllib.parse import urlparse

import decky


class Plugin:
    def __init__(self):
        self._cache = {}

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
        direct_movie_files = [
            "movie2160.mp4",
            "movie1440.mp4",
            "movie1080.mp4",
            "movie720.mp4",
            "movie_max.mp4",
            "movie480.mp4",
        ]
        candidates = [
            *(f"{shared_base}/{file_name}" for file_name in direct_movie_files),
            *(f"{cdn_base}/{file_name}" for file_name in direct_movie_files),
        ]

        dash_h264 = movie.get("dash_h264")
        if dash_h264:
            candidates.append(dash_h264)

        dash_av1 = movie.get("dash_av1")
        if dash_av1:
            candidates.append(dash_av1)

        hls_url = movie.get("hls_h264")
        if hls_url:
            candidates.append(hls_url)

        return candidates

    def _remember(self, appid: int, result: dict) -> dict:
        self._cache[appid] = result
        return result

    def _search_youtube_trailer_sync(self, query: str) -> dict:
        clean_query = " ".join(query.split())
        if not clean_query:
            return {"ok": False, "error": "Query YouTube vuota"}

        searches = [
            f"\"{clean_query}\" official trailer game 4K 2160p",
            f"\"{clean_query}\" official trailer game 4K",
            f"\"{clean_query}\" official trailer game"
        ]
        best = None
        best_query = searches[-1]
        for search_query in searches:
            results = self._search_youtube_results(search_query)
            if not results:
                continue

            strict_results = [
                result for result in results
                if self._matches_game_title(clean_query, result)
            ]
            if not strict_results:
                continue

            strict_results.sort(
                key=lambda item: self._score_youtube_result(clean_query, item),
                reverse=True
            )
            best = strict_results[0]
            best_query = search_query
            break

        if not best:
            return {
                "ok": False,
                "error": "Nessun risultato YouTube coerente con il titolo del gioco"
            }

        return {
            "ok": True,
            "query": best_query,
            "videoId": best.get("videoId"),
            "title": best.get("title") or "YouTube trailer",
            "channel": best.get("channel") or "",
            "url": f"https://www.youtube.com/watch?v={best.get('videoId')}"
        }

    def _search_youtube_results(self, search_query: str) -> list:
        url = (
            "https://www.youtube.com/results?"
            + urllib.parse.urlencode({
                "search_query": search_query,
                "hl": "en",
                "gl": "US"
            })
        )
        request = urllib.request.Request(
            url,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/120.0 Safari/537.36"
                ),
                "Accept-Language": "en-US,en;q=0.9"
            }
        )

        with urllib.request.urlopen(request, timeout=12) as response:
            html = response.read().decode("utf-8", "replace")

        data = self._extract_yt_initial_data(html)
        results = []
        self._collect_youtube_results(data, results)
        seen = set()
        unique_results = []
        for result in results:
            video_id = result.get("videoId")
            if not video_id or video_id in seen:
                continue
            seen.add(video_id)
            result["rank"] = len(unique_results)
            unique_results.append(result)
        return unique_results

    def _extract_yt_initial_data(self, html: str) -> dict:
        marker = "var ytInitialData = "
        start = html.find(marker)
        if start < 0:
            marker = "ytInitialData = "
            start = html.find(marker)
        if start < 0:
            raise RuntimeError("ytInitialData non trovato")

        brace_start = html.find("{", start + len(marker))
        if brace_start < 0:
            raise RuntimeError("ytInitialData JSON non trovato")

        depth = 0
        in_string = False
        escaped = False
        for index in range(brace_start, len(html)):
            char = html[index]
            if in_string:
                if escaped:
                    escaped = False
                elif char == "\\":
                    escaped = True
                elif char == '"':
                    in_string = False
            else:
                if char == '"':
                    in_string = True
                elif char == "{":
                    depth += 1
                elif char == "}":
                    depth -= 1
                    if depth == 0:
                        return json.loads(html[brace_start:index + 1])

        raise RuntimeError("ytInitialData JSON incompleto")

    def _collect_youtube_results(self, node, results: list):
        if isinstance(node, dict):
            renderer = node.get("videoRenderer")
            if renderer:
                title_data = renderer.get("title") or {}
                title = title_data.get("simpleText") or "".join(
                    run.get("text", "") for run in title_data.get("runs", [])
                )
                owner_data = renderer.get("ownerText") or {}
                channel = owner_data.get("simpleText") or "".join(
                    run.get("text", "") for run in owner_data.get("runs", [])
                )
                length = (renderer.get("lengthText") or {}).get("simpleText", "")
                results.append({
                    "videoId": renderer.get("videoId"),
                    "title": title,
                    "channel": channel,
                    "length": length
                })

            for value in node.values():
                self._collect_youtube_results(value, results)
        elif isinstance(node, list):
            for value in node:
                self._collect_youtube_results(value, results)

    def _normalize_title_text(self, value: str) -> str:
        return " ".join(
            word for word in re.split(r"[^a-z0-9]+", value.lower())
            if word and word not in {
                "the", "and", "game", "official", "trailer", "launch",
                "announcement", "reveal", "gameplay", "video", "4k", "2160p",
                "1440p", "1080p", "hd", "uhd"
            }
        )

    def _matches_game_title(self, game_title: str, result: dict) -> bool:
        expected = self._normalize_title_text(game_title)
        title = self._normalize_title_text(result.get("title") or "")
        channel = self._normalize_title_text(result.get("channel") or "")
        if not expected or not title:
            return False

        expected_words = expected.split()
        title_words = set(title.split())
        if expected in title:
            return True

        if len(expected_words) == 1:
            word = expected_words[0]
            return word in title_words

        matched = sum(1 for word in expected_words if word in title_words)
        if expected_words[0] not in title_words:
            return False
        return matched >= max(2, len(expected_words) - 1)

    def _score_youtube_result(self, query: str, result: dict) -> int:
        title = (result.get("title") or "").lower()
        channel = (result.get("channel") or "").lower()
        query_words = [
            word for word in re.split(r"[^a-z0-9]+", query.lower())
            if len(word) > 2 and word not in {"the", "and", "game"}
        ]

        score = 0
        for word in query_words:
            if word in title:
                score += 8
            if word in channel:
                score += 2

        bonuses = {
            "official": 18,
            "trailer": 16,
            "4k": 14,
            "2160p": 14,
            "uhd": 10,
            "1440p": 8,
            "launch trailer": 10,
            "announcement trailer": 8,
            "reveal trailer": 8,
            "gameplay trailer": 6,
            "gameplay": 3,
        }
        for text, bonus in bonuses.items():
            if text in title:
                score += bonus

        penalties = {
            "fan made": 30,
            "fanmade": 30,
            "remake": 18,
            "concept": 18,
            "music": 10,
            "soundtrack": 10,
            "walkthrough": 12,
            "beta": 8,
            "let's play": 12,
            "lets play": 12,
            "review": 8,
            "reaction": 8,
            "youtube": 8,
        }
        for text, penalty in penalties.items():
            if text in title:
                score -= penalty

        if not self._matches_game_title(query, result):
            score -= 100

        if "official" in channel:
            score += 8
        if any(word in channel for word in query_words):
            score += 4

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
