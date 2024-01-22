let phase_slider, points_slider, noise_max_slider, zstep_slider;
let phase = 0;
let zoff = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 100);
  noise_max_slider = createSlider(0, 10, 1, 0.1);
  points_slider = createSlider(0.001, 0.1, 0.01, 0.001);
  phase_slider = createSlider(0, 0.5, 0, 0.001);
  zstep_slider = createSlider(0.001, 0.1, 0.001, 0.0001);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  noFill();

  beginShape();
  let noise_max = noise_max_slider.value();
  let points_inc = points_slider.value();
  let phase_inc = phase_slider.value();
  let zstep = zstep_slider.value();
  for (let a = 0; a < TWO_PI; a += points_inc) {
    let xoff = map(cos(a + phase), -1, 1, 0, noise_max);
    let yoff = map(sin(a + phase), -1, 1, 0, noise_max);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 100, 200);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  phase += phase_inc;
  zoff += zstep;
}
