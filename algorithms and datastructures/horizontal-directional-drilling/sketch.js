let pos;
let dir;
let bias = 1;
let path = [];

function setup() {
  createCanvas(600, 400);
  pos = createVector(10, 100);
  dir = p5.Vector.fromAngle(PI / 6);

  createButton("TOGGLE BIAS").mousePressed(function () {
    bias *= -1;
  });
}

function drill() {
  const angle = 0.01;
  dir.rotate(angle * bias);

  path.push(pos.copy());
  pos.add(dir);
}

function draw() {
  drill();

  background(51);
  noStroke();
  rectMode(CORNER);
  fill(139, 69, 19);
  rect(0, 100, width, height - 100);
  fill(30, 144, 255);
  arc(width / 2, 100, 400, 200, 0, PI);

  beginShape();
  noFill();
  stroke(0);
  strokeWeight(2);
  for (let v of path) {
    vertex(v.x, v.y);
  }
  endShape();

  stroke(255, 0, 0);
  strokeWeight(4);
  push();
  translate(pos.x, pos.y);
  rotate(dir.heading() + (PI / 6) * bias);
  line(0, 0, 10, 0);
  pop();
}
