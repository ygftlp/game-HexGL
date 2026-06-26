/*
 * Commercial integration adapter: ads.
 * Production SDKs should be added only after platform, privacy, and age-rating review.
 */
(function(global) {
  'use strict';

  var bkcore = global.bkcore = global.bkcore || {};
  var commercial = bkcore.commercial = bkcore.commercial || {};
  commercial.integrations = commercial.integrations || {};

  commercial.integrations.createNoopAds = function() {
    return {
      provider: 'noop',
      initialize: function() {
        return true;
      },
      preload: function() {
        return false;
      },
      showInterstitial: function() {
        return false;
      },
      showRewarded: function(callback) {
        if (typeof callback === 'function') {
          callback({ completed: false, provider: 'noop' });
        }
        return false;
      }
    };
  };
})(this);
