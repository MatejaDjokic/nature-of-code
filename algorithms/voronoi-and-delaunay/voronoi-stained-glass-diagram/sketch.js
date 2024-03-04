let seed_points = [];
let colors = [];

let del;

function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let i = 0; i < 100; i++) {
    seed_points[i] = createVector(random(width), random(height));
  }

  del = calculate_delaunay(seed_points);
  for (let i = 0; i < 100; i++) {
    colors.push(rnd_color());
  }
}

function draw() {
  background(255);
  draw_voronoi();
  // draw_points();
}

function draw_points() {
  for (let p of seed_points) {
    stroke(0);
    strokeWeight(10);
    point(p.x, p.y);
  }
}

function draw_voronoi() {
  let voronoi = del.voronoi([0, 0, width, height]);
  let polygons = voronoi.cellPolygons();
  let index = 0;
  for (let poly of polygons) {
    noStroke();
    stroke(0);
    strokeWeight(1);
    c = [colors[index][0], colors[index][1], colors[index][2]];
    fill(c);
    beginShape();
    for (let i = 0; i < poly.length; i++) {
      vertex(poly[i][0], poly[i][1]);
    }
    endShape(CLOSE);
    index++;
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
