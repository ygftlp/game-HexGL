(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.BootScene = function BootScene() {
    this.name = 'boot';
  };

  ns.BootScene.prototype.enter = function(payload, app) {
    app.eventBus.emit && app.eventBus.emit('scene:boot', payload);
    return payload;
  };
})(window);
