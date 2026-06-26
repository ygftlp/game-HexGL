export class StateManager {
  #state;

  constructor(initialState = {}) {
    this.#state = structuredClone(initialState);
  }

  get snapshot() {
    return structuredClone(this.#state);
  }

  get(path, fallback = undefined) {
    return path.split('.').reduce((value, key) => {
      if (value == null || typeof value !== 'object') return fallback;
      return key in value ? value[key] : fallback;
    }, this.#state);
  }

  set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let target = this.#state;
    for (const key of keys) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      target = target[key];
    }
    target[lastKey] = value;
  }
}
