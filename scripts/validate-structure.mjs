import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requiredPaths = [
  'src/core/App.js',
  'src/content/packRegistry.js',
  'src/gameplay/gameSession.js',
  'src/rendering/renderPipeline.js',
  'src/ui/README.md',
  'src/integrations/platform.js',
  'src/integrations/ads.js',
  'src/integrations/telemetry.js',
  'src/integrations/storage.js',
  'src/systems/lifecycle.js',
  'src/scenes/bootScene.js',
  'assets/packs/legacy/manifest.json',
  'assets/packs/default/manifest.json',
  'commercial-entry.html',
  'docs/ARCHITECTURE.md',
  'docs/COMMERCIALIZATION_AUDIT.md',
  'docs/RESOURCE_REPLACEMENT.md',
  'docs/COMMERCIALIZATION_ROADMAP.md',
  'docs/TEST_CHECKLIST.md'
];

const failures = [];

for (const relativePath of requiredPaths) {
  if (!existsSync(join(root, relativePath))) {
    failures.push(`Missing required path: ${relativePath}`);
  }
}

for (const pack of ['legacy', 'default']) {
  const manifestPath = join(root, 'assets', 'packs', pack, 'manifest.json');
  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      if (manifest.id !== pack) {
        failures.push(`Manifest id mismatch in ${manifestPath}: expected ${pack}`);
      }
    } catch (error) {
      failures.push(`Invalid manifest JSON in ${manifestPath}: ${error.message}`);
    }
  }
}

if (existsSync(join(root, 'commercial-entry.html'))) {
  const commercialEntry = readFileSync(join(root, 'commercial-entry.html'), 'utf8');
  for (const snippet of ['src/core/App.js', 'src/integrations/platform.js', 'src/integrations/ads.js', 'src/integrations/telemetry.js', 'src/integrations/storage.js']) {
    if (!commercialEntry.includes(snippet)) {
      failures.push(`commercial-entry.html does not load ${snippet}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Structure validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Structure validation passed.');
