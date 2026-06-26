# Commercialization Architecture

This branch introduces a thin commercial architecture shell around the legacy HexGL runtime without rewriting the renderer in one step.

## Goals

- Keep the original game playable while isolating monetization-facing code.
- Separate code ownership from content ownership.
- Make platform, advertising, analytics and persistence integrations injectable.
- Provide a future migration path from global script loading to a bundled module build.

## Directory plan

```text
src/
  core/           App shell, event bus and cross-cutting application state
  content/        Asset pack registry and content selection
  gameplay/       Session state and gameplay-facing orchestration
  rendering/      Renderer facade around the legacy Three.js renderer
  ui/             Menu and HUD orchestration boundaries
  integrations/   Platform, ads, analytics and storage adapters
  systems/        Durable systems such as saves, progression and economy
  scenes/         Boot, menu, race and future scene lifecycle objects
assets/packs/
  legacy/         Manifest for existing inherited assets; not commercial-safe by default
  default/        Placeholder for replacement commercial-safe content
```

## Integration policy

All commercial integrations default to no-op implementations. Production SDKs should be added as new adapters under `src/integrations/*` and wired through `HexGLCommercial.App` options rather than imported directly in gameplay code.

## Runtime relationship to legacy code

The existing `bkcore.hexgl.HexGL` class remains the race engine for this branch. New files expose lifecycle seams and service abstractions so the next step can replace content, introduce a build system and migrate legacy globals incrementally.
