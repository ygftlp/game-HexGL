/*
 * Local telemetry facade.
 * Default no-op stores only an in-memory queue for development diagnostics.
 */
(function(global) {
  'use strict';

  var bkcore = global.bkcore = global.bkcore || {};
  var commercial = bkcore.commercial = bkcore.commercial || {};
  commercial.integrations = commercial.integrations || {};

  commercial.integrations.createNoopTelemetry = function() {
    var queue = [];

    return {
      provider: 'noop',
      queue: queue,
      initialize: function() {
        return true;
      },
      record: function(name, payload) {
        queue.push({ name: name, payload: payload || {}, at: Date.now() });
        return true;
      },
      flush: function() {
        return queue.slice();
      }
    };
  };
})(this);
