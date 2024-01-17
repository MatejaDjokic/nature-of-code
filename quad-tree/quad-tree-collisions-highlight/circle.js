class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.r_sq = this.r * this.r;
  }
  contains(point) {
    let d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
    return d <= this.r_sq;
  }

  intersects(range) {
    var x_dist = Math.abs(range.x - this.x);
    var y_dist = Math.abs(range.y - this.y);

    var r = this.r;

    var w = range.w;
    var h = range.h;

    var edges = Math.pow(x_dist - w, 2) + Math.pow(y_dist - h, 2);

    if (x_dist > r + w || y_dist > r + h) return false;

    if (x_dist <= w || y_dist <= h) return true;

    return edges <= this.r_sq;
  }
}
