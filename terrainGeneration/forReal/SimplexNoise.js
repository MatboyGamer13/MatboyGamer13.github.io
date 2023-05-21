class SimplexNoise {
  constructor() {
    this.p = new Uint8Array(256);
    this.seed = 0;

    this.setSeed(Math.random());
  }

  setPeriod(period) {
    this.period = period;
  }

  setSeed(seed) {
    this.seed = seed;

    const permutation = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      permutation[i] = i;
    }

    for (let i = 0; i < 256; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }

    for (let i = 0; i < 256; i++) {
      this.p[i] = permutation[i];
    }
  }

  setOctaves(octaves) {
    this.octaves = octaves;
  }

  getNoise(x, y) {
    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (t, a, b) => a + t * (b - a);
    const grad = (hash, x, y) => {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    const X = Math.floor(x / this.period) & 255;
    const Y = Math.floor(y / this.period) & 255;

    const xi = X & 255;
    const yi = Y & 255;

    const xf = x / this.period - Math.floor(x / this.period);
    const yf = y / this.period - Math.floor(y / this.period);

    const u = fade(xf);
    const v = fade(yf);

    const aa = this.p[this.p[xi] + yi];
    const ab = this.p[this.p[xi] + yi + 1];
    const ba = this.p[this.p[xi + 1] + yi];
    const bb = this.p[this.p[xi + 1] + yi + 1];

    const x1 = lerp(u, grad(aa, xf, yf), grad(ba, xf - 1, yf));
    const x2 = lerp(u, grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1));

    return lerp(v, x1, x2);
  }

  getNoise2D(x, y) {
    let noise = 0;
    let amplitude = 1;
    let frequency = 1;

    for (let i = 0; i < this.octaves; i++) {
      noise += this.getNoise(x * frequency, y * frequency) * amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }

    return noise;
  }
}
