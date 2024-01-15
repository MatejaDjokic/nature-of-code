let qtree;
let w = 400;
let h = 400;

function setup() {
  createCanvas(w, h);

  let boundary = new Rectangle(w / 2, h / 2, w / 2, h / 2);
  qtree = new QuadTree(boundary, 1);
}

function draw() {
  if (mouseIsPressed) {
    for (let i = 0; i < 5; i++) {
      let m = new Point(mouseX + random(-5, 5), mouseY + random(-5, 5));
      qtree.insert(m);
    }
  }

  background(0);
  qtree.show();
}
