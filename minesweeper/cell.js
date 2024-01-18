class Cell {
  constructor(i, j, w, mine) {
    this.i = i;
    this.j = j;
    this.w = w;

    this.x = i * w;
    this.y = j * w;

    this.neighbour_count = 0;

    this.bee = false;
    this.revealed = false;
    this.marked = false;
  }

  show() {
    stroke(0);
    fill(255);
    rect(this.x, this.y, this.w, this.w);

    if (this.marked) {
      fill(200);
      rect(this.x, this.y, this.w, this.w);
      stroke(255, 0, 0);
      let offset = 5;
      line(
        this.x + offset,
        this.y + offset,
        this.x + this.w - offset,
        this.y + this.w - offset
      );
      line(
        this.x + this.w - offset,
        this.y + offset,
        this.x + offset,
        this.y + this.w - offset
      );
    } else if (this.revealed) {
      if (this.bee) {
        stroke(0);
        fill(200);
        ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
      } else {
        stroke(0);
        fill(200);
        rect(this.x, this.y, this.w, this.w);
        if (this.neighbour_count > 0) {
          textAlign(CENTER);
          fill(0);
          text(
            this.neighbour_count,
            this.x + this.w * 0.5,
            this.y + this.w - 6
          );
        }
      }
    }
  }

  toggle_mark() {
    if (!this.revealed) {
      console.clear();
      this.marked = !this.marked;
      if (this.marked) {
        marked_cells.push([this.i, this.j]);
      } else {
        const index = marked_cells.indexOf([this.i, this.j]);
        marked_cells.splice(index, 1);
      }
      try_win();
    }
  }

  count() {
    if (this.bee) {
      this.neighbour_count = -1;
    } else {
      let total = 0;
      for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
          let i = this.i + xoff;
          let j = this.j + yoff;
          if (i > -1 && i < cols && j > -1 && j < rows) {
            let neighbour = grid[i][j];
            if (neighbour.bee) {
              total++;
            }
          }
        }
      }
      this.neighbour_count = total;
    }
  }

  contains(x, y) {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  }

  reveal() {
    this.revealed = true;
    if (this.neighbour_count == 0) {
      this.flood_fill();
    }
  }

  flood_fill() {
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let i = this.i + xoff;
        let j = this.j + yoff;
        if (i > -1 && i < cols && j > -1 && j < rows) {
          let neighbour = grid[i][j];
          if (!this.bee && !neighbour.revealed) {
            neighbour.reveal();
          }
        }
      }
    }
  }
}
