export const effects = [];

export function spawnExplosion(x, y) {
  effects.push({
    x,
    y,
    frame: 0,
    maxFrames: 10,
    duration: 20,
  });
}