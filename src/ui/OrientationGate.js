export class OrientationGate {
  constructor({ root, events }) {
    this.root = root;
    this.events = events;
    this.overlay = null;
    this.unsubscribe = null;
  }

  mount() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'orientation-gate is-hidden';
    this.overlay.setAttribute('role', 'status');
    this.overlay.setAttribute('aria-live', 'polite');
    this.overlay.innerHTML = `
      <div class="orientation-card">
        <div class="phone-icon" aria-hidden="true">↻</div>
        <h1>请横屏游玩</h1>
        <p>该版本优先适配手机横屏竞速。旋转手机后会自动继续。</p>
      </div>
    `;
    document.body.appendChild(this.overlay);
    this.unsubscribe = this.events.on('orientation:change', (state) => this.update(state));
  }

  update(state) {
    if (!this.overlay) return;
    const shouldBlock = state.isMobileLike && state.orientation === 'portrait';
    this.overlay.classList.toggle('is-hidden', !shouldBlock);
    this.root.classList.toggle('is-orientation-blocked', shouldBlock);
  }

  unmount() {
    this.unsubscribe?.();
    this.overlay?.remove();
    this.overlay = null;
  }
}
