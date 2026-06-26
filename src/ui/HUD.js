export class HUD {
  constructor(context) {
    this.context = context;
    this.target = null;
  }

  mount() {
    this.target = this.context.root.querySelector('#hud-panel');
    this.target.classList.add('mobile-hud');
    this.target.innerHTML = `
      <div class="hud-row">
        <div class="metric"><span>速度</span><strong id="hud-speed">0</strong></div>
        <div class="metric"><span>进度</span><strong id="hud-progress">0%</strong></div>
        <div class="metric"><span>时间</span><strong id="hud-time">0:00.00</strong></div>
      </div>
      <p class="muted mobile-help">手机横屏：左侧控制方向，右侧加速 / 刹车 / 氮气。</p>
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
      best.innerHTML = `<span>最佳</span><strong id="hud-best">${this.context.time.format(bestTime)}</strong>`;
      this.target.querySelector('.hud-row').appendChild(best);
    }
  }

  unmount() {
    this.target?.classList.remove('mobile-hud');
    this.target = null;
  }
}
