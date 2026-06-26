import { MainMenu } from '../ui/Menu.js';

export class MenuScene {
  constructor(context) {
    this.context = context;
    this.menu = new MainMenu(context);
  }

  enter() {
    this.menu.mount();
    this.context.renderer.clear();
  }

  exit() {
    this.menu.unmount();
  }
}
