var temperature = {};
var moisture = {};
var altitude = {};
var biome = {};

var simplex = new SimplexNoise();

function generateMap(period, octaves, width, height) {
  simplex.setPeriod(period);
  simplex.setOctaves(octaves);

  simplex.setSeed(Math.random());
  var grid = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    for (var y = 0; y < height; y++) {
      var rand = 2 * Math.abs(simplex.getNoise2D(x, y));
      // console.log(rand);
      grid[x][y] = rand;
    }
  }

  return grid;
}

function init() {
  temperature = generateMap(100, 5, w, h);
  moisture = generateMap(100, 5, w, h);
  altitude = generateMap(150, 5, w, h);
  setTile(w, h);
}

var tileWidth = 4;
var tileHeight = 4;

function setTile(w, h) {
  for (var x = 0; x < w; x += tileWidth) {
    for (var y = 0; y < h; y += tileHeight) {
      var altSum = 0;
      var tempSum = 0;
      var moistSum = 0;

      // Calculate the average values for the tile
      for (var i = 0; i < tileWidth; i++) {
        for (var j = 0; j < tileHeight; j++) {
          var tileX = x + i;
          var tileY = y + j;
          altSum += altitude[tileX][tileY];
          tempSum += temperature[tileX][tileY];
          moistSum += moisture[tileX][tileY];
        }
      }

      var altAvg = altSum / (tileWidth * tileHeight);
      var tempAvg = tempSum / (tileWidth * tileHeight);
      var moistAvg = moistSum / (tileWidth * tileHeight);

      // Apply the biome colors based on the averaged values
      for (var i = 0; i < tileWidth; i++) {
        for (var j = 0; j < tileHeight; j++) {
          var tileX = x + i;
          var tileY = y + j;
          var alt = altitude[tileX][tileY];
          var temp = temperature[tileX][tileY];
          var moist = moisture[tileX][tileY];

          // Ocean
          if (alt < 0.2) {
            ctx.fillStyle = "#1cc";
          }
          // Beach
          else if (between(alt, 0.2, 0.25)) {
            ctx.fillStyle = "#ca5";
          }
          // Other Biomes
          else if (between(alt, 0.25, 0.8)) {
            if (between(moistAvg, 0, 0.9) && between(tempAvg, 0, 0.6)) {
              // Plains
              ctx.fillStyle = "#6a6";
            } else if (between(moistAvg, 0.4, 0.9) && tempAvg > 0.6) {
              // Jungle
              ctx.fillStyle = "#2a2";
            } else if (tempAvg > 0.6 && moistAvg < 0.4) {
              // Desert
              ctx.fillStyle = "#ca5";
            } else if (between(moistAvg, 0, 0.9) && between(tempAvg, 0.6, 1)) {
              // Taiga
              ctx.fillStyle = "#8a8";
            } else if (moistAvg >= 0.9) {
              // Lakes
              ctx.fillStyle = "#1cc";
            } else {
              ctx.fillStyle = "#888";
            }
          }
          // Snow
          else if (between(alt, 0.8, 0.95)) {
            ctx.fillStyle = "#fff6";
          }
          // Mountain
          else {
            ctx.fillStyle = "#fff";
          }

          // Paint the tile
          ctx.fillRect(
            tileX * tileWidth,
            tileY * tileHeight,
            tileWidth,
            tileHeight
          );
        }
      }
    }
  }
}

function between(val, start, end) {
  return start <= val && val < end;
}

document.addEventListener("click", () => {
  location.reload();
});

init();
