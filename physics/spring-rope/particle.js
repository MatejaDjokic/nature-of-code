class Particle {
    constructor(x, y) {
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.pos = createVector(x, y);
        this.mass = 1;
        this.lock = false;
    }

    applyForce(force) {
        let f = force.copy();
        f.div(this.mass);
        this.acc.add(f);
    }

    update() {
        if (!this.lock) {
            this.vel.mult(.99);

            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill(45, 197, 244);
        ellipse(this.pos.x, this.pos.y, 16);
    }
}