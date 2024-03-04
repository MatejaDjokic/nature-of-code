const margin = 50;

let seed_points = [];

let del;

function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let i = 0; i < 75; i++) {
    seed_points[i] = createVector(
      random(width - margin),
      random(height - margin)
    );
  }

  del = calculate_delaunay(seed_points);
}

function draw() {
  background(0);

  draw_delanouy();
  draw_points();
}

function draw_delanouy() {
  noFill();
  strokeWeight(1);
  let { points, triangles } = del;
  for (let i = 0; i < triangles.length; i += 3) {
    let a = 2 * del.triangles[i];
    let b = 2 * del.triangles[i + 1];
    let c = 2 * del.triangles[i + 2];
    triangle(
      points[a],
      points[a + 1],
      points[b],
      points[b + 1],
      points[c],
      points[c + 1]
    );
  }
}

function draw_points() {
  for (let p of seed_points) {
    stroke(255);
    strokeWeight(10);
    point(p.x, p.y);
  }
}

function calculate_delaunay(points) {
  let points_arr = [];
  for (let v of points) {
    points_arr.push(v.x, v.y);
  }
  return new d3.Delaunay(points_arr);
}

function rnd_color() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return [r, g, b];
}
