# Asset Replacement Guide

## Current risk summary

The legacy project mixes broad MIT language in the root README with file-level Creative Commons Attribution-NonCommercial 3.0 notices in gameplay and track code. For commercial release, treat every inherited art, audio, geometry, UI image, brand mark and copied title asset as restricted until verified.

## Packs

- `assets/packs/legacy/pack.json` documents the inherited roots and marks them as non-commercial-risk.
- `assets/packs/default/pack.json` is the commercial-safe target pack. It is a placeholder until original or fully licensed replacement content is produced.

## Replacement checklist

1. Replace `textures/` and `textures.full/` with original or properly licensed textures.
2. Replace `geometries/` with original models and collision data.
3. Replace `audio/` with original or licensed music and effects.
4. Replace `css/*.png`, title art, favicon and Open Graph imagery.
5. Remove or rewrite legacy credits that imply use of third-party non-commercial assets.
6. Add source, author, license, receipt and usage scope metadata for every asset in the target pack.
7. Disable legacy fallback for production builds.

## Metadata required per asset

```json
{
  "path": "assets/packs/default/...",
  "type": "texture|model|audio|ui|font",
  "author": "Name or vendor",
  "license": "Proprietary owned / CC0 / paid license name",
  "commercialUse": true,
  "evidence": "receipt, contract, source URL or internal ticket"
}
```
