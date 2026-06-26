import { EventBus } from './EventBus.js';
import { GameLoop } from './GameLoop.js';
import { StateManager } from './StateManager.js';
import { ResourceSystem } from '../systems/ResourceSystem.js';
import { InputSystem } from '../systems/InputSystem.js';
import { AudioSystem } from '../systems/AudioSystem.js';
import { TimeSystem } from '../systems/TimeSystem.js';
import { SceneManager } from '../scenes/SceneManager.js';
import { BootScene } from '../scenes/BootScene.js';
import { MenuScene } from '../scenes/MenuScene.js';
import { RaceScene } from '../scenes/RaceScene.js';
import { ResultScene } from '../scenes/ResultScene.js';
import { Renderer } from '../rendering/Renderer.js';
import { createContentCatalog } from '../content/ContentCatalog.js';

export class App {
  constructor({ root, config, bridge }) {
    if (!root) throw new Error('App root element is required.');
    this.root = root;
    this.config = config;
    this.bridge = bridge;
    this.events = new EventBus();
    this.state = new StateManager({
      race: { bestTime: null, lastTime: null, status: 'idle' },
      monetization: { adsEnabled: false },
    });
    this.content = createContentCatalog();
    this.resources = new ResourceSystem({ baseUrl: './assets/packs', events: this.events });
    this.input = new InputSystem({ events: this.events });
    this.audio = new AudioSystem({ bridge: this.bridge });
    this.time = new TimeSystem();
    this.renderer = new Renderer({ root: this.root });
    this.scenes = new SceneManager({ events: this.events });
    this.loop = new GameLoop({
      maxDeltaSeconds: this.config.maxDeltaSeconds,
      update: (delta) => this.scenes.update(delta),
      render: (delta) => this.scenes.render(delta),
    });
  }

  async boot() {
    this.#renderShell();
    this.input.attach(window);
    this.scenes.register('boot', new BootScene(this.#context()));
    this.scenes.register('menu', new MenuScene(this.#context()));
    this.scenes.register('race', new RaceScene(this.#context()));
    this.scenes.register('result', new ResultScene(this.#context()));

    this.events.on('scene:change', ({ scene, data }) => this.scenes.change(scene, data));
    this.events.on('race:finished', (payload) => this.#handleRaceFinished(payload));
    this.events.on('app:restart', () => this.events.emit('scene:change', { scene: 'menu' }));

    await this.scenes.change('boot');
    this.loop.start();
  }

  destroy() {
    this.loop.stop();
    this.input.detach();
    this.renderer.destroy();
    this.events.clear();
  }

  #context() {
    return {
      config: this.config,
      bridge: this.bridge,
      events: this.events,
      state: this.state,
      content: this.content,
      resources: this.resources,
      input: this.input,
      audio: this.audio,
      time: this.time,
      renderer: this.renderer,
      root: this.root,
    };
  }

  #renderShell() {
    this.root.innerHTML = `
      <header class="app-shell">
        <div class="topbar">
          <div>
            <div class="brand">Commercial Racing Skeleton</div>
            <div class="muted">Modular app shell: core / content / gameplay / rendering / ui / integrations / systems / scenes</div>
          </div>
          <div class="risk-badge">Legacy assets isolated: not commercial-ready</div>
        </div>
      </header>
      <main class="app-shell layout">
        <section class="panel stack" id="game-panel"></section>
        <aside class="panel stack" id="hud-panel"></aside>
      </main>
      <footer class="app-shell footer">
        This branch is a runnable skeleton. Original HexGL runtime is preserved at legacy-index.html for comparison only.
      </footer>
    `;
  }

  async #handleRaceFinished({ timeSeconds }) {
    const previousBest = this.state.get('race.bestTime');
    const nextBest = previousBest == null ? timeSeconds : Math.min(previousBest, timeSeconds);
    this.state.set('race.lastTime', timeSeconds);
    this.state.set('race.bestTime', nextBest);
    await this.bridge.save.set('race.bestTime', nextBest);
    this.bridge.analytics.track('race_finished', { timeSeconds, nextBest });
    this.bridge.ads.showInterstitial({ placement: 'post_race' });
    this.events.emit('scene:change', { scene: 'result', data: { timeSeconds, bestTime: nextBest } });
  }
}
