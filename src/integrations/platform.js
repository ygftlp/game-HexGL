/*
 * Commercial integration adapter: platform.
 * Default implementation is intentionally no-op / browser-only.
 */
(function(global) {
  'use strict';

  var bkcore = global.bkcore = global.bkcore || {};
  var commercial = bkcore.commercial = bkcore.commercial || {};
  commercial.integrations = commercial.integrations || {};

  commercial.integrations.createNoopPlatform = function(options) {
    options = options || {};
    var win = options.window || global;
    var doc = options.document || win.document;

    return {
      name: 'web-noop',
      capabilities: {
        webgl: true,
        touch: !!(doc && ('ontouchstart' in doc.documentElement)),
        payments: false,
        ads: false,
        analytics: false,
        cloudSave: false
      },
      ready: function() {
        return true;
      },
      getViewport: function() {
        return {
          width: win.innerWidth || 1024,
          height: win.innerHeight || 768
        };
      },
      openExternal: function(url) {
        if (win && url) {
          win.location.href = url;
        }
      }
    };
  };
})(this);
