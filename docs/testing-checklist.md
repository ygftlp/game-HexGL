# Testing checklist

## Local checks

```bash
npm run validate
npm run start
```

Open `http://localhost:4173/` and verify:

- The new `index.html` loads the modular app.
- BootScene loads `assets/packs/default/manifest.json`.
- MenuScene can start the prototype race.
- On a phone-sized portrait viewport, the rotate-phone gate appears.
- On a landscape phone viewport, the game chrome compresses and touch controls appear.
- Touch controls drive steering, acceleration, braking and boost through `InputSystem`.
- Race updates pause while the portrait gate is blocking gameplay.
- ResultScene appears after completing the prototype distance.
- `legacy-index.html` remains available for reference only.

## Suggested viewport checks

- iPhone SE landscape/portrait
- 390x844 portrait and 844x390 landscape
- 430x932 portrait and 932x430 landscape
- Android 360x800 portrait and 800x360 landscape
- Tablet landscape where HUD should remain readable

## Commercial release gates

- No `src/` file references `assets/packs/legacy`.
- No `src/` file references original `textures`, `textures.full`, `geometries`, or `audio` paths.
- No analytics scripts are embedded in `index.html`.
- Ads and analytics providers are no-op unless deliberately replaced.
- Every production asset has source, author, license and commercial-use status in the pack manifest.
- Ads are only triggered at menu/result breaks, not inside active race control loops.
