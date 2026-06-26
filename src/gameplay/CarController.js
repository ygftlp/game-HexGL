export class CarController {
  constructor({ vehicle }) {
    this.vehicle = vehicle;
    this.speed = 0;
    this.distance = 0;
    this.lane = 0;
  }

  update(input, delta) {
    const acceleration = input.accelerate ? this.vehicle.acceleration : -18;
    const braking = input.brake ? -42 : 0;
    const boost = input.boost ? 22 : 0;
    this.speed += (acceleration + braking + boost) * delta;
    this.speed = clamp(this.speed, 0, this.vehicle.maxSpeed);

    const steering = Number(input.right) - Number(input.left);
    this.lane = clamp(this.lane + steering * this.vehicle.handling * delta, -1, 1);
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
