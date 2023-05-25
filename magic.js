let i = 0,
  magicInterval = 1000;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const animate = (star) => {
  star.style.top = `${rand(-40, 80)}%`;
  star.style.left = `${rand(-10, 100)}%`;

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
};

for (const star of document.getElementsByClassName("magicStar")) {
  setTimeout(() => {
    animate(star);
    setInterval(() => animate(star), 1000);
  }, (i++ * magicInterval) / 3);
}
