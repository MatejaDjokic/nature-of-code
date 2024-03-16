let all_circles, queue;

const epsilon = 0.1;

function setup() {
  createCanvas(800, 800);

  let c1 = new Circle(-1 / 400, 400, 400);

  let r2 = random(100, c1.radius / 2);

  let v = p5.Vector.fromAngle(random(TWO_PI));
  v.setMag(c1.radius - r2);
  let c2 = new Circle(1 / r2, 400 + v.x, 400 + v.y);

  let r3 = v.mag();
  v.rotate(PI);
  v.setMag(c1.radius - r3);
  let c3 = new Circle(1 / r3, 400 + v.x, 400 + v.y);

  all_circles = [c1, c2, c3];
  queue = [[c1, c2, c3]];
}

function validate(c4, c1, c2, c3) {
  if (c4.radius < 2) return false;

  for (let other of all_circles) {
    let d = c4.dist(other);
    let radiusDiff = abs(c4.radius - other.radius);

    if (d < epsilon && radiusDiff < epsilon) {
      return false;
    }
  }

  if (!is_tangent(c4, c1)) return false;
  if (!is_tangent(c4, c2)) return false;
  if (!is_tangent(c4, c3)) return false;

  return true;
}

function is_tangent(c1, c2) {
  let d = c1.dist(c2);
  let r1 = c1.radius;
  let r2 = c2.radius;

  let a = abs(d - (r1 + r2)) < epsilon;
  let b = abs(d - abs(r2 - r1)) < epsilon;

  return a || b;
}

function next_generation() {
  let next_queue = [];
  for (let triplet of queue) {
    let [c1, c2, c3] = triplet;
    let k4 = descartes(c1, c2, c3);

    let new_circles = complex_descartes(c1, c2, c3, k4);

    for (let new_circle of new_circles) {
      if (validate(new_circle, c1, c2, c3)) {
        all_circles.push(new_circle);
        let t1 = [c1, c2, new_circle];
        let t2 = [c1, new_circle, c3];
        let t3 = [new_circle, c2, c3];
        next_queue = next_queue.concat([t1, t2, t3]);
      }
    }
  }
  queue = next_queue;
}

function draw() {
  background(0);

  let len1 = all_circles.length;
  next_generation();
  let len2 = all_circles.length;

  if (len1 == len2) {
    console.log("done");
    noLoop();
  }

  for (let c of all_circles) {
    c.show();
  }
}

function descartes(c1, c2, c3) {
  let k1 = c1.bend;
  let k2 = c2.bend;
  let k3 = c3.bend;

  let sum = k1 + k2 + k3;
  let product = abs(k1 * k2 + k2 * k3 + k1 * k3);
  let root = 2 * sqrt(product);
  return [sum + root, sum - root];
}

function complex_descartes(c1, c2, c3, k4) {
  let k1 = c1.bend;
  let k2 = c2.bend;
  let k3 = c3.bend;

  let z1 = c1.center;
  let z2 = c2.center;
  let z3 = c3.center;

  let zk1 = z1.scale(k1);
  let zk2 = z2.scale(k2);
  let zk3 = z3.scale(k3);

  let sum = zk1.add(zk2).add(zk3);

  let root = zk1.mul(zk2).add(zk2.mul(zk3)).add(zk1.mul(zk3));
  root = root.sqrt().scale(2);

  let center1 = sum.add(root).scale(1 / k4[0]);
  let center2 = sum.sub(root).scale(1 / k4[0]);
  let center3 = sum.add(root).scale(1 / k4[1]);
  let center4 = sum.sub(root).scale(1 / k4[1]);

  return [
    new Circle(k4[0], center1.real, center1.img),
    new Circle(k4[0], center2.real, center2.img),
    new Circle(k4[1], center3.real, center3.img),
    new Circle(k4[1], center4.real, center4.img),
  ];
}
