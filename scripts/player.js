export const player = {
  x: 100,
  y: 0,
  vy: 0,
  onGround: false,
  width: 64,
  height: 64,
  frame: 0,
  frameCount: 4,
  frameDelay: 8,
  frameTick: 0,
};

export function updatePlayerPhysics(player, gravity, groundY) {
  player.vy += gravity;
  player.y += player.vy;

  if (player.y >= groundY) {
    player.y = groundY;
    player.vy = 0;
    player.onGround = true;
  }
}

export function drawPlayer(ctx, player, img, frameWidth, frameHeight, scale) {
  ctx.drawImage(
    img,
    player.frame * frameWidth, 0,
    frameWidth, frameHeight,
    player.x, player.y - 64,
    frameWidth * scale, frameHeight * scale
  );
}

export function animatePlayer(player) {
  player.frameTick++;
  if (player.frameTick >= player.frameDelay) {
    player.frame = (player.frame + 1) % player.frameCount;
    player.frameTick = 0;
  }
}

export function jump(player, force) {
  if (player.onGround) {
    player.vy = force;
    player.onGround = false;
  }
}