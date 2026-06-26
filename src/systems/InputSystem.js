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
    this.actions = new Set();
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
    this.actions.add(action);
    this.events?.emit('input:down', { action });
  };

  #onKeyUp = (event) => {
    const action = KEY_MAP.get(event.code);
    if (!action) return;
    this.actions.delete(action);
    this.events?.emit('input:up', { action });
  };
}
