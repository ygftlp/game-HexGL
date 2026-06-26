#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredPaths = [
  'src/core/App.js',
  'src/core/EventBus.js',
  'src/content/AssetPackRegistry.js',
  'src/gameplay/GameSession.js',
  'src/rendering/RendererFacade.js',
  'src/ui/MenuController.js',
  'src/integrations/platform/BrowserPlatform.js',
  'src/integrations/ads/NoopAds.js',
  'src/integrations/analytics/NoopAnalytics.js',
  'src/integrations/storage/NoopStorage.js',
  'src/systems/SaveSystem.js',
  'src/scenes/BootScene.js',
  'src/scenes/MenuScene.js',
  'src/scenes/RaceScene.js',
  'assets/packs/legacy/pack.json',
  'assets/packs/default/pack.json',
  'docs/architecture.md',
  'docs/asset-replacement.md',
  'docs/commercialization-roadmap.md',
  'docs/test-checklist.md'
];

const failures = [];
for (const relativePath of requiredPaths) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`Missing required path: ${relativePath}`);
  }
}

for (const manifestPath of ['assets/packs/legacy/pack.json', 'assets/packs/default/pack.json']) {
  const absolutePath = path.join(root, manifestPath);
  if (fs.existsSync(absolutePath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
      if (!manifest.id) failures.push(`Manifest ${manifestPath} is missing id`);
      if (typeof manifest.commercialUse !== 'boolean') {
        failures.push(`Manifest ${manifestPath} must declare commercialUse as boolean`);
      }
    } catch (error) {
      failures.push(`Manifest ${manifestPath} is not valid JSON: ${error.message}`);
    }
  }
}

const indexPath = path.join(root, 'index.html');
if (fs.existsSync(indexPath)) {
  const index = fs.readFileSync(indexPath, 'utf8');
  if (/google-analytics\.com|_gaq/.test(index)) {
    failures.push('index.html must not load Google Analytics directly; use analytics adapter instead.');
  }
  if (!/src\/core\/App\.js/.test(index)) {
    failures.push('index.html must load the commercial architecture shell before launch.js.');
  }
}

if (failures.length > 0) {
  console.error('Structure validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Structure validation passed.');
