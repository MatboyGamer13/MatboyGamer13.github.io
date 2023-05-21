class Pipe {
  constructor(speed) {
    this.x = canvas.width;
    this.y = canvas.height;
    this.bottom = (Math.random() * canvas.height) / 2;
    this.top = (Math.random() * canvas.height) / 2;
    this.speed = speed;
    this.w = (canvas.width / 70) * 4;
    this.diff = canvas.height - this.bottom - this.top;
    this.highlight = false;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > canvas.height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    return false;
  }

  update() {
    this.x -= this.speed;
  }

  isOffScreen() {
    return this.x < 0 - this.w;
  }

  draw() {
    while (this.diff < canvas.width / 70 + 15) {
      this.bottom = (Math.random() * canvas.height) / 2;
      this.top = (Math.random() * canvas.height) / 2;
      this.diff = canvas.height - this.bottom - this.top;
    }
    ctx.beginPath();
    ctx.fillStyle = "#5f5";
    if (this.highlight) {
      ctx.fillStyle = "#f55";
    }
    ctx.fillRect(this.x, 0, this.w, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.w, this.bottom);
    ctx.fill();
  }
}
