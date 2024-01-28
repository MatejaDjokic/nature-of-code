document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

let cell_num = 10;
let total_bees = 5;

let grid;
let cols;
let rows;
let marked_cells;
let bee_cells;

function mk_2d_arr(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function restart_page() {
  window.location.reload();
}

function setup() {
  createCanvas(500, 500);
  let btn1 = createButton("RESTART");
  btn1.mousePressed(restart_page);

  marked_cells = [];
  bee_cells = [];

  cols = cell_num;
  rows = cell_num;
  let W = width / cell_num;

  grid = mk_2d_arr(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, W);
    }
  }

  let options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (let n = 0; n < total_bees; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    bee_cells.push(choice);
    let i = choice[0];
    let j = choice[1];
    options.splice(index, 1);
    grid[i][j].bee = true;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].count();
    }
  }
}

function try_win() {
  if (contains_all(marked_cells, bee_cells)) {
    for (let row of grid) {
      for (let cell of row) {
        cell.marked = false;
        cell.revealed = true;
      }
    }
    console.log("YOU WIN!");
  }
}

function contains_all(arr1, arr2) {
  if (arr1.length != arr2.length) return false;
  arr1.sort();
  arr2.sort();
  for (let i = 0; i < arr1.length; i++) {
    let a1 = arr1[i];
    let a2 = arr2[i];
    if (!(a1[0] == a2[0] && a1[1] == a2[1])) {
      return false;
    }
  }
  return true;
}

function game_over() {
  for (let row of grid) {
    for (let cell of row) {
      cell.marked = false;
      cell.revealed = true;
    }
  }
  console.log("YOU LOSE!");
}

function mousePressed() {
  background(255);
  stroke(255);
  for (let row of grid) {
    for (let cell of row) {
      if (cell.contains(mouseX, mouseY)) {
        if (mouseButton == "left" && !cell.marked) {
          cell.reveal();

          if (cell.bee) {
            game_over();
          }
        }
        if (mouseButton == "right") {
          cell.toggle_mark();
        }
      }
    }
  }
}

function draw() {
  background(255);
  fill(0);
  ellipse(mouseX, mouseY, 2);
  for (let row of grid) {
    for (let cell of row) {
      cell.show();
    }
  }
}
