class Bird {
  constructor() {
    this.x = 20;
    this.y = canvas.height / 2 - 40;
    this.gravity = 0.1;
    this.velocity = 0;
    this.diam = canvas.width / 70;
    this.lift = -20;
    this.point = 0;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.borders();
  }

  up() {
    this.velocity += this.lift * this.gravity;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "#cf5";
    ctx.arc(this.x, this.y, this.diam, 0, Math.PI * 2);
    ctx.fill();
  }

  borders() {
    if (this.y > canvas.height) {
      this.y = canvas.height;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}
