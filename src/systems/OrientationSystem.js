export class OrientationSystem {
  constructor({ events, target = window }) {
    this.events = events;
    this.target = target;
    this.state = this.#readState();
  }

  attach() {
    this.target.addEventListener('resize', this.#onChange, { passive: true });
    this.target.addEventListener('orientationchange', this.#onChange, { passive: true });
    this.#emit();
  }

  detach() {
    this.target.removeEventListener('resize', this.#onChange);
    this.target.removeEventListener('orientationchange', this.#onChange);
  }

  isLandscapeReady() {
    return !this.state.isMobileLike || this.state.orientation === 'landscape';
  }

  #onChange = () => {
    this.state = this.#readState();
    this.#emit();
  };

  #emit() {
    this.events?.emit('orientation:change', this.state);
  }

  #readState() {
    const width = this.target.innerWidth || 0;
    const height = this.target.innerHeight || 0;
    const pointerCoarse = this.target.matchMedia?.('(pointer: coarse)').matches ?? false;
    const isMobileLike = pointerCoarse || Math.min(width, height) <= 820;
    return Object.freeze({
      width,
      height,
      orientation: width >= height ? 'landscape' : 'portrait',
      isMobileLike,
      isLandscapeReady: !isMobileLike || width >= height,
    });
  }
}
