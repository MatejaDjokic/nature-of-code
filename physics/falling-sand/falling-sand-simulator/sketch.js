let grid;
let w = 10;

function setup() {
  createCanvas(400, 400);
  grid = new Grid(400, 400);
}
/*
function draw() {
  background(220);

  grid.data.forEach((color, index) => {
    setPixel(p, index, color || background);
  });
}

function mousePressed() {
  let x = floor(mouseX / width);
  let y = floor(mouseY / height);

  let color = veryColor(grid.grid[x * 400 + y], SAND_COLOR);
  grid.set(x, y, color);
}

function varyColor(p, color) {
  let hue = p.floor(p.hue(color));
  let saturation = p.saturation(color) + p.floor(p.random(-20, 0));
  saturation = p.constrain(saturation, 0, 100);
  let lightness = p.lightness(color) + p.floor(p.random(-10, 10));
  lightness = p.constrain(lightness, 0, 100);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
*/
