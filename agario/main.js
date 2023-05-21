var mainBloid;
var blobs = [];

function init() {
  mainBloid = new Bloid({
    x: width * 2,
    y: height * 2,
    r: 64,
  });

  for (var i = 0; i < 500; i++) {
    var x = random(-width, width * 2);
    var y = random(-height, height * 2);
    blobs.push(
      new Bloid({
        x: x,
        y: y,
        r: Math.random() * 5,
      })
    );
  }
}

function mainLoop() {
  clearRect();
  ctx.save();
  ctx.translate(width / 2 - mainBloid.xOff, height / 2 - mainBloid.yOff);
  mainBloid.show();
  mainBloid.update();

  for (var i = blobs.length - 1; i >= 0; i--) {
    blob = blobs[i];
    blob.show();
    if (mainBloid.eats(blob)) {
      blobs.splice(i, 1);
    }
  }

  fill("#f005");
  fillRect(-width, -height, width * 3, height * 3);
  ctx.restore();

  requestAnimationFrame(mainLoop);
}
