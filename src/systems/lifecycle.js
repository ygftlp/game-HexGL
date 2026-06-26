/* Lifecycle system for boot, pause, resume, and shutdown hooks. */
(function(global) {
  'use strict';

  var bkcore = global.bkcore = global.bkcore || {};
  var commercial = bkcore.commercial = bkcore.commercial || {};
  commercial.systems = commercial.systems || {};

  commercial.systems.createLifecycle = function() {
    var hooks = { boot: [], pause: [], resume: [], shutdown: [] };

    function run(name, payload) {
      var list = hooks[name] || [];
      for (var i = 0; i < list.length; i++) {
        list[i](payload || {});
      }
    }

    return {
      on: function(name, handler) {
        if (!hooks[name]) {
          hooks[name] = [];
        }
        hooks[name].push(handler);
      },
      boot: function(payload) { run('boot', payload); },
      pause: function(payload) { run('pause', payload); },
      resume: function(payload) { run('resume', payload); },
      shutdown: function(payload) { run('shutdown', payload); }
    };
  };
})(this);
