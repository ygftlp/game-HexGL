export function createContentCatalog() {
  return Object.freeze({
    tracks: [
      {
        id: 'prototype-loop',
        name: 'Prototype Loop',
        pack: 'default',
        laps: 1,
        targetSeconds: 45,
      },
    ],
    vehicles: [
      {
        id: 'starter-ship',
        name: 'Starter Ship',
        pack: 'default',
        acceleration: 28,
        maxSpeed: 160,
        handling: 0.82,
      },
    ],
  });
}
