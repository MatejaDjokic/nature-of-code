class Blobby {
  constructor(x, y, r, xs, ys, zs, h) {
    this.pos = createVector(x, y);
    this.r = r;
    this.yoff = 0;
    this.zoff = 10000;

    this.xstep = xs;
    this.ystep = ys;
    this.zstep = zs;

    this.h = h;
  }

  show() {
    translate(this.pos.x, this.pos.y);
    beginShape();
    let xoff = 0;
    let first = true;
    let fx, fy;
    for (var a = 0; a < TWO_PI; a += 0.01) {
      let offset = map(
        noise(xoff, this.yoff),
        0,
        1,
        -this.r * this.h,
        this.r * this.h
      );
      let rad = this.r + offset;
      for (let i = 0; i < 4; i++) {
        let x = rad * cos(a);
        let y = rad * sin(a);
        if (first) {
          fx = x;
          fy = y;
        }
        vertex(x, y);
        let r = map(noise(xoff, this.yoff), 0, 1, 0, 255);
        let g = map(noise(this.yoff, xoff), 0, 1, 0, 255);
        let b = map(noise(xoff, this.yoff), 0, 1, 0, 255);
        stroke(r, g, b);
        strokeWeight(2);
        fill(r, g, b);
      }
      xoff += this.xstep;
    }
    vertex(fx, fy);
    endShape();

    this.yoff += this.ystep;
    this.zoff += this.zstep;
  }
}
