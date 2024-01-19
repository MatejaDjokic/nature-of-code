let xoff = 0;
let step = 0.01;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(51);

  let x = map(noise(xoff), 0, 1, 0, width);
  xoff += step;

  let y = random(width);

  // stroke(255);
  // line(width / 2, 0, width / 2, height);
  // line(0, height / 2, width, height / 2);

  noStroke();
  fill(0, 255, 0);
  ellipse(x, height / 2, 24, 24);

  fill(255, 0, 0);
  ellipse(width / 2, y, 24, 24);
}
