"""Offline regression tests. No Steam, network service or bundled executable runs."""
import asyncio
import builtins
import importlib.util
import json
import logging
import os
from pathlib import Path
import socket
import subprocess
import sys
import tempfile
import threading
import time
import types
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
decky = types.ModuleType("decky")
decky.logger = logging.getLogger("TrailerHeroTests")
decky.DECKY_PLUGIN_DIR = ROOT
sys.modules["decky"] = decky
spec = importlib.util.spec_from_file_location("trailerhero_test_backend", ROOT / "main.py")
backend = importlib.util.module_from_spec(spec)
spec.loader.exec_module(backend)


class RangeTests(unittest.TestCase):
    def test_no_range(self):
        self.assertEqual(backend._LoopbackMediaServer._parse_range("", 100), (0, 99, False))

    def test_explicit_ranges(self):
        for value, expected in [("bytes=0-9", (0, 9, True)), ("bytes=75-", (75, 99, True)),
                                ("bytes=-10", (90, 99, True)), ("bytes=-200", (0, 99, True)),
                                ("bytes=90-9999", (90, 99, True)), ("bytes=0-0", (0, 0, True))]:
            with self.subTest(value=value):
                self.assertEqual(backend._LoopbackMediaServer._parse_range(value, 100), expected)

    def test_unsatisfiable_and_malformed(self):
        for value in ["bytes=100-", "bytes=999-1000", "bytes=9-2", "bytes=-0", "bytes=-",
                      "bytes=1-2junk", "bytes=1-2,3-4", "units=1-2", "bytes=abc-", "bytes=" + "9" * 30 + "-"]:
            with self.subTest(value=value), self.assertRaises(ValueError):
                backend._LoopbackMediaServer._parse_range(value, 100)

    def test_empty_file(self):
        self.assertEqual(backend._LoopbackMediaServer._parse_range("", 0), (0, -1, False))
        with self.assertRaises(ValueError):
            backend._LoopbackMediaServer._parse_range("bytes=0-", 0)


class MediaServerTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        decky.DECKY_PLUGIN_SETTINGS_DIR = self.root / "settings"
        self.plugin = backend.Plugin()
        self.plugin._preview_dir = self.root / "previews"
        with patch.object(self.plugin, "_install_screensaver", return_value={"ok": True}):
            asyncio.run(self.plugin._main())
        self.payload = b"\x00\x00\x00\x18ftypisom" + bytes(range(256)) * 32
        source = self.root / "original.mp4"
        source.write_bytes(self.payload)
        self.assignment = self.plugin._import_local_trailer_sync(3456789012, str(source), "Regression test")
        self.port = self.plugin._media_server.server_port
        self.path = f"/{self.plugin._media_token}/media/3456789012/video"

    def tearDown(self):
        asyncio.run(self.plugin._unload())
        self.temp.cleanup()

    def request(self, method="GET", path=None, headers=None, raw=None):
        if raw is None:
            h = {"Host": f"127.0.0.1:{self.port}", **(headers or {})}
            raw = f"{method} {path or self.path} HTTP/1.1\r\n" + "".join(f"{k}: {v}\r\n" for k, v in h.items()) + "\r\n"
            raw = raw.encode("ascii")
        with socket.create_connection(("127.0.0.1", self.port), timeout=4) as conn:
            conn.settimeout(4)
            conn.sendall(raw)
            chunks = []
            while True:
                try:
                    chunk = conn.recv(65536)
                except (ConnectionAbortedError, ConnectionResetError):
                    if b"\r\n\r\n" in b"".join(chunks):
                        break
                    raise
                if not chunk:
                    break
                chunks.append(chunk)
        header, body = b"".join(chunks).split(b"\r\n\r\n", 1)
        lines = header.decode("ascii").split("\r\n")
        status = int(lines[0].split()[1])
        fields = dict(line.lower().split(": ", 1) for line in lines[1:])
        return status, fields, body

    def test_get(self):
        status, h, body = self.request()
        self.assertEqual(status, 200)
        self.assertEqual(body, self.payload)
        self.assertEqual(h["content-type"], "video/mp4")
        self.assertEqual(int(h["content-length"]), len(body))
        self.assertEqual(h["access-control-allow-origin"], "*")

    def test_head(self):
        status, h, body = self.request("HEAD")
        self.assertEqual((status, body), (200, b""))
        self.assertEqual(int(h["content-length"]), len(self.payload))

    def test_options(self):
        status, h, body = self.request("OPTIONS")
        self.assertEqual((status, body), (204, b""))
        self.assertIn("range", h["access-control-allow-headers"])
        self.assertEqual(h["access-control-allow-private-network"], "true")

    def test_range_explicit(self):
        status, h, body = self.request(headers={"Range": "bytes=10-39"})
        self.assertEqual(status, 206)
        self.assertEqual(body, self.payload[10:40])
        self.assertEqual(h["content-range"], f"bytes 10-39/{len(self.payload)}")

    def test_suffix_range(self):
        status, h, body = self.request(headers={"Range": "bytes=-27"})
        self.assertEqual((status, body), (206, self.payload[-27:]))

    def test_open_ended_range(self):
        status, h, body = self.request(headers={"Range": "bytes=8000-"})
        self.assertEqual((status, body), (206, self.payload[8000:]))

    def test_unsatisfiable_range(self):
        status, h, body = self.request(headers={"Range": "bytes=999999-"})
        self.assertEqual((status, body), (416, b""))
        self.assertEqual(h["content-range"], f"bytes */{len(self.payload)}")

    def test_malformed_range(self):
        self.assertEqual(self.request(headers={"Range": "bytes=1-2oops"})[0], 416)

    def test_invalid_token(self):
        self.assertEqual(self.request(path="/wrong/media/3456789012/video")[0], 404)

    def test_traversal(self):
        for path in [f"/{self.plugin._media_token}/media/../main.py", f"/{self.plugin._media_token}/media/3456789012/%2e%2e",
                     f"/{self.plugin._media_token}/preview/../main.py"]:
            with self.subTest(path=path):
                self.assertEqual(self.request(path=path)[0], 404)

    def test_bad_host(self):
        self.assertEqual(self.request(headers={"Host": "attacker.example"})[0], 403)

    def test_methods(self):
        self.assertEqual(self.request(method="POST")[0], 405)

    def test_duplicate_headers(self):
        raw = f"GET {self.path} HTTP/1.1\r\nHost: 127.0.0.1:{self.port}\r\nRange: bytes=0-1\r\nRange: bytes=2-3\r\n\r\n".encode()
        self.assertEqual(self.request(raw=raw)[0], 400)

    def test_oversized_headers(self):
        raw = f"GET {self.path} HTTP/1.1\r\nHost: 127.0.0.1:{self.port}\r\nX-Large: ".encode() + b"a" * 16384
        try:
            status = self.request(raw=raw)[0]
        except ConnectionResetError:
            # Some OSes reset a socket closed with unread incoming data.
            return
        self.assertEqual(status, 431)

    def test_assignment_list_preserves_assigned_flag(self):
        result = self.plugin._get_local_trailer_sync(0)
        self.assertEqual(result["count"], 1)
        self.assertTrue(result["entries"][0]["assigned"])
        self.assertTrue(result["entries"][0]["videoUrl"].startswith(f"http://127.0.0.1:{self.port}/"))

    def test_saved_assignment_survives_restart_with_fresh_url(self):
        before = self.plugin._trailer_library_file.read_bytes()
        first_url = self.assignment["videoUrl"]
        asyncio.run(self.plugin._unload())
        self.plugin = backend.Plugin()
        self.plugin._preview_dir = self.root / "previews"
        with patch.object(self.plugin, "_install_screensaver", return_value={"ok": True}):
            asyncio.run(self.plugin._main())
        result = self.plugin._get_local_trailer_sync(3456789012)
        self.assertTrue(result["assigned"])
        self.assertNotEqual(first_url, result["videoUrl"])
        self.assertEqual(before, self.plugin._trailer_library_file.read_bytes())

    def test_preview_endpoint(self):
        preview_id = "a" * 24
        path = self.plugin._preview_dir / preview_id / "preview.mp4"
        path.parent.mkdir()
        path.write_bytes(self.payload)
        self.assertEqual(self.request(path=f"/{self.plugin._media_token}/preview/{preview_id}/preview.mp4")[2], self.payload)

    def test_file_disappears_returns_404(self):
        self.plugin._media_path_for(3456789012, "video").unlink()
        self.assertEqual(self.request()[0], 404)

    def test_worker_limit_and_unload(self):
        sockets = [socket.create_connection(("127.0.0.1", self.port), timeout=2) for _ in range(8)]
        try:
            deadline = time.monotonic() + 2
            server = self.plugin._media_server
            while len(server._clients) < 8 and time.monotonic() < deadline:
                time.sleep(0.01)
            # Saturation is rejected at accept, before the server reads a request.
            self.assertEqual(self.request(raw=b"")[0], 503)
            thread = self.plugin._media_thread
            start = time.monotonic()
            asyncio.run(self.plugin._unload())
            self.assertLess(time.monotonic() - start, 3)
            self.assertFalse(thread.is_alive())
            self.assertFalse(server._workers)
        finally:
            for conn in sockets:
                conn.close()

    def test_cancelled_client_does_not_break_server(self):
        with socket.create_connection(("127.0.0.1", self.port), timeout=2) as conn:
            conn.sendall(f"GET {self.path} HTTP/1.1\r\nHost: 127.0.0.1:{self.port}\r\n\r\n".encode())
        self.assertEqual(self.request()[0], 200)

    def test_directory_not_imported(self):
        with self.assertRaises((ValueError, OSError)):
            self.plugin._import_local_trailer_sync(570, str(self.root), "Not a video")

    def test_malicious_library_path(self):
        library = self.plugin._load_trailer_library()
        library["assignments"]["3456789012"]["video"] = "../../original.mp4"
        self.plugin._save_trailer_library(library)
        self.assertEqual(self.request()[0], 404)


