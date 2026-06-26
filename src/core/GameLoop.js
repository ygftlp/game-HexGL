export class GameLoop {
  constructor({ update, render, maxDeltaSeconds = 0.08 }) {
    this.update = update;
    this.render = render;
    this.maxDeltaSeconds = maxDeltaSeconds;
    this.running = false;
    this.lastTime = 0;
    this.frameHandle = 0;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.frameHandle = requestAnimationFrame(this.#tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.frameHandle);
  }

  #tick = (time) => {
    if (!this.running) return;
    const rawDelta = (time - this.lastTime) / 1000;
    const delta = Math.min(rawDelta, this.maxDeltaSeconds);
    this.lastTime = time;
    this.update(delta);
    this.render(delta);
    this.frameHandle = requestAnimationFrame(this.#tick);
  };
}
