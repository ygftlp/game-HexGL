(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.NoopAds = function NoopAds() {
    this.name = 'noop-ads';
  };

  ns.NoopAds.prototype.init = function() {};

  ns.NoopAds.prototype.show = function(placement) {
    return Promise.resolve({
      placement: placement || 'unspecified',
      shown: false,
      reason: 'ads_disabled'
    });
  };
})(window);
