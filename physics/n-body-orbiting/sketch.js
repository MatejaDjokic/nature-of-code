let movers = [];
const N = 50;
let sun;

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < N; i++) {
        let pos = p5.Vector.random2D();
        let vel = pos.copy();
        vel.setMag(random(5, 15));
        pos.setMag(200, 300);
        vel.rotate(PI / 2);
        let m = random(5, 15);
        movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
    }
    sun = new Mover(0, 0, 0, 0, 1000);
    // movers[0] = new Mover(windowWidth / 2 + 100, windowHeight / 2, 0, 5, 10);
    // movers[1] = new Mover(windowWidth / 2 - 100, windowHeight / 2, 0, -5, 10);
    // movers[2] = new Mover(windowWidth / 2, windowHeight / 2 + 100, -5, 0, 10);
    // movers[3] = new Mover(windowWidth / 2, windowHeight / 2 - 100, 5, 0, 10);
    background(0);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    for (let mover of movers) {
        sun.attract(mover);
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
    sun.show();

}