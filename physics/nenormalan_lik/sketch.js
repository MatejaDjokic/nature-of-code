const txt = ".\PHYSICS\NENORMALAN LIK";

function setup() {
  createCanvas(innerWidth, innerHeight);
}

let count = 0;
let i = 0;
let display_text = "";

function draw() {
  background(0);
  fill(255);
  stroke(255);
  textAlign(CENTER);
  textSize(40);
  text(display_text, width / 2, height / 2);

  if (count % 10 == 0) {
    if (i < txt.length) {
      display_text += txt[i];
      i++;
    } else {
      i = 0;
      sleep(1000);
      display_text = "";
    }
  }
  count++;
}

function sleep(ms) {
  clearInterval(sleepSetTimeout_ctrl);
  return new Promise(
    (resolve) => (sleepSetTimeout_ctrl = setTimeout(resolve, ms))
  );
}

