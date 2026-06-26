# Legacy asset quarantine

This directory marks the quarantine location for legacy HexGL-derived resources.

The original project mixes broad MIT language in `README.md` with file-level Creative Commons Attribution-NonCommercial notices in at least `bkcore/hexgl/tracks/Cityscape.js`. Do not treat legacy textures, models, audio, branding, or track definitions as commercial-ready until each asset has a verified license trail.

New code under `src/` must not import or fetch files from this pack. The validation script enforces that boundary.
