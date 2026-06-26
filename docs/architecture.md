# Commercial architecture

This branch introduces a runnable modular skeleton without changing the upstream `master` branch directly.

## Directory map

```text
src/
  core/          App lifecycle, event bus, loop, state, config
  content/       Asset pack metadata and content catalog
  gameplay/      Vehicle state, physics, race rules
  rendering/     Rendering facade; currently a canvas prototype renderer
  ui/            Menu, HUD, pause/result UI surfaces
  integrations/  Platform, ads, analytics, save abstractions; default no-op
  systems/       Input, resources, audio, time and other cross-scene systems
  scenes/        Boot, menu, race and result scene orchestration
```

## Runtime flow

```text
main.js -> App.boot()
  -> BootScene loads assets/packs/default/manifest.json
  -> MenuScene renders safe shell
  -> RaceScene runs gameplay and renderer
  -> ResultScene routes post-race hooks through AppBridge
```

## Dependency rules

- `gameplay/` must not import `ui/`, `rendering/`, `integrations/`, or browser globals.
- `ui/` may read scene context but should not own game rules.
- `rendering/` owns canvas/WebGL details behind a facade.
- `integrations/` is the only location for ads, analytics, platform SDKs and save adapters.
- `systems/ResourceSystem.js` is the only module that loads asset pack manifests.

## Legacy runtime

The original entry has been copied to `legacy-index.html` for comparison. It remains useful for reference, but it is not the commercial entrypoint. The new commercial skeleton starts from `index.html` and `src/main.js`.
