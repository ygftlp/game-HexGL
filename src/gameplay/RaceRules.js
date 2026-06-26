export class RaceRules {
  constructor({ targetDistance }) {
    this.targetDistance = targetDistance;
    this.reset();
  }

  reset() {
    this.elapsed = 0;
    this.progress = 0;
    this.finished = false;
  }

  update({ distance, delta }) {
    if (this.finished) {
      return this.#snapshot();
    }
    this.elapsed += delta;
    this.progress = Math.min(1, distance / this.targetDistance);
    this.finished = this.progress >= 1;
    return this.#snapshot();
  }

  #snapshot() {
    return {
      elapsed: this.elapsed,
      progress: this.progress,
      finished: this.finished,
    };
  }
}
