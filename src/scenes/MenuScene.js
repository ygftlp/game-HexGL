(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.MenuScene = function MenuScene(menuController) {
    this.name = 'menu';
    this.menuController = menuController || null;
  };

  ns.MenuScene.prototype.enter = function(payload, app) {
    app.eventBus.emit && app.eventBus.emit('scene:menu', payload);
    return payload;
  };
})(window);
