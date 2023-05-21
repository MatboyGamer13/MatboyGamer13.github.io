const canvas = document.querySelector(".canvas");

const startButton = document.getElementById("startButton");
let delay = 100;

if (window.innerWidth < 756) {
  canvas.width = window.innerWidth - 10;
  delay = 50;
} else {
  canvas.width = window.innerWidth - window.innerHeight / 2;
}

canvas.height = window.innerHeight - window.innerHeight / 5;
const ctx = canvas.getContext("2d");
const diff = document.querySelector(".diff");
const score = document.querySelector(".score");
const cont = document.querySelector(".cont");

const bird = new Bird();
let pipes = [];
let frames = 0;
let numOfPipes = 0;
let gameOver = false;

function draw() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].draw();
    pipes[i].update();
    if (pipes[i].hits(bird)) {
      score.textContent = "Você Morreu :< Seu Score foi: " + numOfPipes;
      resetGame();
      break;
    }

    if (pipes[i].isOffScreen()) {
      numOfPipes++;
      pipes.splice(i, 1);
    }
  }

  if (!gameOver) {
    if (frames % delay == 10) {
      pipes.push(new Pipe(4));
    }

    score.textContent = "";
    score.textContent = "Score: " + numOfPipes;
    bird.update();
    bird.draw();
    requestAnimationFrame(draw);
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    bird.up();
  }
});
document.addEventListener("click", () => {
  bird.up();
});

function hideButton() {
  cont.style.top = "5vh";
  startButton.style.display = "none";
  gameOver = false;
  draw();
}

function showButton() {
  startButton.style.display = "block";
  cont.style.top = "30vh";
}

function resetGame() {
  bird.y = canvas.height / 2 - 40;
  bird.velocity = 0;
  numOfPipes = 0;
  pipes = [];
  frames = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  showButton();
  gameOver = true;
}
