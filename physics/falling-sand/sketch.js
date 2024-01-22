function make_2d_arr(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let cols, rows;
let summon_scale_slider;

let w = 5;
let hue_value = 0;

function within_cols(i) {
  return i >= 0 && i <= cols - 1;
}

function within_rows(j) {
  return j >= 0 && j <= rows - 1;
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 50);
  colorMode(HSB, 360, 255, 255);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make_2d_arr(cols, rows);
  summon_scale_slider = createSlider(1, 10, 0.1);
}

function mouseDragged() {
  let mouse_col = floor(mouseX / w);
  let mouse_row = floor(mouseY / w);

  let matrix = summon_scale_slider.value();
  let extend = floor(matrix / 2);
  for (let i = -extend; i <= extend; i++) {
    for (let j = -extend; j <= extend; j++) {
      if (random(1) < 0.5) {
        let col = mouse_col + i;
        let row = mouse_row + j;
        if (within_cols(col) && within_rows(row)) {
          grid[col][row] = hue_value;
        }
      }
    }
  }
  hue_value += 0.5;
  if (hue_value >= 360) hue_value = 0;
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 1) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        rect(x, y, w, w);
      }
    }
  }

  let next_grid = make_2d_arr(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state > 0) {
        let below = grid[i][j + 1];

        let dir = random([-1, 1]);

        let belowA = -1;
        let belowB = -1;
        if (within_cols(i + dir)) {
          belowA = grid[i + dir][j + 1];
        }
        if (within_cols(i - dir)) {
          belowB = grid[i - dir][j + 1];
        }

        if (j == rows - 1) {
          next_grid[i][j] = state;
        } else if (below === 0) {
          next_grid[i][j + 1] = state;
        } else if (belowA === 0) {
          next_grid[i + dir][j + 1] = state;
        } else if (belowB === 0) {
          next_grid[i - dir][j + 1] = state;
        } else {
          next_grid[i][j] = state;
        }
      }
    }
  }
  grid = next_grid;
}
