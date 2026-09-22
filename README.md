# TrailerHero

TrailerHero is a Decky Loader plugin that makes Steam Big Picture feel a little more like a console dashboard.

When you open a game page, the plugin keeps the original Steam hero artwork in place for three seconds, then fades in a muted trailer inside the same hero area. It can use Steam trailers first, and YouTube automatically when Steam has nothing useful.

Press the controller's physical **west face button** to switch from ThemeDeck music to trailer audio, and press it again to switch back. Steam's own live glyph in the footer follows the active controller layout (for example Square on PlayStation, X on Xbox/Steam, or Y on Nintendo).

It also supports per-game Steam video choices, strict YouTube auto-search, intro/outro trimming, optional CRT styling for low-resolution videos, and a small logo assist for game pages that use tiny SteamGridDB logos.

## Languages

TrailerHero follows the current Steam or browser language automatically.

Included languages:

- English
- Italian
- French
- Spanish
- Portuguese
- Brazilian Portuguese
- German
- Dutch
- Ukrainian
- Chinese
- Japanese

## Main Controls

- **Enabled** turns the effect on or off.
- **Game page logo** moves the game logo to the bottom-left while the trailer is visible, then restores it when you leave.
- **Automatic CRT** applies a subtle CRT look to low-resolution trailers.
- **Source** lets each game use automatic mode, Steam, or YouTube.
- **Quality** chooses the preferred video quality for both Steam and YouTube: 720p, 1080p, or 2160p.
- **Steam video** lets you choose any Steam video returned for that game from a dropdown, not just the highlighted trailer.
- **Trim start / Trim end** saves per-game video trimming.
- **Custom YouTube link** lets you save a specific YouTube trailer for one game. If no link is saved, auto-search stays enabled by default, prefers 4K results, and keeps the game title match strict.

## Screensaver

Select **TrailerHero** in Steam's Personalization screensaver selector, then choose the idle delay in Steam. Trailers play in a shuffled order with preloaded crossfades, each game's library logo, and Steam-sized time, date and weather in the upper left. The separate **Screensaver audio** switch in TrailerHero controls sound; it is off by default. Steam handles waking and dismissing the screensaver.

Custom library logos and the Steam UI font are prepared locally from your Steam installation. Weather follows the Weather plugin when available. Unavailable trailers are skipped.

## Notes

The plugin should work well on Linux, but it was built on and for Windows. Please keep this in mind.

This plugin works by carefully reading and adapting Steam Big Picture UI elements. Steam changes its interface often, so some selectors may need updates over time.

YouTube uses direct max-quality playback resolved with yt-dlp, then falls back to the embedded player if direct playback cannot be resolved or played.

TrailerHero hides as much embedded-player chrome as possible during fallback, but YouTube can still briefly show its own internal overlay in some cases.

## 1.7.1 — September 22, 2026

Compatibility and playback-recovery patch based on the supplied 1.7.0 release,
compared with the supplied 1.5.2 project. Existing settings, assigned trailers,
Steam/YouTube sources, trimming, audio controls and screensaver visuals are retained.

- Optional Python title-matching imports no longer stop the backend from loading.
  A self-contained sequence-matching fallback preserves title scores when
  `difflib` is missing. A conservative Latin/full-width normalization fallback
  also allows startup without `unicodedata`. A full Python runtime keeps its
  original Unicode normalization behavior. No pip install is required.
- Core backend startup no longer waits for optional screensaver installation.
  Frontend screensaver/menu failures cannot abort the main plugin initializer.
  Screensaver discovery tolerates absent/late Steam modules and throwing exports;
  it no longer requires the unused `VI` export or a fixed service-export name.
- Screensaver suspension now uses a short-lived native-state confirmation.
  Native-state/media-bridge failures, timeouts, dismissal and unload release the
  game page. Late replies cannot re-enable a dismissed screensaver. Registration
  leaves Steam's screensaver query data alone until its real list has loaded.
- Local-library RPC reads are bounded so a lost backend reply cannot permanently
  block runtime installation or status polling. Failed reads preserve saved local
  source preferences rather than resetting them.

### Verification scope

