# Resource replacement guide

## Resource pack policy

- `assets/packs/legacy` documents current repository resources. It is for evaluation only and is blocked for monetized builds until rights are cleared.
- `assets/packs/default` is the target commercial-safe pack. Add new assets here with provenance records.

## Replacement order

1. Track geometry and collision/height analyzers.
2. Track textures: diffuse, specular, normal, banners, scraper textures, start area.
3. Ship geometry and ship/booster textures.
4. HUD images, help screens, iconography, skybox.
5. Music and sound effects.
6. Credits, attribution, store screenshots, and metadata.

## Provenance requirements

Every production asset should have a nearby note containing:

- author or vendor
- source URL or contract reference
- exact license or purchase terms
- commercial use permission
- redistribution and modification rights
- attribution wording, if required

## Build gating

A commercial build should fail if it references `assets/packs/legacy`, `textures/`, `textures.full/`, `geometries/`, or `audio/` directly without an explicit waiver.
