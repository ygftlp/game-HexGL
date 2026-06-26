/* Scene facade for boot/menu/game transitions. */
(function(global) {
  'use strict';

  var bkcore = global.bkcore = global.bkcore || {};
  var commercial = bkcore.commercial = bkcore.commercial || {};
  commercial.scenes = commercial.scenes || {};

  commercial.scenes.createBootScene = function(options) {
    options = options || {};
    return {
      name: 'boot',
      enter: function() {
        if (options.telemetry && options.telemetry.record) {
          options.telemetry.record('scene.enter', { scene: 'boot' });
        }
      },
      leave: function() {}
    };
  };
})(this);
