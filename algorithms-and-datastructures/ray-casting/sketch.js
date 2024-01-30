// Ray Casting

let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 1000;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < 5; i++) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);

    walls[i] = new Wall(x1, y1, x2, y2);
  }

  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(width, 0, width, height));
  walls.push(new Wall(width, height, 0, height));
  walls.push(new Wall(0, 0, height, 0));
  ray = new Ray(100, 200);
  particle = new Particle();
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }
  // particle.update(noise(xoff) * width, noise(yoff) * height);
  particle.update(mouseX, mouseY);	  
  particle.show();
  particle.look(walls);

  xoff += 0.01;
  yoff += 0.01;
  // ray.show();
  // ray.lookAt(mouseX, mouseY)

  // let pt = ray.cast(wall);
  // if (pt) {
  //     fill(255);
  //     ellipse(pt.x, pt.y, 8, 8);
  // } else {
  //     console.log("Nema");
  // }
}
