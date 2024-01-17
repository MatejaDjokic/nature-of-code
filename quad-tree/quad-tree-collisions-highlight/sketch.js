let particles = [];

function setup() {
  createCanvas(600, 400);

  for (let i = 0; i < 5000; i++) {
    let rnd_w = random(width);
    let rnd_h = random(height);
    particles[i] = new Particle(rnd_w, rnd_h);
  }
}

function draw() {
  background(0);

  let boundary = new Rectangle(300, 200, 600, 400);
  qtree = new QuadTree(boundary, 4);

  for (let p of particles) {
    let point = new Point(p.x, p.y, p);
    qtree.insert(point);

    p.move();
    p.render();
    p.set_highlight(false);
  }

  for (let p of particles) {
    let range = new Circle(p.x, p.y, p.r * 2);
    let points = qtree.query(range);

    for (let point of points) {
      let other = point.user_data;

      if (p !== other && p.intersects(other)) {
        p.set_highlight(true);
      }
    }
  }
}
