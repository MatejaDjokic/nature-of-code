// let xoff1 = 0;
// let xoff2 = 10000;
let step = 0.02;
let start = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(51);

  stroke(255);
  noFill();
  beginShape();
  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(255);
    let y = map(noise(xoff), 0, 1, 0, height);
    vertex(x, y);
    xoff += step;
  }
  endShape();

  start += step;

  // let x = map(noise(xoff1), 0, 1, 0, width);
  // let y = map(noise(xoff2), 0, 1, 0, width);

  // xoff1 += step;
  // xoff2 += step;

  // ellipse(x, y, 24, 24);
}
