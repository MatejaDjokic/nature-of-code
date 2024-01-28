class Mover {
    constructor(x, y, vx, vy, m) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
        this.vel.mult(1);
        this.acc = createVector(0, 0);
        this.mass = m;
        this.r = sqrt(m) * 2;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    attract(mover) {
        let force = p5.Vector.sub(this.pos, mover.pos);
        let dSq = constrain(force.magSq(), 100, 2500);

        let G = 1;

        let strength = (G * (this.mass * mover.mass)) / dSq;
        force.setMag(strength);
        mover.applyForce(force);
    }

    update() {

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}