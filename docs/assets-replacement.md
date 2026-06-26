# Asset replacement and licensing guide

## Current finding

The repository contains conflicting asset signals:

- `README.md` says HexGL code and resources are MIT unless specified in the file.
- `bkcore/hexgl/tracks/Cityscape.js` is explicitly marked Creative Commons Attribution-NonCommercial 3.0.
- `index.html` credits the ship base model to Charnel and the track texture to Nobiax, which requires source-level verification before commercial use.

## Policy

Treat all original legacy textures, models, audio, track definitions and branding as not commercial-ready until audited individually.

## Replacement workflow

1. Create or license replacement assets.
2. Put new assets under `assets/packs/default/` or a new named commercial pack.
3. Update the pack `manifest.json` with source, author, license and commercial-use evidence.
4. Keep unverified files under `assets/packs/legacy/` only.
5. Run `npm run validate` before opening release PRs.

## Do not

- Do not import `textures/`, `textures.full/`, `geometries/`, or `audio/` from new `src/` modules.
- Do not use HexGL/BKcore branding in a commercial listing without permission.
- Do not enable ads against unverified noncommercial content.
