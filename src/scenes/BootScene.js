export class BootScene {
  constructor(context) {
    this.context = context;
  }

  async enter() {
    const { renderer, resources, config, bridge, events } = this.context;
    renderer.showMessage('Loading commercial-safe default asset pack...');
    const savedBest = await bridge.save.get('race.bestTime', null);
    if (savedBest != null) this.context.state.set('race.bestTime', savedBest);
    await resources.loadPack(config.defaultPack);
    events.emit('scene:change', { scene: 'menu' });
  }
}
