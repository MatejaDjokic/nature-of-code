class Circle {
  constructor(bend, x, y) {
    this.center = new Complex(x, y);
    this.bend = bend;
    this.radius = abs(1 / this.bend);
  }

  show() {
    stroke(255);
    noFill();
    circle(this.center.real, this.center.img, this.radius * 2);
  }

  dist(other) {
    return dist(
      this.center.real,
      this.center.img,
      other.center.real,
      other.center.img
    );
  }
}
