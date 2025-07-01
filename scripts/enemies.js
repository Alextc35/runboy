import { spawnExplosion } from './effects.js';

export const enemies = [];

export function spawnEnemy(enemiesArray, canvas) {
  enemiesArray.push({
    x: canvas.width,
    y: canvas.height - 128,
    width: 64,
    height: 64,
    speed: 6,
  });
}

export function updateEnemies(ctx, enemies, img, player, scale, coinSound, onKill) {
  enemies.forEach((enemy, i) => {
    enemy.x -= enemy.speed;
    ctx.drawImage(img, enemy.x, enemy.y, enemy.width, enemy.height);

    const ax1 = player.x;
    const ay1 = player.y - 64;
    const ax2 = ax1 + player.width * scale;
    const ay2 = ay1 + player.height * scale;

    const bx1 = enemy.x;
    const by1 = enemy.y;
    const bx2 = bx1 + enemy.width;
    const by2 = by1 + enemy.height;

    const hit = (
      ax1 < bx2 && ax2 > bx1 &&
      ay1 < by2 && ay2 > by1
    );

    if (hit) {
      coinSound.play();
      onKill();
      spawnExplosion(enemy.x + enemy.width / 2, enemy.y);
      enemies.splice(i, 1);
    }
  });
}