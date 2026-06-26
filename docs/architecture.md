# Commercial architecture

This branch introduces a runnable modular skeleton without changing the upstream `master` branch directly. The first target platform is mobile landscape.

## Directory map

```text
src/
  core/          App lifecycle, event bus, loop, state, config
  content/       Asset pack metadata and content catalog
  gameplay/      Vehicle state, physics, race rules
  rendering/     Rendering facade; currently a canvas prototype renderer
  ui/            Menu, HUD, mobile controls, orientation gate, pause/result UI
  integrations/  Platform, ads, analytics, save abstractions; default no-op
  systems/       Input, orientation, resources, audio, time and other cross-scene systems
  scenes/        Boot, menu, race and result scene orchestration
```

## Runtime flow

```text
main.js -> App.boot()
  -> OrientationSystem reports mobile/landscape state
  -> OrientationGate blocks portrait phones with a rotate prompt
  -> BootScene loads assets/packs/default/manifest.json
  -> MenuScene renders mobile-first shell
  -> RaceScene mounts HUD + MobileControls and runs gameplay/renderer
  -> ResultScene routes post-race hooks through AppBridge
```

## Mobile-first rules

- Main gameplay is landscape-first on phones.
- Portrait mobile state displays an orientation gate and pauses race updates.
- Touch controls write into `InputSystem` actions; gameplay does not know whether input came from touch or keyboard.
- HUD must stay compact and safe-area aware in landscape phone layouts.
- Ads must not interrupt active gameplay.

## Dependency rules

- `gameplay/` must not import `ui/`, `rendering/`, `integrations/`, or browser globals.
- `ui/` may read scene context but should not own game rules.
- `rendering/` owns canvas/WebGL details behind a facade.
- `integrations/` is the only location for ads, analytics, platform SDKs and save adapters.
- `systems/ResourceSystem.js` is the only module that loads asset pack manifests.
- `systems/OrientationSystem.js` is the only module that detects orientation/mobile-like viewport state.

## Legacy runtime

The original entry has been copied to `legacy-index.html` for comparison. It remains useful for reference, but it is not the commercial entrypoint. The new commercial skeleton starts from `index.html` and `src/main.js`.
