export class EventBus {
  #listeners = new Map();

  on(eventName, handler) {
    if (!this.#listeners.has(eventName)) {
      this.#listeners.set(eventName, new Set());
    }
    this.#listeners.get(eventName).add(handler);
    return () => this.off(eventName, handler);
  }

  off(eventName, handler) {
    const listeners = this.#listeners.get(eventName);
    if (!listeners) return;
    listeners.delete(handler);
    if (listeners.size === 0) this.#listeners.delete(eventName);
  }

  emit(eventName, payload = {}) {
    const listeners = this.#listeners.get(eventName);
    if (!listeners) return;
    for (const handler of listeners) {
      handler(payload);
    }
  }

  clear() {
    this.#listeners.clear();
  }
}
