export function setupIntro(startGameCallback) {
  const introCanvas = document.getElementById("intro");
  const introCtx = introCanvas.getContext("2d");
  const introMusic = new Audio("assets/intro.mp3");
  introMusic.loop = true;
  introMusic.volume = 0.1;

  let runX = -200;
  let boyX = introCanvas.width + 200;
  let introActive = true;

  const btnPlay = document.getElementById("musicBtnActive");
  const btnStop = document.getElementById("musicBtnStop");
  const startButton = document.getElementById("startButton");

  btnPlay.addEventListener("click", () => {
    introMusic.play();
    btnPlay.style.display = "none";
    btnStop.style.display = "inline-block";
  });

  btnStop.addEventListener("click", () => {
    introMusic.pause();
    introMusic.currentTime = 0;
    btnStop.style.display = "none";
    btnPlay.style.display = "inline-block";
  });

  startButton.addEventListener("click", () => {
    introActive = false;
    introMusic.pause();
    introMusic.currentTime = 0;

    const intro = document.getElementById("intro");
    const startScreen = document.getElementById("startScreen");

    intro.classList.add("fade-out");
    startScreen.classList.add("fade-out");

    setTimeout(() => {
      intro.style.display = "none";
      startScreen.style.display = "none";
      document.getElementById("game").style.display = "block";
      document.getElementById("ui").style.display = "block";
      btnPlay.style.display = "none";
      btnStop.style.display = "none";

      startGameCallback();
    }, 600);
  });

  function drawIntroText() {
    introCtx.clearRect(0, 0, introCanvas.width, introCanvas.height);
    introCtx.fillStyle = "#000";
    introCtx.fillRect(0, 0, introCanvas.width, introCanvas.height);

    introCtx.font = "72px Arial";
    introCtx.fillStyle = "#fff";
    introCtx.textAlign = "left";
    introCtx.fillText("Run", runX, introCanvas.height / 2);
    introCtx.textAlign = "right";
    introCtx.fillText("Boy", boyX, introCanvas.height / 2);

    if (runX < introCanvas.width / 2 - 130) runX += 8;
    if (boyX > introCanvas.width / 2 + 130) boyX -= 8;

    if (introActive) requestAnimationFrame(drawIntroText);
  }

  window.addEventListener("load", drawIntroText);
}