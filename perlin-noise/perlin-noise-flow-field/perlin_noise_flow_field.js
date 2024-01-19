let step = 0.1;
let scl = 10;
let cols, rows;

let zoff = 0;

let fr;

function setup() {
  // createCanvas(window.innerWidth, window.innerHeight);
  createCanvas(200, 200);
  cols = floor(width / scl);
  rows = float(height / scl);
  fr = createP("");
}

function draw() {
  background(255);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);

      xoff += step;

      stroke(0);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0);
      pop();
    }
    yoff += step;
  }
  zoff += 0.005;

  fr.html(floor(frameRate()));
}
