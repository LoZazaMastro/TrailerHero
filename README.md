# TrailerHero

TrailerHero is a Decky Loader plugin that makes Steam Big Picture feel a little more like a console dashboard.

When you open a game page, the plugin keeps the original Steam hero artwork in place for three seconds, then fades in a muted trailer inside the same hero area. It can use Steam trailers first, and YouTube automatically when Steam has nothing useful.

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

## Notes

The plugin should work well on Linux, but it was built on and for Windows. Please keep this in mind.

This plugin works by carefully reading and adapting Steam Big Picture UI elements. Steam changes its interface often, so some selectors may need updates over time.

YouTube uses direct max-quality playback resolved with yt-dlp, then falls back to the embedded player if direct playback cannot be resolved or played.

TrailerHero hides as much embedded-player chrome as possible during fallback, but YouTube can still briefly show its own internal overlay in some cases.

## 1.2.5

Removed Home mode completely. TrailerHero now runs only on individual game detail pages; the Home toggle, experimental disclaimer, saved Home setting, focused-capsule detection, Home-specific hero handling, and related styles have all been removed.

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
