/* Rendering facade reserved for renderer/post-processing choices. */
(function(global) {
  'use strict';

  var bkcore = global.bkcore = global.bkcore || {};
  var commercial = bkcore.commercial = bkcore.commercial || {};
  commercial.rendering = commercial.rendering || {};

  commercial.rendering.createRenderPipeline = function() {
    return {
      name: 'legacy-threejs-pipeline',
      selectQuality: function(requestedQuality) {
        var value = parseInt(requestedQuality, 10);
        if (isNaN(value)) {
          value = 3;
        }
        return Math.max(0, Math.min(3, value));
      },
      beforeFrame: function() {},
      afterFrame: function() {}
    };
  };
})(this);
