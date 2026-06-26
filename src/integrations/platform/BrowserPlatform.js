(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.BrowserPlatform = function BrowserPlatform(options) {
    options = options || {};
    this.name = 'browser';
    this.window = options.window || root;
    this.document = options.document || root.document;
  };

  ns.BrowserPlatform.prototype.init = function() {};

  ns.BrowserPlatform.prototype.getViewport = function() {
    return {
      width: this.window.innerWidth,
      height: this.window.innerHeight
    };
  };

  ns.BrowserPlatform.prototype.isTouch = function() {
    return !!('ontouchstart' in this.window || (this.window.navigator && this.window.navigator.maxTouchPoints > 0));
  };
})(window);
