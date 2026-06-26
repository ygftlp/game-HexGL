export function createNoopAdsProvider() {
  return Object.freeze({
    enabled: false,
    async showInterstitial(context = {}) {
      console.info('[Ads:no-op] interstitial skipped', context);
      return { shown: false, reason: 'noop-provider' };
    },
    async showRewarded(context = {}) {
      console.info('[Ads:no-op] rewarded skipped', context);
      return { rewarded: false, reason: 'noop-provider' };
    },
  });
}
