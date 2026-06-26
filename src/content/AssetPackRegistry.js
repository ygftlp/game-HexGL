(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.AssetPackRegistry = function AssetPackRegistry() {
    this.packs = {};
  };

  ns.AssetPackRegistry.prototype.register = function(pack) {
    if (!pack || !pack.id) throw new Error('Asset pack requires an id.');
    this.packs[pack.id] = pack;
    return pack;
  };

  ns.AssetPackRegistry.prototype.get = function(id) {
    return this.packs[id] || null;
  };

  ns.assetPacks = new ns.AssetPackRegistry();

  ns.assetPacks.register({
    id: 'legacy',
    label: 'Legacy HexGL assets',
    manifest: 'assets/packs/legacy/pack.json',
    commercialUse: 'blocked_until_relicensed_or_replaced'
  });

  ns.assetPacks.register({
    id: 'default',
    label: 'Default commercial-safe pack placeholder',
    manifest: 'assets/packs/default/pack.json',
    commercialUse: 'ready_after_original_assets_are_added'
  });
})(window);
