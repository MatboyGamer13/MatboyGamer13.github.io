class Bloid {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.r = config.r;
  }

  update() {
    // this.keepWithinBorder();
    this.vel = {
      x: mouse.x - width / 2,
      y: mouse.y - height / 2,
    };
    this.velMag = setMagnitude(3, this.vel);
    this.x += this.velMag.x;
    this.y += this.velMag.y;
  }

  eats(oBlob) {
    var d = getDistance(this.xOff, this.yOff, oBlob.x, oBlob.y);

    if (d < this.r * 2 + oBlob.r * 2 && this.r > oBlob.r) {
      this.r += oBlob.r / 5;
      return true;
    } else {
      return false;
    }
  }

  show() {
    fill("#5c5");
    this.xOff = this.x - this.r;
    this.yOff = this.y - this.r;
    ellipse(this.xOff, this.yOff, this.r * 2);

    fill("#f005");
    fillRect(this.x - 10, this.y - 10, 20, 20);
    fillRect(
      this.xOff - this.r * 2,
      this.yOff - this.r * 2,
      this.r * 4,
      this.r * 4
    );
  }
}
