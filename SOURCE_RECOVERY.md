# Source Recovery Notes

This repository is reconstructed from the validated TrailerHero 1.2.5 plugin bundle.

The current publishable frontend is:

- `dist/index.js`

The original TypeScript source tree was not available in this local rebuild, so `dist/index.js` is intentionally treated as the source of truth for the current working plugin behavior.

Important current behavior lives in the bundle:

- YouTube direct max-quality playback with iframe fallback.
- Automatic Steam trailer lookup for non-Steam games.
- Steam-first source priority in Auto mode, with YouTube as fallback.
- Runtime stability fixes for Steam video selection, saved YouTube fallback links, and custom trim looping.
- Runtime revision `1.5.0.5`, including authoritative Steam route detection,
  native X footer audio switching, ThemeDeck playback handoff, DASH audio support,
  repeatable `canplay` handling, candidate watchdogs, and bounded adaptive-stream
  network requests. Logo images reveal only after loading, and native text-title
  fallbacks use a separate zero-opacity preparation state before their fade-in.

If a future TypeScript source tree is reconstructed, compare it against `dist/index.js` before publishing. Do not replace the bundle unless the rebuilt output preserves the current runtime behavior.


## 1.2.5 maintenance

The configurable Home mode and its setting remain removed. The actual Library
Home surface is always rejected when its overview marker is present, regardless
of the temporarily stale route or a full-width focused hero. A real game-details
surface remains supported when Steam has not yet updated `/library/home`.

`dist/index.js` currently uses settings schema 13. Preserve that value and the
runtime revision when applying future bundle-only fixes.

## 1.5.0 preview and import maintenance

The per-game route captures the current runtime trailer context before leaving the Steam game page. Preserve `previewUrl`, `previewCandidates`, `sourceAppId`, `selectedSteamMovieId`, and `youtubeVideoId` in the injected runtime snapshot. Steam preview resolution must retain generated CDN fallbacks.

Do not mount a React-managed YouTube iframe in the full-screen settings route: it can destabilize Shared SteamUI during the settings rerender. Keep a thumbnail/preparing state visible while `get_youtube_trailer_preview` materializes a local preview, then switch to the normal `<video>` path. The actual game-page runtime may continue using its independent YouTube fallback. The runtime route detector must explicitly reject `/trailerhero/:appid` and `.thGamePage`.

The per-game local importer first uses TrailerHero's own native Windows `OpenFileDialog`, then falls back to the controller-friendly browser backed by `list_local_trailer_directory` when the native chooser is unavailable. Folder rows must only navigate, while only MP4, M4V, MOV, WebM and MKV rows may be submitted to `import_local_trailer`. Keep the browser extension filter aligned with `_validate_video_file`, preserve the Windows “This PC” drive root, and validate the returned path again with `inspect_local_trailer_path` before import. Do not return to Decky's stock picker: some SteamUI/Decky builds return the current folder as though it were a selected file.

The project and installer must always be packaged from the same `dist/index.js` and `main.py`. The YouTube result action requires the local `selectYouTubeResult` handler; a missing handler causes an unhandled SteamUI event exception even though yt-dlp search and resolution are working.

Preview cache IDs currently use the `preview-clip-v3` / `youtube-preview-clip-v3` prefixes so older full-length or incompatible cached files are not reused. Settings previews cap local preparation at 720p and request a 24-second AVC/AAC-compatible MP4 clip through yt-dlp/ffmpeg. Preserve direct Steam/YouTube candidates as fallbacks and preserve HTTP `Range`, CORS and `OPTIONS` support in the local media server.

`TrailerPreview` must not mark a candidate as playing from `loadeddata`, `canplay` or a static first frame alone. Keep the `timeupdate`-based advancement check. Keep `TrailerHeroSurfaceBoundary` around both the per-game route and QAM, and keep `report_frontend_error` so Shared SteamUI render faults become recoverable TrailerHero views with useful Decky log output.

