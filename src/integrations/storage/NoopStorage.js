(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.NoopStorage = function NoopStorage() {
    this.name = 'noop-storage';
  };

  ns.NoopStorage.prototype.init = function() {};

  ns.NoopStorage.prototype.load = function(key) {
    return Promise.resolve({ key: key, value: null, found: false });
  };

  ns.NoopStorage.prototype.save = function(key, value) {
    return Promise.resolve({ key: key, value: value, saved: false, reason: 'storage_disabled' });
  };
})(window);
