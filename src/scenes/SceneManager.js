export class SceneManager {
  constructor({ events }) {
    this.events = events;
    this.scenes = new Map();
    this.current = null;
  }

  register(name, scene) {
    this.scenes.set(name, scene);
  }

  async change(name, data = {}) {
    const next = this.scenes.get(name);
    if (!next) throw new Error(`Unknown scene: ${name}`);
    if (this.current?.exit) await this.current.exit();
    this.current = next;
    if (this.current.enter) await this.current.enter(data);
    this.events?.emit('scene:entered', { name });
  }

  update(delta) {
    this.current?.update?.(delta);
  }

  render(delta) {
    this.current?.render?.(delta);
  }
}