`npm test` passes **103 offline automated tests** (65 JavaScript, 38 Python).
Coverage includes simulated frozen-runtime startup, actual loopback HTTP byte-range
reads without optional modules, existing route/media regression tests, optional
Steam API failures/timeouts, late replies, unload cleanup and screensaver recovery.
The sequence-matching fallback is also compared with Python's standard matcher
across 609 fixed/generated string pairs inside the test suite.

The five supplied logs all declare **v1.3.0**, not v1.7.0, and stop at the
`difflib` import. That same hard import exists in both supplied source versions;
it is not claimed to be a new 1.7.0-only regression. The additional screensaver
failure paths were identified in the 1.7.0 changes and covered by regression tests.
No new Steam UI snapshot was supplied for this patch. The final plugin has **not**
been run end-to-end inside Steam/Decky on an affected user's Windows installation;
the offline checks do not establish that every reported failure has the same cause.

The Installer and Project packages ship identical runtime files. Windows
`ffmpeg.exe`, `yt-dlp.exe` and `deno.exe` are byte-for-byte unchanged from 1.7.0.
Settings and downloaded/imported trailer files are not packaged or migrated.
After upgrading, restart Steam/Decky to replace the previous backend and injected
frontend together. No settings reset is part of this update.

## 1.5.1 — September 18, 2026

Fixes startup on the supplied Windows Decky runtime when `http.server` is missing.
The read-only media server is now self-contained, bound to loopback and protected
by a per-process token, with bounded connections, correct byte ranges, CORS and
preflight support. No Python installation or extra pip dependency is required.

Updated game-page recognition for Steam's supplied route definitions, including
collection game pages and full 32-bit non-Steam shortcut IDs. The route must agree
with the visible hero; Home, library grids, achievements, properties and the
TrailerHero editor remain excluded. The native game menu hook retries when Steam
loads its module late and leaves Steam's original menu intact if enhancement fails.

Local assignments remain available after a frontend restart. Successful library
refreshes renew media URLs after a backend restart; failed reads do not reset
saved local-source preferences. Runtime polling is stopped on unload, and pending
library reads cannot reinstall the plugin after it has been removed.

The original log also includes `ConnectionResetError [WinError 64]` inside
`decky_loader/localplatform/localsocket.py`. That is Decky's IPC listener, not the
TrailerHero media server. This release handles its own media/debugger disconnects;
it does not modify the loader, suppress its exception handler or claim to repair
Decky's separate IPC implementation.

Installer and Project archives contain the same runtime. Existing settings and
trailer files are not included, overwritten or migrated by the release package.
The bundled Windows `ffmpeg.exe`, `yt-dlp.exe` and `deno.exe` are unchanged.
Linux/SteamOS playback with native tool dependencies has not been tested here.

### Rebuild and test the recovered project

The original TypeScript tree was not present in the supplied 1.5.0 project.
`src/index.js` is the recovered, readable JavaScript entrypoint; it includes the
existing bundle's inlined dependencies. `dist/index.js` is built by copying that
validated source, not by inventing missing TypeScript. No `npm install` is needed.
Use Node.js 18+ and Python 3.10+:

```sh
npm run build
npm test
npm run package
```

To select an output directory, run
`python scripts/package-release.py --output-dir /path/to/releases`.
See `HANDOVER_1.5.1.md` and `TEST_REPORT_1.5.1.md` in the Project archive for the
change scope, evidence and remaining real-device checks.

## 1.5.0

Added the full-screen per-game settings route with controller-confined four-direction focus, automatic scroll-follow-focus, and immediate Steam header/footer/search suppression with clean restoration on exit.

Steam MPEG-DASH and HLS trailers are now materialized through the bundled current yt-dlp, Deno/EJS and ffmpeg toolchain. Preview files use a separate bounded temporary cache; saved assignments remain atomic and are replaced only after a successful download or import.

YouTube downloads now pass the original watch URL to yt-dlp end-to-end instead of downloading expiring signed preview URLs. Steam, YouTube and local previews autoplay and loop automatically. The per-game trailer mode presents Streaming, Download/Local, and Import as controller-friendly actions with explicit saved-state and deletion feedback.

