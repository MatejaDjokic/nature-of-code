let values;
let i = 0;
let j = 0;
let w = 5;
let states = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  quick_sort(values, 0, values.length - 1);
}

function draw() {
  background(0);

  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(255);
    if (states[i] == 0) {
      fill(255, 0, 0);
    } else if (states[i] == 1) {
      fill("##0777D");
    } else {
      fill("#D6FFB7");
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}

async function quick_sort(arr, start, end) {
  if (start >= end) return;

  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quick_sort(arr, start, index - 1),
    quick_sort(arr, index + 1, end),
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivot_index = start;
  let pivot_value = arr[end];
  states[pivot_index] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivot_value) {
      await swap(arr, i, pivot_index);
      states[pivot_index] = -1;
      pivot_index++;
      states[pivot_index] = 0;
    }
  }
  await swap(arr, pivot_index, end);

  for (let i = start; i < end; i++) {
    if (i != pivot_index) states[i] = -1;
  }

  return pivot_index;
}

async function swap(arr, a, b) {
  await sleep(0);
  let t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
