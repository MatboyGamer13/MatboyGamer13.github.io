const character = document.getElementById("character");
const block = document.getElementById("object");

const blockWidth = parseInt(
  window.getComputedStyle(block).getPropertyValue("width")
);
const blockHeight = parseInt(
  window.getComputedStyle(block).getPropertyValue("height")
);
const blockTop = parseInt(
  window.getComputedStyle(block).getPropertyValue("top")
);

document.addEventListener("click", jump);
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});
function jump() {
  if (character.classList == "animate") {
    return;
  }
  character.classList.add("animate");
  setTimeout(removeJump, 400);
}
function removeJump() {
  character.classList.remove("animate");
}

function checkDead() {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );

  if (
    blockLeft < blockWidth &&
    blockLeft > -blockHeight &&
    characterTop >= blockTop
  ) {
    alert("Game over");
  }
}

setInterval(checkDead, 4);

window.addEventListener("resize", () => {
  character = document.getElementById("character");
  block = document.getElementById("object");

  blockWidth = parseInt(
    window.getComputedStyle(block).getPropertyValue("width")
  );
  blockHeight = parseInt(
    window.getComputedStyle(block).getPropertyValue("height")
  );
  blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
});
