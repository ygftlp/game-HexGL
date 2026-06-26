export const defaultConfig = Object.freeze({
  appName: 'Commercial Racing Skeleton',
  version: '0.1.0',
  environment: 'development',
  defaultPack: 'default',
  legacyPack: 'legacy',
  fixedTimeStep: 1 / 60,
  maxDeltaSeconds: 0.08,
  featureFlags: Object.freeze({
    ads: false,
    analytics: false,
    cloudSave: false,
    legacyRuntime: false,
  }),
});
