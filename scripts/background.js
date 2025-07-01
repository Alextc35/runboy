let bgX = 0;

export function updateBackground(ctx, bgImg, canvas) {
  bgX -= 2;
  if (bgX <= -canvas.width) bgX = 0;

  ctx.drawImage(bgImg, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, bgX + canvas.width, 0, canvas.width, canvas.height);
}