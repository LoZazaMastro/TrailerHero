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
- Runtime revision `1.2.5.9`, including reliable game-route detection,
  repeatable `canplay` handling, candidate watchdogs, and bounded adaptive-stream
  network requests. Logo images reveal only after loading, and native text-title
  fallbacks use a separate zero-opacity preparation state before their fade-in.

If a future TypeScript source tree is reconstructed, compare it against `dist/index.js` before publishing. Do not replace the bundle unless the rebuilt output preserves the current runtime behavior.


## 1.2.5 maintenance

The configurable Home mode and its setting remain removed. The actual Library
Home surface is always rejected when its overview marker is present, regardless
of the temporarily stale route or a full-width focused hero. A real game-details
surface remains supported when Steam has not yet updated `/library/home`.

`dist/index.js` currently uses settings schema 12. Preserve that value and the
runtime revision when applying future bundle-only fixes.
