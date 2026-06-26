/* Commercial App composition root. */
(function(global) {
  'use strict';

  var bkcore = global.bkcore = global.bkcore || {};
  var commercial = bkcore.commercial = bkcore.commercial || {};

  commercial.App = function(options) {
    options = options || {};
    var integrations = commercial.integrations || {};
    var content = commercial.content || {};
    var systems = commercial.systems || {};
    var gameplay = commercial.gameplay || {};
    var rendering = commercial.rendering || {};
    var scenes = commercial.scenes || {};

    this.window = options.window || global;
    this.document = options.document || this.window.document;
    this.assetPack = options.assetPack || 'legacy';
    this.platform = integrations.createNoopPlatform ? integrations.createNoopPlatform(options) : { ready: function() { return true; } };
    this.ads = integrations.createNoopAds ? integrations.createNoopAds() : { provider: 'noop' };
    this.telemetry = integrations.createNoopTelemetry ? integrations.createNoopTelemetry() : { record: function() {} };
    this.storage = integrations.createNoopStorage ? integrations.createNoopStorage() : { get: function(_, fallbackValue) { return fallbackValue; }, set: function(_, value) { return value; } };
    this.packs = content.createPackRegistry ? content.createPackRegistry({ activePack: this.assetPack }) : { getActivePack: function() { return { id: 'legacy' }; } };
    this.lifecycle = systems.createLifecycle ? systems.createLifecycle() : { boot: function() {} };
    this.gameSession = gameplay.createGameSession ? gameplay.createGameSession({ mode: 'timeattack' }) : { start: function() {}, finish: function() {} };
    this.renderPipeline = rendering.createRenderPipeline ? rendering.createRenderPipeline() : { selectQuality: function(q) { return q; } };
    this.bootScene = scenes.createBootScene ? scenes.createBootScene({ telemetry: this.telemetry }) : { enter: function() {} };
  };

  commercial.App.prototype.boot = function() {
    if (this.telemetry.initialize) {
      this.telemetry.initialize();
    }
    if (this.lifecycle.boot) {
      this.lifecycle.boot({ pack: this.packs.getActivePack().id });
    }
    if (this.bootScene.enter) {
      this.bootScene.enter();
    }
    if (this.telemetry.record) {
      this.telemetry.record('app.boot', { pack: this.packs.getActivePack().id });
    }
    return this;
  };

  commercial.App.prototype.normalizeQuality = function(quality) {
    return this.renderPipeline.selectQuality ? this.renderPipeline.selectQuality(quality) : quality;
  };
})(this);
