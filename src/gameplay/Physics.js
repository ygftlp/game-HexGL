export class Physics {
  integrate(car, delta) {
    car.distance += car.speed * delta;
  }
}
