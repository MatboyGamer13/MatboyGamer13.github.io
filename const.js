const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight - window.innerHeight / 30;
canvas.width = window.innerWidth - window.innerWidth / 30;
const ctx = canvas.getContext("2d");

let iteration = 0;
let centerX = canvas.width / 3;
let centerY = canvas.height / 5;

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight - window.innerHeight / 30;
  canvas.width = window.innerWidth - window.innerWidth / 30;

  iteration = 0;
  centerX = canvas.width / 3;
  centerY = canvas.height / 5;
});

function map(value, start1, stop1, start2, stop2) {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
