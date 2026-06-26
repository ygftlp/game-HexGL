# Mobile-first direction

## Decision

The commercial mobile version should be landscape-first.

HexGL-style 3D racing depends on wide forward visibility, left/right avoidance space, speed perception and HUD space. A portrait version would require a different camera, narrower track assumptions and a more runner-like design, so it should be treated as a separate product variant rather than the first mobile build.

## Runtime behavior

- Phones and coarse-pointer devices are treated as mobile-like.
- Portrait mobile view shows a rotate-phone gate.
- Race updates pause while the orientation gate is blocking gameplay.
- Landscape mobile view hides desktop chrome and exposes touch controls.
- Menu, race and result remain landscape-friendly.

## Control layout

```text
left side:  left / right steering
right side: brake / accelerate / boost
```

The current `MobileControls` implementation writes into the same `InputSystem` action state as the keyboard adapter. This keeps gameplay independent from the input device.

## HUD layout

Landscape phone HUD is compact and top-aligned:

- speed
- progress
- elapsed time
- best time when available

## Monetization guidance

- Do not interrupt active racing with ads.
- Use post-race interstitials sparingly.
- Use rewarded ads for optional revive, double reward, cosmetics or unlock acceleration.
- Keep all ad hooks behind `integrations/AdsProvider.js`.

## Future work

- Add safe-area QA on iOS Safari and Android Chrome.
- Add real device tests for 16:9, 19.5:9 and tablet ratios.
- Add optional gyroscope steering behind a separate adapter.
- Add PWA orientation metadata after packaging decisions.
