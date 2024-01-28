let n = 0;
let d = 0;
let dSlider;
let step_slider;
let num = 0;
let slower = 5;

function setup() {
    createCanvas(innerWidth, innerHeight - 25);
    angleMode(DEGREES);
    step_slider = createSlider(0, .05, .005, 0.00001);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    stroke(255);

    noFill();
    beginShape();
    strokeWeight(1);
    for (let i = 0; i < 361; i++) {
        let k = i * d;
        let r = 150 * sin(n * k);
        let x = r * cos(k);
        let y = r * sin(k);
        vertex(x, y);
    }
    endShape();


    noFill();
    stroke(255, 0, 255, 255);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < 361; i++) {
        let k = i;
        let r = 150 * sin(n * k);
        let x = r * cos(k);
        let y = r * sin(k);
        vertex(x, y);
    }
    endShape();
    if (num % slower == 0) {
        n += step_slider.value();
        d += step_slider.value();
    }
    if(n > 15 || d > 15) {
    	n = 0;
	d = 0;
    }
    num += 5;    
}
