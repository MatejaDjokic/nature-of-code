let values;
let w = 2;
let padd = 0;
let speed = 100;
let i = 0;
let j = 0;
function setup() {
  createCanvas(innerWidth, innerHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    // values[i] = random(height);
    values[i] = random(height);
  }
}

function swap(arr, a, b) {
  let t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
}

function draw() {
  background(0);

  for (let p = 0; p < speed; p++) {
    let a = values[j];
    let b = values[j + 1];
    if (a > b) {
      swap(values, j, j + 1);
    }

    if (i < values.length) {
      j++;
      if (j >= values.length - i - 1) {
        j = 0;
        i++;
      }
    } else {
      console.log("finished");
      noLoop();
    }
  }

  for (let i = 0; i < values.length; i++) {
    stroke(255);
    rect(i * w, height - values[i], w, values[i]);    
  }
}
