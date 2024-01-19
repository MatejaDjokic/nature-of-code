let N = 10000;

let step = 0.1;
let scl = 10;
let cols, rows;

let zoff = 0;

let fr;

let particles = [];
let flow_field = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // createCanvas(200, 200);
  cols = floor(width / scl);
  rows = floor(height / scl);
  // fr = createP("");

  flow_field = new Array(cols * rows);

  for (let i = 0; i < N; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(10);
      flow_field[index] = v;

      xoff += step;
    }
    yoff += step;
  }
  zoff += 0.01;

  for (let particle of particles) {
    particle.follow(flow_field);
    particle.update();
    particle.show();
  }

  // fr.html(floor(frameRate()));
}
