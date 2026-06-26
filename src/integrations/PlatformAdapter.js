export function createWebPlatformAdapter() {
  return Object.freeze({
    id: 'web',
    name: 'Web Browser',
    canShare: false,
    canVibrate: 'vibrate' in navigator,
    getSafeAreaInsets() {
      return { top: 0, right: 0, bottom: 0, left: 0 };
    },
  });
}
