(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  ns.EventBus = function EventBus() {
    this.listeners = {};
  };

  ns.EventBus.prototype.on = function(eventName, handler) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(handler);
    return function unsubscribe() {
      var list = this.listeners[eventName] || [];
      var index = list.indexOf(handler);
      if (index >= 0) list.splice(index, 1);
    }.bind(this);
  };

  ns.EventBus.prototype.emit = function(eventName, payload) {
    var list = this.listeners[eventName] || [];
    for (var i = 0; i < list.length; i++) {
      try {
        list[i](payload);
      } catch (err) {
        if (root.console && console.warn) console.warn('Event handler failed:', eventName, err);
      }
    }
  };
})(window);
