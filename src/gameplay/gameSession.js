/* Gameplay session facade for score, run state, and future economy hooks. */
(function(global) {
  'use strict';

  var bkcore = global.bkcore = global.bkcore || {};
  var commercial = bkcore.commercial = bkcore.commercial || {};
  commercial.gameplay = commercial.gameplay || {};

  commercial.gameplay.createGameSession = function(options) {
    options = options || {};
    var state = {
      mode: options.mode || 'timeattack',
      startedAt: null,
      finishedAt: null,
      lastResult: null
    };

    return {
      state: state,
      start: function() {
        state.startedAt = Date.now();
        state.finishedAt = null;
      },
      finish: function(result) {
        state.finishedAt = Date.now();
        state.lastResult = result || {};
      },
      reset: function() {
        state.startedAt = null;
        state.finishedAt = null;
        state.lastResult = null;
      }
    };
  };
})(this);
