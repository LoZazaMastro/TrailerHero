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

If a future TypeScript source tree is reconstructed, compare it against `dist/index.js` before publishing. Do not replace the bundle unless the rebuilt output preserves the current runtime behavior.


## 1.2.5 maintenance

Home mode and its setting were removed completely; runtime playback is now restricted to individual game detail pages.
