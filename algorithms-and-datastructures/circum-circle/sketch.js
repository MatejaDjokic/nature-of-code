let points = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function mousePressed() {
  if (points.length == 3) {
    points = [];
  }
  points.push(createVector(mouseX, mouseY));
}

function draw() {
  background(0);
  noFill();

  if (points.length == 3) {
    let [a, b, c] = points;

    strokeWeight(2);
    triangle(a.x, a.y, b.x, b.y, c.x, c.y);
    stroke(236, 1, 90);
    strokeWeight(4);
    fill(236, 1, 90, 25);
    circumcircle(a, b, c);
  }

  strokeWeight(16);
  stroke(112, 50, 126);
  for (let p of points) {
    point(p.x, p.y);
  }
}

function circumcircle(a, b, c) {
  let ab = p5.Vector.sub(b, a);
  let ac = p5.Vector.sub(c, a);
  let abmid = p5.Vector.add(a, b);
  abmid.div(2);

  let acmid = p5.Vector.add(a, c);
  acmid.div(2);

  ab.rotate(PI / 2);
  ac.rotate(PI / 2);

  let numerator = ac.x * (abmid.y - acmid.y) - ac.y * (abmid.x - acmid.x);
  let denominator = ac.y * ab.x - ac.x * ab.y;
  ab.mult(numerator / denominator);

  let center = p5.Vector.add(abmid, ab);

  let r = p5.Vector.dist(center, c);
  circle(center.x, center.y, r * 2);
}
