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
- Arrow/WASD controls change movement.
- ResultScene appears after completing the prototype distance.
- `legacy-index.html` remains available for reference only.

## Commercial release gates

- No `src/` file references `assets/packs/legacy`.
- No `src/` file references original `textures`, `textures.full`, `geometries`, or `audio` paths.
- No analytics scripts are embedded in `index.html`.
- Ads and analytics providers are no-op unless deliberately replaced.
- Every production asset has source, author, license and commercial-use status in the pack manifest.
