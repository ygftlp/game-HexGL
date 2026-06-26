#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredDirs = [
  'src/core',
  'src/content',
  'src/gameplay',
  'src/rendering',
  'src/ui',
  'src/integrations',
  'src/systems',
  'src/scenes',
  'assets/packs/default',
  'assets/packs/legacy',
  'docs',
];

const failures = [];

for (const dir of requiredDirs) {
  if (!fs.existsSync(path.join(root, dir))) {
    failures.push(`Missing required directory: ${dir}`);
  }
}

for (const file of ['index.html', ...walk(path.join(root, 'src'))]) {
  if (!/\.(html|js|mjs)$/.test(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file).split(path.sep).join('/');

  assertNot(content.includes('assets/packs/legacy'), relative, 'new source must not reference legacy asset pack');
  assertNot(/google-analytics\.com|_gaq|UA-\d+/i.test(content), relative, 'new entrypoint must not embed third-party analytics');
  assertNot(/['"`]\.\.\/.*textures(\.full)?\//i.test(content), relative, 'new source must not reference original texture directories');
  assertNot(/['"`]\.\.\/.*geometries\//i.test(content), relative, 'new source must not reference original geometry directories');
  assertNot(/['"`]\.\.\/.*audio\//i.test(content), relative, 'new source must not reference original audio directory');
}

for (const file of walk(path.join(root, 'src/gameplay'))) {
  const content = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file).split(path.sep).join('/');
  assertNot(/from ['"]\.\.\/(ui|rendering|integrations|scenes)\//.test(content), relative, 'gameplay must stay independent from UI, rendering, integrations and scenes');
}

const manifestPath = path.join(root, 'assets/packs/default/manifest.json');
if (!fs.existsSync(manifestPath)) {
  failures.push('Missing default asset pack manifest.');
} else {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.commercialUse !== true) {
    failures.push('assets/packs/default/manifest.json: commercialUse must be true for the default placeholder pack');
  }
}

if (failures.length > 0) {
  console.error('Architecture validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Architecture validation passed.');

function assertNot(condition, file, message) {
  if (condition) failures.push(`${file}: ${message}`);
}

function walk(start) {
  if (!fs.existsSync(start)) return [];
  const entries = fs.readdirSync(start, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(start, entry.name);
    if (entry.isDirectory()) results.push(...walk(fullPath));
    else results.push(fullPath);
  }
  return results;
}
