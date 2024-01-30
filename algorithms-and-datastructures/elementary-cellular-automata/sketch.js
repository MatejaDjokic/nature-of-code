let cells = [];
let w = 4;
let rule_value = 246;
let rule_set;
let y = 0;

let sw = window.innerWidth;
let sh = window.innerHeight;

function setup() {
  createCanvas(window.innerWidth - 1, window.innerHeight - 1);

  rule_set = rule_value.toString(2);
  while (rule_set.length < 8) {
    rule_set = "0" + rule_set;
  }

  let total = width / w;
  for (let i = 0; i < total; i++) {
    cells[i] = 0;
    // cells[i] = floor(random(2));
  }
  cells[floor(total / 2)] = 1;
  background(255);
}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    let x = i * w;
    noStroke();
    fill(255 - cells[i] * 255);
    square(x, y, w);
  }

  y += w;

  let next_cells = [];

  let len = cells.length;
  for (let i = 0; i < cells.length; i++) {
    let left = cells[(i - 1 + len) % len];
    let right = cells[(i + 1 + len) % len];
    let state = cells[i];
    let new_state = calculate_state(left, state, right);
    next_cells[i] = new_state;
  }
  cells = next_cells;
}

function calculate_state(a, b, c) {
  let neighborhood = "" + a + b + c;
  let value = 7 - parseInt(neighborhood, 2);
  return rule_set[value];
}
