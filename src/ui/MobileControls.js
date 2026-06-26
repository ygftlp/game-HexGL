const CONTROLS = [
  { action: 'left', label: '左' },
  { action: 'right', label: '右' },
  { action: 'brake', label: '刹车' },
  { action: 'accelerate', label: '加速' },
  { action: 'boost', label: '氮气' },
];

export class MobileControls {
  constructor(context) {
    this.context = context;
    this.container = null;
    this.handlers = [];
  }

  mount() {
    this.container = document.createElement('div');
    this.container.className = 'mobile-controls';
    this.container.setAttribute('aria-label', 'Mobile race controls');
    this.container.innerHTML = `
      <div class="control-cluster steering-controls">
        ${this.#button('left', '◀', '向左')}
        ${this.#button('right', '▶', '向右')}
      </div>
      <div class="control-cluster action-controls">
        ${this.#button('brake', '刹', '刹车')}
        ${this.#button('accelerate', '速', '加速')}
        ${this.#button('boost', '氮', '氮气')}
      </div>
    `;
    document.body.appendChild(this.container);

    for (const control of CONTROLS) {
      const button = this.container.querySelector(`[data-action="${control.action}"]`);
      this.#bind(button, control.action);
    }
  }

  unmount() {
    for (const [target, type, handler] of this.handlers) {
      target.removeEventListener(type, handler);
    }
    this.handlers = [];
    this.container?.remove();
    this.container = null;
    for (const control of CONTROLS) {
      this.context.input.setAction(control.action, false, 'touch');
    }
  }

  #button(action, text, label) {
    return `<button type="button" class="mobile-control" data-action="${action}" aria-label="${label}">${text}</button>`;
  }

  #bind(button, action) {
    const press = (event) => {
      event.preventDefault();
      button.classList.add('is-active');
      this.context.input.setAction(action, true, 'touch');
    };
    const release = (event) => {
      event.preventDefault();
      button.classList.remove('is-active');
      this.context.input.setAction(action, false, 'touch');
    };
    for (const type of ['pointerdown']) this.#listen(button, type, press);
    for (const type of ['pointerup', 'pointercancel', 'pointerleave']) this.#listen(button, type, release);
  }

  #listen(target, type, handler) {
    target.addEventListener(type, handler, { passive: false });
    this.handlers.push([target, type, handler]);
  }
}
