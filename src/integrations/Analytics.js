export function createNoopAnalytics() {
  return Object.freeze({
    enabled: false,
    track(eventName, payload = {}) {
      console.info('[Analytics:no-op]', eventName, payload);
    },
  });
}
