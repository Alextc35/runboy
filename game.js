const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

let score = 0;
let gameStarted = false;

// === Assets ===
const playerImg = new Image();
playerImg.src = "assets/player.png";

const itemImg = new Image();
itemImg.src = "assets/item.png";

const bgImg = new Image();
bgImg.src = "assets/bg.png";

const coinSound = new Audio("assets/coin.mp3");
coinSound.volume = 0.1;

// === Configuración del sprite del jugador ===
const FRAME_COUNT = 4;
const FRAME_WIDTH = 64;
const FRAME_HEIGHT = 64;
const SCALE = 1.25;

// === Física ===
const GRAVITY = 0.8;
const JUMP_FORCE = -18;
let groundY = 0;

// === Jugador ===
const player = {
  x: 100,
  y: 0,
  vy: 0,
  onGround: false,
  width: FRAME_WIDTH,
  height: FRAME_HEIGHT,
  frame: 0,
  frameCount: FRAME_COUNT,
  frameDelay: 8,
  frameTick: 0,
};

// === Ítems ===
const items = [];

function spawnItem() {
  items.push({
    x: canvas.width,
    y: canvas.height - 256,
    width: 64,
    height: 64,
    speed: 8,
  });
}

function checkCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width * SCALE > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height * SCALE > b.y
  );
}

// === Controles ===
function jump() {
  if (player.onGround) {
    player.vy = JUMP_FORCE;
    player.onGround = false;
  }
}

window.addEventListener("keydown", (e) => {
  if (!gameStarted && (e.code === "Space" || e.code === "Enter")) {
    startGame();
  } else if (e.code === "Space" || e.code === "ArrowUp") {
    jump();
  }
});

window.addEventListener("mousedown", () => {
  if (!gameStarted) {
    startGame();
  } else {
    jump();
  }
});

document.getElementById("jumpBtn").addEventListener("touchstart", () => {
  if (player.onGround) {
    player.vy = JUMP_FORCE;
    player.onGround = false;
  }
});

// === Intro ===
const introCanvas = document.getElementById("intro");
const introCtx = introCanvas.getContext("2d");

let introOpacity = 0;
let introScale = 1.5;
let introTimer = 0;

function drawIntro() {
  introCtx.clearRect(0, 0, introCanvas.width, introCanvas.height);
  introCtx.fillStyle = "#000";
  introCtx.fillRect(0, 0, introCanvas.width, introCanvas.height);

  introCtx.fillStyle = "#fff";
  introCtx.font = "72px Arial";
  introCtx.textAlign = "center";
  introCtx.fillText("🏃‍♂️ RunBoy", introCanvas.width / 2, introCanvas.height / 2 - 40);

  introCtx.font = "24px Arial";
  introCtx.fillText("Haz clic en el botón para comenzar", introCanvas.width / 2, introCanvas.height / 2 + 30);
}

// Botón de inicio
document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  canvas.style.display = "block";
  document.getElementById("ui").style.display = "block";
  document.getElementById("jumpBtn").style.display = "block";
  startGame();
});

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    update();
    setInterval(spawnItem, 1500);
  }
}

// === Fondo desplazable ===
let bgX = 0;

// === Bucle principal ===
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fondo en movimiento
  bgX -= 2;
  if (bgX <= -canvas.width) bgX = 0;
  ctx.drawImage(bgImg, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, bgX + canvas.width, 0, canvas.width, canvas.height);

  // Física del jugador
  player.vy += GRAVITY;
  player.y += player.vy;

  if (player.y >= groundY) {
    player.y = groundY;
    player.vy = 0;
    player.onGround = true;
  }

  // Dibujar jugador
  ctx.drawImage(
    playerImg,
    player.frame * FRAME_WIDTH, 0,
    FRAME_WIDTH, FRAME_HEIGHT,
    player.x, player.y - 32,
    FRAME_WIDTH * SCALE, FRAME_HEIGHT * SCALE
  );

  // Animación del jugador
  player.frameTick++;
  if (player.frameTick >= player.frameDelay) {
    player.frame = (player.frame + 1) % FRAME_COUNT;
    player.frameTick = 0;
  }

  // Dibujar y actualizar ítems
  items.forEach((item, i) => {
    item.x -= item.speed;
    ctx.drawImage(itemImg, item.x, item.y, item.width, item.height);

    if (checkCollision(player, item)) {
      score++;
      scoreEl.textContent = score;
      coinSound.play();
      items.splice(i, 1);
    }
  });

  requestAnimationFrame(update);
}

// === Inicializar cuando carga la imagen del jugador ===
playerImg.onload = () => {
  groundY = canvas.height - FRAME_HEIGHT * SCALE - 16;
  player.y = groundY;
  drawIntro();
};
