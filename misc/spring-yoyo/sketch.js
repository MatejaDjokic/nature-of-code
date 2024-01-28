let bob;
let anchor;
let vel;
let grav;
let restLen = 200;
let k = 0.01;

function setup() {
    createCanvas(innerWidth, innerHeight);
    bob = createVector(350, 250);
    anchor = createVector(width / 2, 200);
    vel = createVector(0, 0);
    grav = createVector(0, 1);
}

function draw() {
    background(112, 50, 127);

    noStroke();
    fill(45, 197, 244);
    stroke(255);
    strokeWeight(4);
    line(anchor.x, anchor.y, bob.x, bob.y);
    circle(anchor.x, anchor.y, 32);
    circle(bob.x, bob.y, 64);

    if (mouseIsPressed) {
        bob.x = mouseX;
        bob.y = mouseY;
        vel.set(0, 0);
    }

    let force = p5.Vector.sub(bob, anchor);
    let x = force.mag() - restLen;
    force.normalize();
    force.mult(-1 * k * x);

    vel.add(force);
    vel.add(grav);
    bob.add(vel);
    vel.mult(.99);
}
