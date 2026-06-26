# Test checklist

## Static validation

- Run `npm run validate:structure`.
- Confirm required `src/` module directories exist.
- Confirm both resource pack manifests exist.
- Confirm commercial docs exist.

## Browser smoke test

- Open `index.html` and verify legacy gameplay still starts.
- Open `commercial-entry.html` and verify the App shell initializes before legacy launch.
- Test keyboard controls.
- Test touch controls on a mobile browser.
- Test all quality options.

## Release gate

- Confirm release builds do not point at legacy asset roots.
- Confirm external providers are not loaded by default.
- Confirm save data remains runtime-only until persistence requirements are approved.
- Confirm credits and attribution are updated for any replacement assets.

## Regression areas

- WebGL availability fallback.
- Audio start and stop behavior.
- Race finish and restart flow.
- HUD rendering.
- Track collision and height map behavior.
