export function createLocalSaveService(namespace) {
  const prefix = `${namespace}:`;
  return Object.freeze({
    async get(key, fallback = null) {
      try {
        const raw = window.localStorage.getItem(prefix + key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (error) {
        console.warn('[Save:local] read failed', error);
        return fallback;
      }
    },
    async set(key, value) {
      try {
        window.localStorage.setItem(prefix + key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.warn('[Save:local] write failed', error);
        return false;
      }
    },
    async remove(key) {
      window.localStorage.removeItem(prefix + key);
    },
  });
}
