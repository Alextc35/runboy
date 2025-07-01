import { player, updatePlayerPhysics, drawPlayer, animatePlayer, jump } from './player.js';
import { items, spawnItem, updateItems } from './items.js';
import { updateBackground } from './background.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

let score = 0;
let gameStarted = false;
let itemSpawner = null;

const GRAVITY = 0.8;
const JUMP_FORCE = -20;
const SCALE = 1.5;
const groundY = canvas.height - 64 * SCALE - 16;

const playerImg = new Image();
playerImg.src = "assets/player.png";

const itemImg = new Image();
itemImg.src = "assets/item.png";

const bgImg = new Image();
bgImg.src = "assets/bg.png";

const coinSound = new Audio("assets/coin.mp3");
coinSound.volume = 0.1;

function update() {
  if (!gameStarted) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateBackground(ctx, bgImg, canvas);
  updatePlayerPhysics(player, GRAVITY, groundY);
  drawPlayer(ctx, player, playerImg, 64, 64, SCALE);
  animatePlayer(player);
  updateItems(ctx, items, itemImg, player, SCALE, coinSound, scoreEl, () => {
    score++;
    scoreEl.textContent = score;
  });

  requestAnimationFrame(update);
}

window.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump(player, JUMP_FORCE);
  }
});

window.addEventListener("mousedown", () => {
  jump(player, JUMP_FORCE);
});

export function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  score = 0;
  scoreEl.textContent = score;
  items.length = 0;
  player.y = groundY;

  itemSpawner = setInterval(() => spawnItem(items, canvas), 1500);
  requestAnimationFrame(update);
}