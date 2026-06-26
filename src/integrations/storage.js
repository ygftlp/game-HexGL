/*
 * Commercial integration adapter: save data.
 * Default implementation keeps runtime-only values.
 */
(function(global) {
  'use strict';

  var bkcore = global.bkcore = global.bkcore || {};
  var commercial = bkcore.commercial = bkcore.commercial || {};
  commercial.integrations = commercial.integrations || {};

  commercial.integrations.createNoopStorage = function() {
    var state = {};

    return {
      provider: 'memory-noop',
      get: function(key, fallbackValue) {
        return Object.prototype.hasOwnProperty.call(state, key) ? state[key] : fallbackValue;
      },
      set: function(key, value) {
        state[key] = value;
        return value;
      },
      remove: function(key) {
        delete state[key];
      },
      clear: function() {
        state = {};
      }
    };
  };
})(this);
