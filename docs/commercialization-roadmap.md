# Commercialization roadmap

## Phase 1: Architecture isolation

- Keep `master` stable.
- Use `codex/commercial-architecture-skeleton` for the first architecture PR.
- Add default no-op integrations for ads, analytics, platform and save.
- Quarantine legacy resources.

## Phase 2: Content replacement

- Replace ship, track, HUD, audio and branding assets.
- Produce an asset bill of materials with license proof.
- Add a production pack such as `assets/packs/neon-city/`.

## Phase 3: Monetization

- Implement `AdsProvider` behind the existing no-op interface.
- Trigger interstitials only at natural breaks such as post-race.
- Add rewarded hooks only for optional rewards.
- Keep monetization disabled by default in development.

## Phase 4: Analytics and live ops

- Implement `Analytics` with privacy-aware event names.
- Track boot, menu start, race start, race finish and error events.
- Add consent gates where required by target regions.

## Phase 5: Platform packaging

- Add PWA packaging first.
- Add Capacitor/Cordova/native wrappers only after asset licensing is cleared.
- Validate mobile input, performance and store policy requirements.
