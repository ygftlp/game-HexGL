# Test Checklist

## Static structure

- `node scripts/validate-structure.js`
- Confirm all planned top-level source domains exist.
- Confirm both `assets/packs/legacy/pack.json` and `assets/packs/default/pack.json` exist.
- Confirm `index.html` does not load remote Google Analytics directly.

## Browser smoke test

1. Serve the project locally with a static server.
2. Open `index.html` in a WebGL-capable browser.
3. Confirm the menu renders.
4. Start a race with keyboard controls.
5. Confirm progress bar reaches 100% and the race scene starts.
6. Confirm no third-party analytics or ad network request is emitted by default.

## Commercialization gates

- Legacy asset pack remains blocked for commercial builds.
- Default pack has asset provenance evidence before release.
- Ads, analytics and storage integrations are enabled only through explicit adapters.
- Privacy/consent UX is reviewed before analytics or ad SDKs are added.

## Regression areas

- Keyboard, touch, orientation, gamepad and Leap Motion control selection.
- Low/high quality asset loading.
- HUD on/off behavior.
- Game over and restart flow.
- Audio fallback behavior in browsers with autoplay restrictions.
