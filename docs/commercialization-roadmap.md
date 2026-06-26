# Commercialization Roadmap

## Phase 0: Legal gate

- Preserve original notices.
- Identify every file with non-commercial or unclear license terms.
- Decide whether to relicense with author permission or replace content.
- Do not ship paid, ad-supported, sponsored or platform-store builds with legacy assets enabled.

## Phase 1: Architecture shell

- Introduce `HexGLCommercial.App`.
- Route platform, ads, analytics and storage through injected adapters.
- Keep default adapters no-op.
- Add asset pack manifests for legacy and replacement packs.

## Phase 2: Content replacement

- Build the `default` pack using commercial-safe content.
- Add metadata evidence for every asset.
- Update track definitions to read from the selected pack instead of hard-coded legacy roots.

## Phase 3: Productization

- Add build tooling, linting and test automation.
- Add mobile/web platform wrappers as adapters.
- Add gated analytics, ads and persistence SDKs behind explicit configuration.
- Add privacy policy, consent flow and store compliance checks.

## Phase 4: Launch readiness

- Run license audit.
- Run device performance matrix.
- Validate monetization, save data, crash recovery and offline behavior.
- Prepare store screenshots, trailer and branding using only replacement assets.
