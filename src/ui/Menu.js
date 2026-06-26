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
      <h1>手机横屏竞速原型</h1>
      <p class="muted">该分支现在按手机端横屏优先设计：竖屏会提示旋转，比赛内使用触控按钮。</p>
      <button type="button" id="start-race">开始横屏测试</button>
      <button type="button" class="secondary" id="open-legacy">打开旧版参考入口</button>
    `;
    hud.classList.remove('mobile-hud');
    hud.innerHTML = `
      <h2>移动端策略</h2>
      <div class="metric"><span>屏幕方向</span><strong>横屏优先</strong></div>
      <div class="metric"><span>输入方式</span><strong>触控按钮</strong></div>
      <div class="metric"><span>资源包</span><strong>${pack?.name ?? 'unknown'}</strong></div>
      <p class="muted">商业发布前仍需替换 legacy 素材与品牌元素。</p>
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
