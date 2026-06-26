(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.RaceScene = function RaceScene(options) {
    options = options || {};
    this.name = 'race';
    this.session = options.session || new ns.GameSession();
  };

  ns.RaceScene.prototype.enter = function(payload, app) {
    this.session.start();
    app.eventBus.emit && app.eventBus.emit('scene:race', payload);
    return this.session;
  };
})(window);