class StartupTests(unittest.TestCase):
    def test_frozen_runtime_without_http_server(self):
        code = '''
import builtins, importlib.util, pathlib, sys, types, asyncio, tempfile, logging
root = pathlib.Path(sys.argv[1])
original_import = builtins.__import__
def guarded(name, *args, **kwargs):
    if name in {"http.server", "socketserver", "mimetypes"}:
        raise ModuleNotFoundError("Simulated frozen runtime: " + name)
    return original_import(name, *args, **kwargs)
builtins.__import__ = guarded
with tempfile.TemporaryDirectory() as temp:
    decky = types.ModuleType("decky")
    decky.DECKY_PLUGIN_DIR = root
    decky.DECKY_PLUGIN_SETTINGS_DIR = pathlib.Path(temp) / "settings"
    decky.logger = logging.getLogger("frozen-test")
    sys.modules["decky"] = decky
    spec = importlib.util.spec_from_file_location("plugin", root / "main.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    plugin = mod.Plugin()
    plugin._preview_dir = pathlib.Path(temp) / "previews"
    async def run():
        plugin._install_screensaver = lambda: {"ok": True}
        await plugin._main()
        assert plugin._media_server.server_port > 0
        await plugin._unload()
    asyncio.run(run())
print("frozen-startup-ok")
'''
        result = subprocess.run([sys.executable, "-c", code, str(ROOT)], capture_output=True, text=True, timeout=10)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("frozen-startup-ok", result.stdout)

    def test_debugger_disconnect_is_retryable(self):
        plugin = backend.Plugin()
        with patch.object(plugin, "_eval_in_big_picture_sync", side_effect=ConnectionResetError("WinError 64")):
            result = asyncio.run(plugin.eval_in_big_picture("true"))
        self.assertTrue(result["retryable"])
        self.assertIn("WinError 64", result["error"])

    def test_app_id_bounds(self):
        plugin = backend.Plugin()
        self.assertEqual(plugin._validate_appid(4294967295), 4294967295)
        for appid in [0, -1, 4294967296]:
            with self.assertRaises(ValueError):
                plugin._validate_appid(appid)



class ScreensaverTests(unittest.TestCase):
    def test_registers_only_our_lowercase_native_mode(self):
        with tempfile.TemporaryDirectory() as directory:
            home = Path(directory)
            steam = home / ".steam/steam"
            (steam / "steamui").mkdir(parents=True)
            other = steam / "config/uioverrides/screensavers/other/index.html"
            other.parent.mkdir(parents=True)
            other.write_text("untouched")
            plugin = backend.Plugin()
            with patch.object(backend, "IS_WINDOWS", False), patch.object(backend.Path, "home", return_value=home):
                self.assertTrue(plugin._install_screensaver()["ok"])
            target = other.parent.parent / "trailerhero"
            self.assertEqual((target / "main.js").read_bytes(), (ROOT / "screensaver/main.js").read_bytes())
            self.assertEqual(other.read_text(), "untouched")

    def test_sync_targets_only_our_native_browser(self):
        import io
        targets = [
            {"url": "https://example.com", "webSocketDebuggerUrl": "wrong"},
            {"url": "https://uioverride-trailerhero.steamscreensavers.host/index.html", "webSocketDebuggerUrl": "right"}]
        plugin = backend.Plugin()
        state = {"items": [], "muted": True}
        with patch.object(backend.urllib.request, "urlopen", return_value=io.BytesIO(json.dumps(targets).encode())), patch.object(plugin, "_websocket_json_request", return_value={}) as request:
            result = plugin._sync_screensaver(state)
            self.assertTrue(result["active"])
            self.assertEqual(request.call_args.args[0], "right")
            expression = request.call_args.args[1]["params"]["expression"]
            self.assertIn(json.dumps(state), expression)

