import { App } from './core/App.js';
import { createDefaultAppBridge } from './integrations/AppBridge.js';
import { defaultConfig } from './core/Config.js';

const root = document.getElementById('app');
const app = new App({
  root,
  config: defaultConfig,
  bridge: createDefaultAppBridge(),
});

app.boot().catch((error) => {
  console.error('[App] Fatal boot error', error);
  root.innerHTML = `<main class="app-shell"><section class="panel"><h1>Boot failed</h1><p>${error.message}</p></section></main>`;
});
