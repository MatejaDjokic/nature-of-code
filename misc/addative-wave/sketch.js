const N = 10;

let waves = [];

let change_slider;
let r_slider;
let g_slider;
let b_slider;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 25);

  change_slider = createSlider(0, 0.25, 0.05, 0.01);
  r_slider = createSlider(0, 255, 90, 1);
  g_slider = createSlider(0, 255, 40, 1);
  b_slider = createSlider(0, 255, 125, 1);

  for (let i = 0; i < N; i++) {
    waves[i] = new Wave(random(20, 60), random(100, 600), random(0, TWO_PI));
  }
}

function draw() {
  background(0);

  for (let x = 0; x < width; x += 10) {
    let y = 0;
    for (let wave of waves) {
      y += wave.eval(x);
    }

    noStroke();
    fill(
      map(x, 0, width, 1, r_slider.value()),
      map(x, 0, width, 1, g_slider.value()),
      map(x, 0, width, 1, b_slider.value())
    );
    ellipse(x, y + height / 2, 16);
  }

  for (let wave of waves) {
    wave.update(change_slider.value());
  }
}
