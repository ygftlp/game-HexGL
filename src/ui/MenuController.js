(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.MenuController = function MenuController(options) {
    options = options || {};
    this.document = options.document || root.document;
    this.analytics = options.analytics || ns.createNoopIntegration('analytics');
  };

  ns.MenuController.prototype.trackSelection = function(name, value) {
    this.analytics.track('menu_selection', { name: name, value: value });
  };
})(window);
