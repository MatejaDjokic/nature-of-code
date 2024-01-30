let p1y_slider;
let p2y_slider;
let p1x_slider;
let p2x_slider;

function setup() {
  createCanvas(innerWidth, innerHeight - 25);

  p1y_slider = createSlider(0, height / 2, height / 2 - height / 4, 1);
  p1x_slider = createSlider(0, width / 2, width / 2 - width / 4, 1);

  p2y_slider = createSlider(0, height, height / 2, 1);
  p2x_slider = createSlider(0, width, width / 2, 1);
}

function mousePressed() {
  if (mouseButton == "left") {
    console.log(mouseButton);
    pos = createVector(mouseX, mouseY);
  } else if (mouseButton == "right") {
    path = createVector(mouseX, mouseY);
  }
}

function vectirProjection(a, path) {
  let bC = path.copy().normalize();
  let sp = a.dot(bC);
  bC.mult(sp);
  return bC;
}

let pos;
let path;

function draw() {
  background(0);
  strokeWeight(4);
  stroke(255);

  pos = createVector(p1x_slider.value(), p1y_slider.value());
  path = createVector(p2x_slider.value(), p2y_slider.value());

  let mouse = createVector(mouseX, mouseY);
  let a = p5.Vector.sub(mouse, pos);

  //line(pos.x, pos.y, pos.x + a.x, pos.y + a.y);
  line(pos.x, pos.y, pos.x + path.x, pos.y + path.y);

  let v = vectirProjection(a, path);

  //strokeWeight(8);
  //stroke(0, 0, 255);
  //line(pos.x, pos.y, pos.x + v.x, pos.y + v.y);

  //strokeWeight(1);
  //line(pos.x + a.x, pos.y + a.y, v.x + pos.x, v.y + pos.y);

  fill(0, 255, 0);
  noStroke();
  circle(pos.x + a.x, pos.y + a.y, 16);

  fill(255, 0, 0);
  noStroke();
  circle(v.x + pos.x, v.y + pos.y, 16);
}