class ScreensaverAssetsTests(unittest.TestCase):
    def test_only_bounded_logo_and_font_files_can_be_cached(self):
        import base64
        with tempfile.TemporaryDirectory() as folder:
            plugin=backend.Plugin()
            plugin._screensaver_asset_dir=folder
            webp=base64.b64encode(b"RIFF0000WEBPtest").decode()
            self.assertTrue(plugin._cache_screensaver_asset(webp,42)["ok"])
            self.assertEqual((Path(folder)/"logo-42.webp").read_bytes(),b"RIFF0000WEBPtest")
            for appid in (-1,2**32,"../escape"):
                self.assertFalse(plugin._cache_screensaver_asset(webp,appid)["ok"])
            self.assertFalse(plugin._cache_screensaver_asset("broken",42)["ok"])
            self.assertFalse(plugin._cache_screensaver_asset(webp,0)["ok"])
            font=base64.b64encode(b"OTTOtest").decode()
            self.assertTrue(plugin._cache_screensaver_asset(font)["ok"])
            self.assertTrue((Path(folder)/"steam-ui-font.ttf").exists())

class FrozenCompatibilityTests(unittest.TestCase):
    def test_missing_optional_modules_do_not_prevent_startup_or_local_playback(self):
        code = r'''
import builtins, importlib.util, pathlib, sys, types, asyncio, tempfile, logging, json, socket
root = pathlib.Path(sys.argv[1])
blocked = set(json.loads(sys.argv[2]))
original_import = builtins.__import__
def guarded(name, *args, **kwargs):
    if name in blocked:
        raise ModuleNotFoundError('Simulated frozen runtime: ' + name, name=name)
    return original_import(name, *args, **kwargs)
builtins.__import__ = guarded
with tempfile.TemporaryDirectory() as temp:
    folder = pathlib.Path(temp)
    decky = types.ModuleType('decky')
    decky.DECKY_PLUGIN_DIR = root
    decky.DECKY_PLUGIN_SETTINGS_DIR = folder / 'settings'
    decky.logger = logging.getLogger('frozen-regression')
    sys.modules['decky'] = decky
    spec = importlib.util.spec_from_file_location('plugin', root / 'main.py')
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    assert (mod._SequenceMatcher is None) == ('difflib' in blocked)
    assert (mod._unicodedata is None) == ('unicodedata' in blocked)
    plugin = mod.Plugin()
    plugin._preview_dir = folder / 'previews'
    def broken_screensaver():
        raise RuntimeError('Optional registration must not run during core startup')
    plugin._install_screensaver = broken_screensaver
    async def run():
        await plugin._main()
        try:
            source = folder / 'trailer.mp4'
            payload = b'\x00\x00\x00\x18ftypisom' + b'local-trailer-test' * 100
            source.write_bytes(payload)
            result = plugin._import_local_trailer_sync(3456789012, str(source), 'Local game')
            assert result['assigned']
            port = plugin._media_server.server_port
            path = f'/{plugin._media_token}/media/3456789012/video'
            def request():
                with socket.create_connection(('127.0.0.1', port), timeout=2) as connection:
                    connection.settimeout(2)
                    connection.sendall(f'GET {path} HTTP/1.1\r\nHost: 127.0.0.1:{port}\r\nRange: bytes=0-11\r\n\r\n'.encode())
                    chunks = []
                    while True:
                        chunk = connection.recv(4096)
                        if not chunk: break
                        chunks.append(chunk)
                    return b''.join(chunks)
            response = await asyncio.to_thread(request)
            assert response.startswith(b'HTTP/1.1 206')
            assert response.split(b'\r\n\r\n', 1)[1] == payload[:12]
            ranked = plugin._rank_steam_app_candidates('Pokemon IV', [
                {'appid': 1, 'name': 'Unrelated Game', 'source': 'storesearch'},
                {'appid': 2, 'name': 'Pokemon 4', 'source': 'storesearch'}])
            assert ranked[0]['appid'] == 2, ranked
            assert ranked[0]['ratio'] == 1.0, ranked
        finally:
            await plugin._unload()
        assert plugin._media_server is None
    asyncio.run(run())
print('frozen-local-playback-ok')
'''
        # Fresh processes: preloaded unittest/difflib cannot hide the fault.
        for missing in (['difflib'], ['unicodedata'], ['difflib', 'unicodedata', 'http.server', 'socketserver', 'mimetypes']):
            with self.subTest(missing=missing):
                result = subprocess.run([sys.executable, '-c', code, str(ROOT), json.dumps(missing)],
                                        capture_output=True, text=True, timeout=15)
                self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                self.assertIn('frozen-local-playback-ok', result.stdout)

    def test_optional_screensaver_failure_is_a_structured_response(self):
        plugin = backend.Plugin()
        with patch.object(plugin, '_install_screensaver', side_effect=RuntimeError('unavailable Steam API')):
            result = asyncio.run(plugin.install_screensaver())
        self.assertFalse(result['ok'])
        self.assertIn('unavailable Steam API', result['error'])

    def test_core_startup_never_waits_for_screensaver_registration(self):
        with tempfile.TemporaryDirectory() as directory:
            with patch.object(decky, 'DECKY_PLUGIN_SETTINGS_DIR', Path(directory) / 'settings', create=True):
                plugin = backend.Plugin()
            plugin._preview_dir = Path(directory) / 'previews'
            with patch.object(plugin, '_install_screensaver', side_effect=AssertionError('Not a core dependency')) as optional:
                asyncio.run(plugin._main())
                try:
                    optional.assert_not_called()
                    self.assertGreater(plugin._media_server.server_port, 0)
                finally:
                    asyncio.run(plugin._unload())