The 1.5.0 maintenance build fixes the local importer with a real Windows video chooser and a controller-friendly internal browser fallback. Folder entries are opened instead of being submitted as files, and every selected path is checked again before import.

Per-game Steam and YouTube previews now prefer a short, compatibility-oriented local MP4 clip while keeping direct-stream fallbacks available. A preview is considered active only after its playback time actually advances, so a decoded thumbnail or first frame is no longer mistaken for a running video.

The dedicated settings route pauses normal game-page runtime refreshes while it is open, avoids embedding a YouTube iframe in Steam's focus tree, and contains unexpected rendering errors inside TrailerHero instead of allowing them to replace the whole Shared SteamUI view. Frontend failures are also written to the Decky log for diagnosis. The project and installer use the same `main.py` and `dist/index.js` implementation.

## 1.4.0

Trailer playback is now strictly tied to Steam's real game-detail route. Library Home remains trailer-free even while Steam keeps stale URLs in the visible Big Picture window or displays a full-width focused hero.

Added the native **X** footer action for switching between ThemeDeck music and trailer audio. Steam DASH trailers now load their audio stream alongside the video, and TrailerHero publishes the existing Playhub playback signal so ThemeDeck pauses and resumes immediately without a ThemeDeck update.

## 1.2.5

Removed the configurable Home mode, its toggle, experimental disclaimer, saved setting, and related styles. TrailerHero never starts on the actual Library Home surface, even when Steam displays a full-width focused-game hero. It still supports a real game-details surface when Steam temporarily leaves the stale `/library/home` URL in place.

Improved trailer startup reliability. Explicit game-detail routes are now accepted before the library-overview heuristic, so valid game pages are not intermittently rejected when Steam renders additional library tiles. Steam video candidates can recover after a late media error, stalled direct URLs time out, and adaptive-stream network requests now have bounded timeouts.

Smoothed game-logo entry when a trailer starts. Logo images now wait until their pixels are loaded before fading in, while Steam's native text-title fallback receives the same controlled fade instead of appearing abruptly.

## 1.2.2

Stabilized runtime refreshes when changing Steam videos and trim values from the plugin menu. The current media now tracks the selected source, Steam movie, quality, trim values, and YouTube fallback state, so changing one of them forces a clean trailer restart without leaving the game page.

Fixed custom trim looping so the video jumps back to the trim-start point before the outro instead of reaching the end and disappearing. Steam appdetails video URLs are now favored over generated CDN guesses for more reliable playback of alternate official Steam trailers.

## 1.2.1

Added automatic Steam trailer lookup for non-Steam games. In automatic source mode, TrailerHero now resolves a close Steam Store match from the game title, saves the matched Steam AppID, and uses the official Steam trailer before falling back to any saved or auto-searched YouTube trailer.

Steam trailer playback now also uses the video URLs declared by Steam appdetails before trying generated CDN fallbacks. Bulk YouTube reassignment still saves YouTube links, but leaves automatic source mode free to prefer Steam first.

## 1.2.0

Promoted the stable 0.1.20 build to version 1.2.0. No functional behavior was changed.

## 0.1.20

Made direct max-quality YouTube playback the default behavior and removed the playback-mode dropdown from the plugin menu. The iframe player remains as automatic fallback only.

## 0.1.19

Added a global YouTube playback selector:
- Stable iframe player.
- Experimental direct max-quality playback with iframe fallback.

The direct mode resolves temporary YouTube stream URLs through yt-dlp, keeps them out of permanent settings, prunes the temporary cache, and retries when links expire.

## 0.1.18

Clean rebuild from the uploaded 0.1.6 base.

Included only the YouTube/search/bulk-reset work up to the safe 0.1.15 line:
- yt-dlp based YouTube search.
- YouTube query field.
- YouTube results dropdown, up to 10 results.
- Selecting a dropdown result immediately applies it.
- Global YouTube enable/disable toggle.
- Cleaner Steam title detection to avoid global UI text.
- More aggressive YouTube quality requests.
- Global non-Steam YouTube reassignment with Decky confirmation modal.
- Destructive reset of saved YouTube videos, queries, and YouTube preferred sources before reassignment.

Excluded the broken 0.1.16 / 0.1.17 YouTube layout experiments.
