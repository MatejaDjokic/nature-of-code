let movers = [];
const N = 10;
let mu = 0.01;
let dragC = 0.3;

function setup() {
  createCanvas(innerWidth, innerHeight);

  for (let i = 0; i < N; i++) {
    movers[i] = new Mover(random(width), 50, random(1, 8));
  }
}

function draw() {
  background(0);

  fill(255, 75);
  noStroke();
  rect(0, height / 2, width, height / 2);

  for (let mover of movers) {
    if (mouseIsPressed) {
      let wind = createVector(0.1, 0);
      mover.applyForce(wind);
    }

    let gravity = createVector(0, 0.2);

    let weight = p5.Vector.mult(gravity, mover.mass);

    mover.applyForce(weight);

    if (mover.pos.y > height / 2) {
      mover.drag(dragC);
    }
    mover.friction();
    mover.update();
    mover.edges();
    mover.show();
  }
}
