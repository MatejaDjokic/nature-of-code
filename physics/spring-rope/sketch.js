let particles = [];
let springs = [];
let grav;
let k = .01;

let spacing = 20;
const N = 20;

function setup() {
    createCanvas(innerWidth, innerHeight);

    for (let i = 0; i < N; i++) {
        particles[i] = new Particle(200, i * spacing);
        if (i !== 0) {
            let a = particles[i];
            let b = particles[i - 1];
            let spring = new Spring(k, spacing, a, b);
            springs.push(spring);
        }
    }

    grav = createVector(0, .1);
}

function draw() {
    background(112, 50, 127);

    for (let spring of springs) {
        spring.update();
        // spring.show();
    }

    let head = particles[0];
    noFill();
    stroke(255);
    strokeWeight(8);
    beginShape();
    curveVertex(head.pos.x, head.pos.y);
    for (let particle of particles) {
        particle.applyForce(grav);
        particle.update();
        curveVertex(particle.pos.x, particle.pos.y);
        // particle.show();
    }
    endShape();
    let tail = particles[particles.length - 1];
    curveVertex(tail.pos.x, tail.pos.y);

    if (mouseIsPressed) {
        tail.pos.set(mouseX, mouseY);
        tail.vel.set(0, 0);
    }
    particles[0].lock = true;
    particles[0].pos.set(width / 2, height / 2);

    // vel.add(force);
    // vel.add(grav);
    // bob.add(vel);
    // vel.mult(.99);
}