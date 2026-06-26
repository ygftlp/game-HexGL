import { CarController } from '../gameplay/CarController.js';
import { Physics } from '../gameplay/Physics.js';
import { RaceRules } from '../gameplay/RaceRules.js';
import { HUD } from '../ui/HUD.js';
import { MobileControls } from '../ui/MobileControls.js';

export class RaceScene {
  constructor(context) {
    this.context = context;
    this.physics = new Physics();
    this.rules = new RaceRules({ targetDistance: 1600 });
    this.car = null;
    this.hud = new HUD(context);
    this.mobileControls = new MobileControls(context);
  }

  enter() {
    const vehicle = this.context.content.vehicles[0];
    this.car = new CarController({ vehicle });
    this.rules.reset();
    this.context.renderer.prepareRace();
    this.hud.mount();
    this.mobileControls.mount();
    this.context.bridge.analytics.track('race_started', { track: 'prototype-loop', input: 'touch-first' });
  }

  exit() {
    this.mobileControls.unmount();
    this.hud.unmount();
  }

  update(delta) {
    if (!this.context.orientation.isLandscapeReady()) return;
    const input = this.context.input.snapshot();
    this.car.update(input, delta);
    this.physics.integrate(this.car, delta);
    const raceState = this.rules.update({ distance: this.car.distance, delta });
    this.hud.update({
      speed: this.car.speed,
      distance: this.car.distance,
      elapsed: raceState.elapsed,
      progress: raceState.progress,
      bestTime: this.context.state.get('race.bestTime'),
    });
    if (raceState.finished) {
      this.context.events.emit('race:finished', { timeSeconds: raceState.elapsed });
    }
  }

  render() {
    if (!this.car) return;
    this.context.renderer.renderRace({
      car: this.car,
      progress: this.rules.progress,
    });
  }
}
