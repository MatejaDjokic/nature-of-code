let values;
let i = 0;
let j = 0;
let w = 2;
function setup() {
  createCanvas(innerWidth, innerHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
  }
  quick_sort(values, 0, values.length - 1);
}
async function quick_sort(arr, start, end) {
  if (start >= end) return;

  let index = await partition(arr, start, end);

  await Promise.all([
    quick_sort(arr, start, index - 1),
    quick_sort(arr, index + 1, end),
  ]);
}
async function partition(arr, start, end) {
  let pivot_index = start;
  let pivot_value = arr[end];
  for (let i = start; i < end; i++) {
    if (arr[i] < pivot_value) {
      await swap(arr, i, pivot_index);
      pivot_index++;
    }
  }
  await swap(arr, pivot_index, end);
  return pivot_index;
}
function draw() {
  background(0);

  for (let i = 0; i < values.length; i++) {
    stroke(255);
    rect(i * w, height - values[i], w, values[i]);
  }
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
