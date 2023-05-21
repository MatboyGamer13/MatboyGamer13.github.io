var mouse = { x: 0, y: 0 };
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const width = canvas.width;
const height = canvas.height;

const bloidRadius = 64;
const bloidCount = 50;

function fill(color) {
  ctx.fillStyle = color;
}
function ellipse(x, y, sR) {
  ctx.beginPath();
  ctx.ellipse(x, y, sR, sR, 0, 0, Math.PI * 2);
  ctx.fill();
}

function clearRect() {
  ctx.clearRect(-width, -height, width * 2, height * 2);
}

document.addEventListener("mousemove", (e) => {
  mouse = { x: e.clientX, y: e.clientY };
});

function getDirection(y, x) {
  return Math.atan2(y, x);
}

function setMagnitude(magnitude, config) {
  const dir = getDirection(config.y, config.x);

  const result = {
    x: (Math.cos(dir) * magnitude) / 2,
    y: (Math.sin(dir) * magnitude) / 2,
  };

  return result;
}

function random(m, n) {
  return Math.floor(Math.random() * (n - m + 1)) + m;
}

function getDistance(x1, y1, x2, y2) {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function fillRect(x, y, w, h) {
  ctx.beginPath();
  ctx.fillRect(x, y, w, h);
  ctx.stroke();
}

function hideButton() {
  startButton.style.display = "none";
}
