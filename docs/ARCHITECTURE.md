# Commercial modularization architecture

## Current entry points

- `index.html` is the legacy entry. It loads vendor libraries, legacy BKcore modules, `bkcore/hexgl/tracks/Cityscape.js`, `bkcore/hexgl/HexGL.js`, then `launch.js`.
- `launch.js` directly owns menu state, WebGL detection, quality/control selection, and construction of `bkcore.hexgl.HexGL`.
- `commercial-entry.html` is the new non-destructive entry for commercial refactoring. It loads the same legacy runtime, then initializes `bkcore.commercial.App` before `launch.js`.

## Target source layout

```text
src/
  core/          App composition root and runtime config
  content/       resource pack registry and manifest loading
  gameplay/      session state, progression, economy-safe game rules
  rendering/     renderer/post-processing quality selection
  ui/            menu, HUD shell, store-safe presentation code
  integrations/  platform, ads, telemetry, storage adapters
  systems/       lifecycle and cross-cutting app systems
  scenes/        boot/menu/game/result scene transitions
```

## App composition

`src/core/App.js` wires the default modules. All monetization, platform, telemetry, and storage adapters are no-op by default, so the commercial shell can be tested without third-party SDKs, network calls, payments, or persistent data writes.

## Migration strategy

1. Keep the legacy runtime intact while the new shell is introduced.
2. Replace hard-coded calls in `launch.js` with calls into `App` module boundaries.
3. Move legacy scene/menu orchestration into `src/scenes` and `src/ui`.
4. Add a clean `default` asset pack and switch development builds from `legacy` to `default` only after replacement assets are complete.
5. Remove or isolate legacy files that have non-commercial headers before any paid/ad-supported distribution.
