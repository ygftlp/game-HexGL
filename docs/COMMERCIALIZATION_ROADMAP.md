# Commercialization roadmap

## Phase 0: Legal gate

- Confirm whether any CC BY-NC files can be re-licensed for commercial use.
- Replace or rewrite files that cannot be re-licensed.
- Collect provenance for all art, audio, geometry, fonts, and UI images.

## Phase 1: Technical shell

- Use `commercial-entry.html` for commercial experiments.
- Keep platform, ads, telemetry, and storage as no-op adapters until product requirements are approved.
- Move menu, scene, and game session state out of `launch.js` into `src/` modules.

## Phase 2: Commercial-safe content

- Populate `assets/packs/default` with original or properly licensed resources.
- Update track loading so it resolves through the pack registry instead of hard-coded legacy folders.
- Validate that the default pack no longer references legacy paths.

## Phase 3: Monetization readiness

- Add real platform adapters behind feature flags.
- Add consent and privacy controls before telemetry.
- Add ads only after age-rating, platform policy, and UX review.
- Add save migration tests before enabling persistent storage.

## Phase 4: Release checklist

- Run structure validation.
- Run browser smoke tests on desktop and touch devices.
- Verify attribution and license notices.
- Verify no non-commercial assets are bundled in the release build.
