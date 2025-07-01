export const items = [];

export function spawnItem(itemsArray, canvas) {
  itemsArray.push({
    x: canvas.width,
    y: canvas.height - 256,
    width: 32,
    height: 32,
    speed: 8,
  });
}

export function checkCollision(a, b, scale) {
  const ax1 = a.x;
  const ay1 = a.y - 64;
  const ax2 = ax1 + a.width * scale;
  const ay2 = ay1 + a.height * scale;

  const bx1 = b.x;
  const by1 = b.y;
  const bx2 = bx1 + b.width;
  const by2 = by1 + b.height;

  return (
    ax1 < bx2 && ax2 > bx1 &&
    ay1 < by2 && ay2 > by1
  );
}

export function updateItems(ctx, items, img, player, scale, coinSound, scoreEl, onCollect) {
  items.forEach((item, i) => {
    item.x -= item.speed;
    ctx.drawImage(img, item.x, item.y, item.width, item.height);

    if (checkCollision(player, item, scale)) {
      onCollect();
      coinSound.play();
      items.splice(i, 1);
    }
  });
}