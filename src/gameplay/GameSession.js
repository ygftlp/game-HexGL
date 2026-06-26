(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.GameSession = function GameSession(options) {
    options = options || {};
    this.mode = options.mode || 'timeattack';
    this.assetPack = options.assetPack || 'legacy';
    this.startedAt = null;
    this.endedAt = null;
    this.result = null;
  };

  ns.GameSession.prototype.start = function() {
    this.startedAt = Date.now();
    this.endedAt = null;
    this.result = null;
    return this;
  };

  ns.GameSession.prototype.finish = function(result) {
    this.endedAt = Date.now();
    this.result = result || {};
    return this.result;
  };
})(window);
