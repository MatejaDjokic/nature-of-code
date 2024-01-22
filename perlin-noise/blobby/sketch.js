// Daniel Shiffman
// https://thecodingtrain.com/challenges/36-blobby

let yoff = 0.0;

let blobby;
function setup() {
  createCanvas(window.innerHeight, window.innerHeight);
  pixelDensity(1);

  let x = width / 2;
  let y = height / 2;
  let radius = 250;
  let xstep = 1;
  let ystep = 0.005;
  let zstep = 0.003;
  let radius_move = 0.05;
  blobby = new Blobby(x, y, radius, xstep, ystep, zstep, radius_move);
}

function draw() {
  background(0);
  blobby.show();
}
