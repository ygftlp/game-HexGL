export class AudioSystem {
  constructor({ bridge }) {
    this.bridge = bridge;
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }

  play(eventName, payload = {}) {
    if (!this.enabled) return;
    this.bridge.analytics.track('audio_event', { eventName, ...payload });
  }

  stopAll() {
    // no-op placeholder for future WebAudio mixer integration
  }
}
