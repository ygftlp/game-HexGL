const KEY_MAP = new Map([
  ['ArrowLeft', 'left'],
  ['KeyA', 'left'],
  ['ArrowRight', 'right'],
  ['KeyD', 'right'],
  ['ArrowUp', 'accelerate'],
  ['KeyW', 'accelerate'],
  ['ArrowDown', 'brake'],
  ['KeyS', 'brake'],
  ['Space', 'boost'],
  ['Escape', 'pause'],
]);

export class InputSystem {
  constructor({ events }) {
    this.events = events;
    this.actions = new Map();
    this.target = null;
  }

  attach(target) {
    this.target = target;
    target.addEventListener('keydown', this.#onKeyDown);
    target.addEventListener('keyup', this.#onKeyUp);
  }

  detach() {
    if (!this.target) return;
    this.target.removeEventListener('keydown', this.#onKeyDown);
    this.target.removeEventListener('keyup', this.#onKeyUp);
    this.target = null;
    this.clearSource('keyboard');
  }

  setAction(action, pressed, source = 'programmatic') {
    if (!this.actions.has(action)) this.actions.set(action, new Set());
    const sources = this.actions.get(action);
    if (pressed) sources.add(source);
    else sources.delete(source);
    if (sources.size === 0) this.actions.delete(action);
    this.events?.emit(pressed ? 'input:down' : 'input:up', { action, source });
  }

  clearSource(source) {
    for (const [action, sources] of this.actions.entries()) {
      sources.delete(source);
      if (sources.size === 0) this.actions.delete(action);
    }
  }

  isDown(action) {
    return this.actions.has(action);
  }

  snapshot() {
    return Object.freeze({
      left: this.isDown('left'),
      right: this.isDown('right'),
      accelerate: this.isDown('accelerate'),
      brake: this.isDown('brake'),
      boost: this.isDown('boost'),
      pause: this.isDown('pause'),
    });
  }

  #onKeyDown = (event) => {
    const action = KEY_MAP.get(event.code);
    if (!action) return;
    this.setAction(action, true, 'keyboard');
  };

  #onKeyUp = (event) => {
    const action = KEY_MAP.get(event.code);
    if (!action) return;
    this.setAction(action, false, 'keyboard');
  };
}
