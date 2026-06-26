export class MainMenu {
  constructor(context) {
    this.context = context;
  }

  mount() {
    const { root, events, resources, config } = this.context;
    const pack = resources.getPack(config.defaultPack);
    const panel = root.querySelector('#game-panel');
    const hud = root.querySelector('#hud-panel');
    panel.innerHTML = `
      <h1>Ready to race</h1>
      <p class="muted">This is a commercial-safe skeleton entry. Replace prototype rendering and content with owned assets before release.</p>
      <button type="button" id="start-race">Start prototype race</button>
      <button type="button" class="secondary" id="open-legacy">Open legacy runtime</button>
    `;
    hud.innerHTML = `
      <h2>Asset pack</h2>
      <div class="metric"><span>Active pack</span><strong>${pack?.name ?? 'unknown'}</strong></div>
      <div class="metric"><span>Commercial use</span><strong>${pack?.commercialUse ? 'Allowed' : 'Blocked'}</strong></div>
      <p class="muted">Legacy assets are isolated in a quarantined pack and must not be referenced by new src modules.</p>
    `;
    panel.querySelector('#start-race').addEventListener('click', () => {
      events.emit('scene:change', { scene: 'race' });
    });
    panel.querySelector('#open-legacy').addEventListener('click', () => {
      window.location.href = './legacy-index.html';
    });
  }

  unmount() {
    // The next scene owns panel replacement.
  }
}
