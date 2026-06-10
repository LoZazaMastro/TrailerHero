# TrailerHero

TrailerHero is a Decky Loader plugin that makes Steam Big Picture feel a little more like a console dashboard.

When you open a game page, the plugin keeps the original Steam hero artwork in place for three seconds, then fades in a muted trailer inside the same hero area. It can use Steam trailers first, and YouTube automatically when Steam has nothing useful.

It also supports the Steam Big Picture home page, per-game Steam video choices, strict YouTube auto-search, intro/outro trimming, optional CRT styling for low-resolution videos, and a small logo assist for game pages that use tiny SteamGridDB logos.

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
- **Enable on home** also plays trailers on the Steam Big Picture library home.
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

YouTube is handled through the embedded player. TrailerHero hides as much player chrome as possible, but YouTube can still briefly show its own internal overlay in some cases.
