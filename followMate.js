const trailer = document.getElementById("trailer");

window.addEventListener("mousemove", (e) => {
  handleMouseMove(e);
});

function follow(x, y) {
  trailer.animate(
    {
      top: `${y}px`,
      left: ` ${x}px`,
    },
    { duration: 800, fill: "forwards" }
  );
}

function handleMouseMove(e) {
  const x = e.clientX - trailer.offsetWidth / 2,
    y = e.clientY - trailer.offsetHeight / 2;
  // console.log("moving: " + x + " " + y);
  follow(x, y);
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

const logo = document.querySelector("#logo");

setInterval(() => {
  let iteration = 0;

  clearInterval(interval);
  interval = setInterval(() => {
    logo.innerHTML = logo.innerHTML
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return logo.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= logo.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
}, 10000);
