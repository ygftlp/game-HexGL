/*
 * Commercialization architecture shell for HexGL.
 * Keeps integrations injectable and no-op by default.
 */
(function(root) {
  'use strict';

  var ns = root.HexGLCommercial = root.HexGLCommercial || {};

  function defaults(value, fallback) {
    return value === undefined || value === null ? fallback : value;
  }

  function createNoop(name) {
    return {
      name: name,
      init: function() {},
      track: function() {},
      show: function() { return Promise.resolve({ shown: false, reason: 'noop' }); },
      load: function() { return Promise.resolve(null); },
      save: function() { return Promise.resolve(false); }
    };
  }

  ns.createNoopIntegration = createNoop;

  ns.App = function App(options) {
    options = options || {};
    this.document = defaults(options.document, root.document);
    this.platform = defaults(options.platform, createNoop('platform'));
    this.ads = defaults(options.ads, createNoop('ads'));
    this.analytics = defaults(options.analytics, createNoop('analytics'));
    this.storage = defaults(options.storage, createNoop('storage'));
    this.assetPack = defaults(options.assetPack, 'legacy');
    this.eventBus = defaults(options.eventBus, ns.EventBus ? new ns.EventBus() : createNoop('events'));
    this.scenes = [];
    this.state = {
      booted: false,
      startedAt: null,
      commercialMode: false
    };
  };

  ns.App.prototype.use = function(scene) {
    if (scene) this.scenes.push(scene);
    return this;
  };

  ns.App.prototype.boot = function() {
    this.state.booted = true;
    this.state.startedAt = Date.now();
    this.analytics.init({ app: 'HexGL', assetPack: this.assetPack });
    this.ads.init({ app: 'HexGL' });
    this.platform.init({ app: 'HexGL' });
    this.eventBus.emit && this.eventBus.emit('app:boot', this.state);
    this.analytics.track('app_boot', { assetPack: this.assetPack });
    return this;
  };

  ns.App.prototype.startScene = function(name, payload) {
    for (var i = 0; i < this.scenes.length; i++) {
      if (this.scenes[i].name === name && typeof this.scenes[i].enter === 'function') {
        this.analytics.track('scene_enter', { scene: name });
        return this.scenes[i].enter(payload || {}, this);
      }
    }
    return null;
  };
})(window);