class TitleFallbackTests(unittest.TestCase):
    def test_matcher_matches_stdlib_including_ties_and_popular_characters(self):
        import random
        from difflib import SequenceMatcher
        randomizer = random.Random(171)
        pairs = [('', ''), ('', 'a'), ('a', ''), ('tide', 'diet'), ('diet', 'tide'),
                 ('batmanarkhamcity', 'batmanarkhamknight'), ('x' + 'a' * 210, 'y' + 'a' * 210),
                 ('a' * 210 + 'x', 'a' * 210 + 'y'), ('AB' * 200, 'BC' * 200)]
        for _ in range(600):
            alphabet = randomizer.choice(['abc ', 'abcdefghijklmnopqrstuvwxyz0123456789 '])
            a = ''.join(randomizer.choices(alphabet, k=randomizer.randrange(0, 280)))
            b = ''.join(randomizer.choices(alphabet, k=randomizer.randrange(0, 280)))
            pairs.append((a, b))
        for a, b in pairs:
            with self.subTest(a=a[:30], b=b[:30], lengths=(len(a), len(b))):
                self.assertEqual(backend._fallback_sequence_ratio(a, b), SequenceMatcher(None, a, b).ratio())

    def test_fallback_keeps_existing_title_rankings_and_acceptance(self):
        plugin = backend.Plugin()
        candidates = [{'appid': i + 1, 'name': name, 'source': 'storesearch', 'index': i} for i, name in enumerate([
            'Doom Eternal', 'DOOM', 'Batman: Arkham City', 'Batman: Arkham Knight',
            'Baldur’s Gate III', 'Baldurs Gate 3', 'Pokémon IV', 'Pokemon 4',
            'NieR: Automata', 'NiER Automata Game of the YoRHa Edition', 'Unrelated Game'])]
        for query in ['Doom Eternal', 'Batman Arkham City', 'Baldurs Gate 3', 'Pokémon IV', 'NieR Automata']:
            expected = plugin._rank_steam_app_candidates(query, candidates)
            with patch.object(backend, '_SequenceMatcher', None):
                actual = plugin._rank_steam_app_candidates(query, candidates)
            self.assertEqual(actual, expected)
            self.assertEqual([plugin._is_acceptable_steam_match(query, item) for item in actual],
                             [plugin._is_acceptable_steam_match(query, item) for item in expected])

    def test_latin_and_fullwidth_normalization_without_unicode_database(self):
        plugin = backend.Plugin()
        titles = ['Pokémon IV', 'Pokémon Café', 'Brütal Legend', 'Ōkami HD', 'Crème Brûlée',
                  'ＦＩＮＡＬ ＦＡＮＴＡＳＹ １４', 'E\u0301lite', 'Æon', 'Game & Games', 'ゲーム 4']
        for title in titles:
            expected = (plugin._steam_title_key(title), plugin._steam_title_tokens(title))
            with patch.object(backend, '_unicodedata', None):
                self.assertEqual((plugin._steam_title_key(title), plugin._steam_title_tokens(title)), expected)


if __name__ == "__main__":
    unittest.main(verbosity=2)
