/*
 * Resource pack registry.
 * Legacy pack points at the existing repository resources; default pack is the clean target for replacement art/audio.
 */
(function(global) {
  'use strict';

  var bkcore = global.bkcore = global.bkcore || {};
  var commercial = bkcore.commercial = bkcore.commercial || {};
  commercial.content = commercial.content || {};

  var PACKS = {
    legacy: {
      id: 'legacy',
      root: '.',
      manifest: 'assets/packs/legacy/manifest.json',
      commercialStatus: 'restricted-review-required'
    },
    default: {
      id: 'default',
      root: 'assets/packs/default',
      manifest: 'assets/packs/default/manifest.json',
      commercialStatus: 'placeholder-safe-until-filled'
    }
  };

  commercial.content.createPackRegistry = function(options) {
    options = options || {};
    var activePackId = options.activePack || 'legacy';

    return {
      packs: PACKS,
      getActivePack: function() {
        return PACKS[activePackId] || PACKS.legacy;
      },
      setActivePack: function(id) {
        if (!PACKS[id]) {
          throw new Error('Unknown asset pack: ' + id);
        }
        activePackId = id;
        return PACKS[id];
      },
      resolve: function(path) {
        var pack = this.getActivePack();
        return pack.root === '.' ? path : pack.root + '/' + path;
      }
    };
  };
})(this);
