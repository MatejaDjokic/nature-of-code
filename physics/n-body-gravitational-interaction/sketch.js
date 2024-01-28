let movers = [];
const N = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < N; i++) {
    let x = random(width);
    let y = random(height);
    let v = p5.Vector.random2D();
    let m = random(5, 15);
    movers[i] = new Mover(x, y, v.x, v.y, m);
  }

  // movers[0] = new Mover(windowWidth / 2 + 100, windowHeight / 2, 0, 5, 10);
  // movers[1] = new Mover(windowWidth / 2 - 100, windowHeight / 2, 0, -5, 10);
  // movers[2] = new Mover(windowWidth / 2, windowHeight / 2 + 100, -5, 0, 10);
  // movers[3] = new Mover(windowWidth / 2, windowHeight / 2 - 100, 5, 0, 10);
  background(0);
}

function draw() {
  background(0);

  for (let mover of movers) {
    for (let other of movers) {
      if (mover != other) {
        mover.attract(other);
        stroke(255);
        // line(
        //     mover.pos.x, mover.pos.y,
        //     other.pos.x, other.pos.y
        // );
      }
    }
  }

  for (let mover of movers) {
    mover.update();
    mover.show();
  }
}
