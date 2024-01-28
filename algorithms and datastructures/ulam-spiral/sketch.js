let x, y;
let step = 1;
let stepSize = 5;
let numSteps = 1;
let state = 0;
let turnCounter = 0;
let px,
  py = 0;
let totalSteps = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  const cols = width / stepSize;
  const rows = height / stepSize;

  totalSteps = cols * rows;
  x = width / 2;
  y = height / 2;

  background(0);
}

function isPrime(value) {
  if (value == 1) return false;
  for (let i = 2; i <= sqrt(value); i++) {
    if (value % i == 0) {
      return false;
    }
  }
  return true;
}

let f = 255;
let h = 255 / 2;

let colors = [
  [f, 0, 0],
  [h, h, 0],
  [0, f, 0],
  [0, h, h],
  [0, 0, f],
  [h, 0, h],
];
let index = 0;

let [r, g, b] = colors[0];
function draw() {
  stroke(r, g, b);
  line(x, y, px, py);
  px = x;
  py = y;

  fill(255);
  noStroke();
  if (isPrime(step)) {
    circle(x, y, stepSize);
    [r, g, b] = colors[index % colors.length];
    index += 1;
  }

  switch (state) {
    case 0:
      x += stepSize;
      break;
    case 1:
      y -= stepSize;
      break;
    case 2:
      x -= stepSize;
      break;
    case 3:
      y += stepSize;
      break;
  }

  if (step % numSteps == 0) {
    state = (state + 1) % 4;
    turnCounter++;
    if (turnCounter % 2 == 0) numSteps++;
  }
  step++;

  if (step > totalSteps) {
    noLoop();
  }
}
