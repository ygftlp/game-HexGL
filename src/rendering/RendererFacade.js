(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.RendererFacade = function RendererFacade(options) {
    options = options || {};
    this.quality = options.quality || 'high';
    this.renderer = options.renderer || null;
  };

  ns.RendererFacade.prototype.attachLegacyRenderer = function(renderer) {
    this.renderer = renderer;
    return this;
  };

  ns.RendererFacade.prototype.resize = function(width, height) {
    if (this.renderer && typeof this.renderer.setSize === 'function') {
      this.renderer.setSize(width, height);
    }
  };
})(window);
