class Spring {
    constructor(k, rest, a, b) {
        this.k = k;
        this.rest = rest;
        this.a = a;
        this.b = b;



    }

    update() {
        let force = p5.Vector.sub(this.b.pos, this.a.pos);
        let x = force.mag() - this.rest;
        force.normalize();
        force.mult(this.k * x);
        this.a.applyForce(force);
        force.mult(-1);
        this.b.applyForce(force);

    }

    show() {
        strokeWeight(4);
        stroke(255);
        line(
            this.a.pos.x,
            this.a.pos.y,
            this.b.pos.x,
            this.b.pos.y
        );
    }
}