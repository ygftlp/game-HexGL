import { AssetPack } from '../content/AssetPack.js';

export class ResourceSystem {
  constructor({ baseUrl, events }) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.events = events;
    this.loadedPacks = new Map();
  }

  async loadPack(packName) {
    if (this.loadedPacks.has(packName)) return this.loadedPacks.get(packName);
    const manifestUrl = `${this.baseUrl}/${packName}/manifest.json`;
    this.events?.emit('resources:loading', { packName, manifestUrl });
    const response = await fetch(manifestUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Unable to load asset pack manifest: ${manifestUrl}`);
    }
    const manifest = await response.json();
    const pack = new AssetPack(manifest);
    this.loadedPacks.set(packName, pack);
    this.events?.emit('resources:loaded', { packName, manifest });
    return pack;
  }

  getPack(packName) {
    return this.loadedPacks.get(packName) ?? null;
  }
}
