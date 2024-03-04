let points = [];

let delaunay, voronoi;

function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let i = 0; i < 1000; i++) {
    points[i] = createVector(random(width), random(height));
  }

  delaunay = calculate_delaunay(points);
  voronoi = delaunay.voronoi([0, 0, width, height]);
}

function draw() {
  background(255);

  let polygons = voronoi.cellPolygons();
  let cells = Array.from(polygons);

  draw_voronoi(cells);
  update_voronoi(cells);
  draw_points();
}

function draw_points() {
  for (let p of points) {
    stroke(0);
    strokeWeight(4);
    point(p.x, p.y);
  }
}

function draw_voronoi(cells) {
  for (let poly of cells) {
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < poly.length; i++) {
      vertex(poly[i][0], poly[i][1]);
    }
    endShape(CLOSE);
  }
}

function update_voronoi(cells) {
  let centroids = [];
  for (let poly of cells) {
    let area = 0;
    let centroid = createVector(0, 0);
    for (let i = 0; i < poly.length; i++) {
      let v0 = poly[i];
      let v1 = poly[(i + 1) % poly.length];
      let cross_value = v0[0] * v1[1] - v1[0] * v0[1];
      area += cross_value;

      centroid.x += (v0[0] + v1[0]) * cross_value;
      centroid.y += (v0[1] + v1[1]) * cross_value;
    }
    area /= 2;
    centroid.div(6 * area);
    centroids.push(centroid);
  }

  for (let i = 0; i < points.length; i++) {
    points[i].lerp(centroids[i], 0.05);
  }
  delaunay = calculate_delaunay(points);
  voronoi = delaunay.voronoi([0, 0, width, height]);
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
