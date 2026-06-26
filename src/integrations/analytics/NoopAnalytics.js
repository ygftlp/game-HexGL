(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.NoopAnalytics = function NoopAnalytics() {
    this.name = 'noop-analytics';
    this.events = [];
  };

  ns.NoopAnalytics.prototype.init = function(context) {
    this.context = context || {};
  };

  ns.NoopAnalytics.prototype.track = function(eventName, payload) {
    this.events.push({ eventName: eventName, payload: payload || {}, at: Date.now() });
  };
})(window);
