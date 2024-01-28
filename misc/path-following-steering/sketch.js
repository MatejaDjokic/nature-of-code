
/// Steering Behavior

let vehicle;
let path;

function setup() {
  createCanvas(windowWidth, windowHeight);
  vehicle = new Vehicle(100, 100);
  vehicle.vel.x = 2;
  path = new Path(0, 200, windowWidth, 200); 
}

function draw() {
  background(0); 

  path.end.y = mouseY;

  let force = vehicle.follow(path); 
  vehicle.applyForce(force);

  vehicle.edges();
  vehicle.update();
  vehicle.show();

  path.show();
}