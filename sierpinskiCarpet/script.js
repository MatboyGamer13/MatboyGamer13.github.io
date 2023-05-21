iteration = 0;
ctx.fillStyle = "#955";

canvas.addEventListener("click", () => {
  ctx.fillStyle = "#955";
  iteration++;
  drawCarpet(iteration);
});

function drawCarpet(iteration) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let size = canvas.width / 3;

  ctx.fillRect(centerX, centerY, size, size);

  drawSquare(centerX, centerY, size, iteration);
}

function drawSquare(x, y, size, iteration) {
  if (iteration === 0) return;

  let newSize = size / 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) {
        ctx.clearRect(x + newSize, y + newSize, newSize, newSize);
      } else {
        ctx.fillRect(x + i * newSize, y + j * newSize, newSize, newSize);
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i !== 1 || j !== 1) {
        drawSquare(x + i * newSize, y + j * newSize, newSize, iteration - 1);
      }
    }
  }
}
