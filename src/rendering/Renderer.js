export class Renderer {
  constructor({ root }) {
    this.root = root;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1280;
    this.canvas.height = 720;
    this.ctx = this.canvas.getContext('2d');
  }

  showMessage(message) {
    const panel = this.root.querySelector('#game-panel');
    panel.innerHTML = `<h1>Boot</h1><p class="muted">${message}</p>`;
    this.root.querySelector('#hud-panel').innerHTML = `<h2>Runtime</h2><p class="muted">Waiting for scene transition...</p>`;
  }

  clear() {
    const panel = this.root.querySelector('#game-panel');
    if (!panel.contains(this.canvas)) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  prepareRace() {
    const panel = this.root.querySelector('#game-panel');
    panel.innerHTML = `<h1>Prototype race</h1>`;
    panel.appendChild(this.canvas);
  }

  renderRace({ car, progress }) {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#071725');
    gradient.addColorStop(1, '#020409');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(50, 211, 255, 0.32)';
    ctx.lineWidth = 4;
    for (let i = 0; i < 8; i += 1) {
      const y = height - ((i * 120 + car.distance * 0.9) % height);
      ctx.beginPath();
      ctx.moveTo(width * 0.18, y);
      ctx.lineTo(width * 0.82, y);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(width * 0.22, height);
    ctx.lineTo(width * 0.42, 0);
    ctx.moveTo(width * 0.78, height);
    ctx.lineTo(width * 0.58, 0);
    ctx.stroke();

    const carX = width / 2 + car.lane * width * 0.22;
    const carY = height * 0.72;
    ctx.fillStyle = '#32d3ff';
    ctx.beginPath();
    ctx.moveTo(carX, carY - 44);
    ctx.lineTo(carX - 34, carY + 42);
    ctx.lineTo(carX + 34, carY + 42);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillRect(width * 0.18, 28, width * 0.64, 10);
    ctx.fillStyle = '#32d3ff';
    ctx.fillRect(width * 0.18, 28, width * 0.64 * progress, 10);
  }

  destroy() {
    this.canvas.remove();
  }
}
