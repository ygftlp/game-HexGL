export class ResultScene {
  constructor(context) {
    this.context = context;
    this.data = null;
  }

  enter(data) {
    this.data = data;
    const { root, time, events } = this.context;
    const panel = root.querySelector('#game-panel');
    panel.innerHTML = `
      <h1>Race complete</h1>
      <p class="muted">The result scene is isolated from gameplay and monetization implementation details.</p>
      <div class="metric"><span>Last time</span><strong>${time.format(data.timeSeconds)}</strong></div>
      <div class="metric"><span>Best time</span><strong>${time.format(data.bestTime)}</strong></div>
      <button type="button" id="restart-race">Back to menu</button>
    `;
    root.querySelector('#hud-panel').innerHTML = `
      <h2>Commercial hooks</h2>
      <p class="muted">Post-race ad and analytics calls already route through no-op integrations.</p>
    `;
    panel.querySelector('#restart-race').addEventListener('click', () => {
      events.emit('app:restart');
    }, { once: true });
  }
}
