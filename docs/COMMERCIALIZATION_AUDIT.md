# Commercialization audit

## License findings

| Area | Evidence | Commercial risk | Action |
| --- | --- | --- | --- |
| Root license | `LICENSE` is MIT. | Low for files actually covered by MIT. | Keep copyright notice and MIT text in distributions. |
| README license statement | README says code and resources are MIT unless specified in the file. | Medium because file-level exceptions exist. | Treat file-level headers as authoritative. |
| Core game files | `bkcore/hexgl/HexGL.js` declares Creative Commons Attribution-NonCommercial 3.0. | High for commercial use. | Re-license with rights holder or replace/rewrite affected code. |
| Track/resource loader | `bkcore/hexgl/tracks/Cityscape.js` declares Creative Commons Attribution-NonCommercial 3.0 and references textures, geometries, analyzers, HUD images, and audio. | High for commercial use. | Replace legacy track, ship, texture, HUD, skybox, and audio assets before monetization. |
| Credits | `index.html` credits model and track texture contributors separately. | Medium/high until provenance is confirmed. | Preserve attribution in evaluation builds; collect written commercial permissions or replace. |
| Analytics | `index.html` includes a legacy Google Analytics snippet. | Product/privacy risk for modern commercial releases. | New commercial shell uses no-op telemetry; remove or gate legacy analytics before release. |

## Code authorization vs asset authorization

- Do not assume the root MIT license covers every file. The README itself says exceptions may exist.
- Treat JavaScript files with CC BY-NC headers as non-commercial until replaced or re-licensed.
- Treat all resources loaded by `Cityscape.js` as commercially blocked because they are coupled to a non-commercial track definition and have independent provenance requirements.
- Treat `textures/`, `textures.full/`, `geometries/`, `audio/`, and game UI images as legacy evaluation content only.

## Current decision

Commercial release is **not approved** with the legacy pack. The project can be used as a technical prototype while commercial-safe code and assets are prepared in `assets/packs/default`.
