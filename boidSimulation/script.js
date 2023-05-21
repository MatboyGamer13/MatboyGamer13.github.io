const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

document.body.appendChild(canvas);

const coherenceInput = document.getElementById("coherence");
const coherenceValue = document.getElementById("coherence-value");
const speedLimitInput = document.getElementById("speed-limit");
const speedLimitValue = document.getElementById("speed-limit-value");
const separationInput = document.getElementById("separation");
const separationValue = document.getElementById("separation-value");
const rangeInput = document.getElementById("range");
const rangeValue = document.getElementById("range-value");
const matchInput = document.getElementById("match");
const matchValue = document.getElementById("match-value");

const context = canvas.getContext("2d");

var boids = [];

let coherence = parseFloat(coherenceInput.value);
let speedLimit = parseFloat(speedLimitInput.value);
let separation = parseFloat(separationInput.value);
let range = parseFloat(rangeInput.value);
let match = parseFloat(matchInput.value);

const fovInput = document.getElementById("fov");
const fovValue = document.getElementById("fov-value");

let fov = 160;
function updateFov() {
  fov = parseFloat(fovInput.value);
  fovValue.innerText = fov;
}

updateFov();

class Boid {
  constructor(x, y) {
    let randomDigit = Math.floor(Math.random() * 7 + 5).toString(16);
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 10 - 5;
    this.dy = Math.random() * 10 - 5;
    this.history = [];
    this.color = "#55" + randomDigit;
    this.angle = Math.atan2(this.dy, this.dx);
  }

  move() {
    flyTowardsCenter(this);
    avoidOthers(this);
    matchVelocity(this);
    limitSpeed(this);
    keepWithinBounds(this);
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.dx * 2, this.y + this.dy * 2);
    context.strokeStyle = this.color;
    context.stroke();

    context.beginPath();
    context.arc(this.x, this.y, 4, 0, 300 * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}

const numInput = document.getElementById("num");
const numValue = document.getElementById("num-value");

let numOfBoids = 100;

function updateNumOfBoids() {
  numOfBoids = parseFloat(numInput.value);
  numValue.innerText = numOfBoids;
  boids = [];
  for (let i = 0; i < numOfBoids; i++) {
    boids.push(
      new Boid(Math.random() * canvas.width, Math.random() * canvas.height)
    );
  }
}

updateNumOfBoids();

const marginInput = document.getElementById("margin");
const marginValue = document.getElementById("margin-value");

let canvasMargin = marginInput;

function updateMargin() {
  canvasMargin = parseFloat(marginInput.value);
  marginValue.innerText = canvasMargin;
}

updateMargin();

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "#595a";
  context.lineWidth = 5;
  context.strokeRect(
    canvasMargin / 2,
    canvasMargin / 2,
    canvas.width - canvasMargin,
    canvas.height - canvasMargin
  );
  context.lineWidth = 1;

  for (let i = 0; i < boids.length; i++) {
    let boid = boids[i];
    boid.move();
    boid.draw();
  }

  requestAnimationFrame(animate);
}

function keepWithinBounds(boid) {
  const margin = canvasMargin;
  const turnFactor = 0.5;

  if (boid.x < margin) {
    boid.dx += turnFactor;
  }

  if (boid.x > canvas.width - margin) {
    boid.dx -= turnFactor;
  }

  if (boid.y < margin) {
    boid.dy += turnFactor;
  }

  if (boid.y > canvas.height - margin) {
    boid.dy -= turnFactor;
  }
}

function flyTowardsCenter(boid) {
  const centerFactor = coherence; //Coesão
  const perceptionRadius = range; //Alcance Visual
  const center = { x: 0, y: 0 };
  let neighborCount = 0;

  for (let otherBoid of boids) {
    const dx = otherBoid.x - boid.x;
    const dy = otherBoid.y - boid.y;
    const distance = Math.sqrt(dx * dx + dy * dy); // Pitágoras

    if (
      distance < perceptionRadius &&
      Math.abs(Math.atan2(dy, dx) - boid.angle) < fov / 2
    ) {
      center.x += otherBoid.x;
      center.y += otherBoid.y;
      neighborCount++;
    }
  }

  if (neighborCount) {
    center.x /= neighborCount;
    center.y /= neighborCount;

    boid.dx += (center.x - boid.x) * centerFactor;
    boid.dy += (center.y - boid.y) * centerFactor;
  }
}

function limitSpeed(boid) {
  const limit = speedLimit;
  const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);

  if (speed >= limit) {
    boid.dx = (boid.dx / speed) * limit;
    boid.dy = (boid.dy / speed) * limit;
  }
}

function matchVelocity(boid) {
  const matchingFactor = match;

  let avgDX = 0;
  let avgDY = 0;
  let neighborCount = 0;

  for (let otherBoid of boids) {
    const dx = otherBoid.x - boid.x;
    const dy = otherBoid.y - boid.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < range) {
      avgDX += otherBoid.dx;
      avgDY += otherBoid.dy;
      neighborCount++;
    }
  }

  if (neighborCount) {
    avgDX /= neighborCount;
    avgDY /= neighborCount;

    boid.dx += (avgDX - boid.dx) * matchingFactor;
    boid.dy += (avgDY - boid.dy) * matchingFactor;
  }
}

function avoidOthers(boid) {
  const minDistance = 20;
  const avoidFactorValue = separation / 1000;
  let moveX = 0;
  let moveY = 0;
  for (let otherBoid of boids) {
    if (otherBoid !== boid) {
      const dx = otherBoid.x - boid.x;
      const dy = otherBoid.y - boid.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < minDistance) {
        moveX += boid.x - otherBoid.x;
        moveY += boid.y - otherBoid.y;
      }
    }
  }

  boid.dx += moveX * avoidFactorValue;
  boid.dy += moveY * avoidFactorValue;
}

coherenceInput.addEventListener("input", () => {
  coherence = parseFloat(coherenceInput.value);
  coherenceValue.innerText = coherence;
});
speedLimitInput.addEventListener("input", () => {
  speedLimit = parseFloat(speedLimitInput.value);
  speedLimitValue.innerText = speedLimit;
});
separationInput.addEventListener("input", () => {
  separation = parseFloat(separationInput.value);
  separationValue.innerText = separation;
});
rangeInput.addEventListener("input", () => {
  range = parseFloat(rangeInput.value);
  rangeValue.innerText = range;
});
matchInput.addEventListener("input", () => {
  match = parseFloat(matchInput.value);
  matchValue.innerText = match;
});
numInput.addEventListener("input", () => {
  updateNumOfBoids();
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 50;
});

animate();
