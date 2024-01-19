class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.max_vel = 3;

    this.previous = this.pos.copy();
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);

    let index = x + y * cols;
    let force = vectors[index];
    this.apply_force(force);
  }

  update() {
    // this.previous = this.pos;
    this.vel.add(this.acc);
    this.vel.limit(this.max_vel);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.edges();
  }

  apply_force(force) {
    this.acc.add(force);
  }

  show() {
    // this.r = abs(noise(random(0, this.pos.x), random(0, this.pos.y))) * 255;
    // this.g = abs(noise(random(0, this.pos.x), random(0, this.pos.y))) * 255;
    // this.b = abs(noise(random(0, this.pos.x), random(0, this.pos.y))) * 255;

    stroke(this.r, this.g, this.b, 10);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.previous.x, this.previous.y);
    // point(this.pos.x, this.pos.y);
    this.update_previous();
  }

  update_previous() {
    this.previous.x = this.pos.x;
    this.previous.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.update_previous();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.update_previous();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.update_previous();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.update_previous();
    }
  }
}
