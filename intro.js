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