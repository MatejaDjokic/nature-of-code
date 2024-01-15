class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }

  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(
      this.boundary.x,
      this.boundary.y,
      this.boundary.w * 2,
      this.boundary.h * 2
    );
    if (this.divided) {
      this.north_east.show();
      this.north_west.show();
      this.south_east.show();
      this.south_west.show();
    }
    // for (let p of this.points) {
    //   strokeWeight(2);
    //   point(p.x, p.y);
    // }
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;

    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);

    this.north_east = new QuadTree(ne, this.capacity);
    this.north_west = new QuadTree(nw, this.capacity);
    this.south_east = new QuadTree(se, this.capacity);
    this.south_west = new QuadTree(sw, this.capacity);
    this.divided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }
      if (this.north_east.insert(point)) return true;
      else if (this.north_west.insert(point)) return true;
      else if (this.south_east.insert(point)) return true;
      else if (this.south_west.insert(point)) return true;
    }
  }
}
