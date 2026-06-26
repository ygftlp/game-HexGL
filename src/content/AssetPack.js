export class AssetPack {
  constructor(manifest) {
    this.manifest = manifest;
    this.name = manifest.name;
    this.license = manifest.license;
    this.commercialUse = manifest.commercialUse;
    this.assets = manifest.assets ?? {};
  }

  list(type) {
    return Object.entries(this.assets[type] ?? {}).map(([id, asset]) => ({ id, ...asset }));
  }

  get(type, id) {
    return this.assets[type]?.[id] ?? null;
  }

  assertCommercialReady() {
    if (!this.commercialUse) {
      throw new Error(`Asset pack "${this.name}" is not approved for commercial use.`);
    }
  }
}
