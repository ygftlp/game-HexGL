(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.SaveSystem = function SaveSystem(storage) {
    this.storage = storage || ns.createNoopIntegration('storage');
  };

  ns.SaveSystem.prototype.loadBestTime = function(trackName) {
    return this.storage.load('bestTime:' + (trackName || 'Cityscape'));
  };

  ns.SaveSystem.prototype.saveBestTime = function(trackName, timeMs) {
    return this.storage.save('bestTime:' + (trackName || 'Cityscape'), {
      timeMs: timeMs,
      updatedAt: new Date().toISOString()
    });
  };
})(window);
