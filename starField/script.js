let mouseY = 0;

canvas.addEventListener("mousemove", (event) => {
  mouseY = event.clientY;
});

let Stars = [];

let numOfStars = 1000;

class Star {
  constructor() {
    this.x = Math.random() * canvas.width * 2 - canvas.width;
    this.y = Math.random() * canvas.height * 2 - canvas.height;
    this.z = Math.random() * canvas.height;
    this.pz = this.z;
  }

  update() {
    this.z = this.z - map(mouseY, 0, canvas.height, 60, 1);
    if (this.z <= 1) {
      this.z = Math.random() * canvas.width;
      this.x = Math.random() * canvas.width * 2 - canvas.width;
      this.y = Math.random() * canvas.height * 2 - canvas.height;
      this.pz = this.z;
    }
  }

  draw() {
    ctx.strokeStyle = "#fff";

    this.r = map(this.z, 0, canvas.width, 3, 0);
    this.sx = map(this.x / this.z, 0, 1, canvas.width / 2, canvas.width);
    this.sy = map(this.y / this.z, 0, 1, canvas.height / 2, canvas.height);

    this.px = map(this.x / this.pz, 0, 1, canvas.width / 2, canvas.width);
    this.py = map(this.y / this.pz, 0, 1, canvas.height / 2, canvas.height);
    this.pz = this.z;

    ctx.beginPath();
    ctx.moveTo(this.px, this.py);
    ctx.lineWidth = this.r;
    ctx.lineTo(this.sx, this.sy);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#fff";

    ctx.arc(this.sx, this.sy, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function start() {
  for (let index = 0; index < numOfStars; index++) {
    Stars.push(new Star());
  }

  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < Stars.length; index++) {
    const Star = Stars[index];
    Star.update();
    Star.draw();
  }

  requestAnimationFrame(animate);
}

start();
