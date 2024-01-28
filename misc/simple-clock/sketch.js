const w = window.innerWidth;
const h = window.innerHeight;

function setup() {
  createCanvas(w, h);
}

function draw() {
  background(0);
  translate(w / 2, h / 2);
  rotate(-PI / 2);

  let hr = hour();
  let mn = minute();
  let sc = second();

  strokeWeight(8);
  noFill();

  // seconds
  stroke(255, 100, 150);
  let secAngle = map(sc, 0, 60, 0, PI * 2);
  arc(0, 0, 300, 300, 0, secAngle);

  // minutes
  stroke(150, 100, 255);
  let minAngle = map(mn, 0, 60, 0, PI * 2);
  arc(0, 0, 280, 280, 0, minAngle);

  // hours
  stroke(150, 255, 100);
  let hourAngle = map(hr % 12, 0, 12, 0, PI * 2);
  arc(0, 0, 260, 260, 0, hourAngle);

  push();
  rotate(secAngle);
  stroke(255, 100, 150);
  line(0, 0, 100, 0);
  pop();

  push();
  rotate(minAngle);
  stroke(150, 100, 255);
  line(0, 0, 75, 0);
  pop();

  push();
  rotate(hourAngle);
  stroke(150, 255, 100);
  line(0, 0, 50, 0);
  pop();

  stroke(255);
  ellipse(0, 0, 10, 10);
  console.log(hr + ":" + mn + ":" + sc);
}
