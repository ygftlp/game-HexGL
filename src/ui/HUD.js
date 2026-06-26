export class HUD {
  constructor(context) {
    this.context = context;
    this.target = null;
  }

  mount() {
    this.target = this.context.root.querySelector('#hud-panel');
    this.target.innerHTML = `
      <h2>HUD</h2>
      <div class="metric"><span>Speed</span><strong id="hud-speed">0</strong></div>
      <div class="metric"><span>Progress</span><strong id="hud-progress">0%</strong></div>
      <div class="metric"><span>Elapsed</span><strong id="hud-time">0:00.00</strong></div>
      <p class="muted">Controls: Arrow/WASD to steer and accelerate, Space to boost.</p>
    `;
  }

  update({ speed, progress, elapsed, bestTime }) {
    if (!this.target) return;
    this.target.querySelector('#hud-speed').textContent = Math.round(speed).toString();
    this.target.querySelector('#hud-progress').textContent = `${Math.round(progress * 100)}%`;
    this.target.querySelector('#hud-time').textContent = this.context.time.format(elapsed);
    if (bestTime != null && !this.target.querySelector('#hud-best')) {
      const best = document.createElement('div');
      best.className = 'metric';
      best.innerHTML = `<span>Best</span><strong id="hud-best">${this.context.time.format(bestTime)}</strong>`;
      this.target.appendChild(best);
    }
  }

  unmount() {
    this.target = null;
  }
}
