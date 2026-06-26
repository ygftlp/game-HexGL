import { createNoopAdsProvider } from './AdsProvider.js';
import { createNoopAnalytics } from './Analytics.js';
import { createLocalSaveService } from './SaveService.js';
import { createWebPlatformAdapter } from './PlatformAdapter.js';

export function createDefaultAppBridge() {
  return Object.freeze({
    platform: createWebPlatformAdapter(),
    ads: createNoopAdsProvider(),
    analytics: createNoopAnalytics(),
    save: createLocalSaveService('commercial-racing-skeleton'),
  });
}
