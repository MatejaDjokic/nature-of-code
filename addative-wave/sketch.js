class Wave {
    constructor(amp, period, phase) {
        this.amp = amp;
        this.period = period;
        this.phase = phase;
    }

    eval(x) {
        return sin(this.phase + TWO_PI * x / this.period) * this.amp;
    }

    update() {
        this.phase += .05;
    }
}

const N = 5;

let waves = [];

function setup() {
    createCanvas(innerWidth, innerHeight);
    for (let i = 0; i < N; i++) {
        waves[i] = new Wave(
            random(20, 60),
            random(100, 600),
            random(0, TWO_PI)
        );
    }
}

function draw() {
    background(0);



    for (let x = 0; x < width; x += 10) {
        let y = 0;
        for (let wave of waves) {
            y += wave.eval(x);

        }

        noStroke();
        fill(map(x, 0, width, 1, 255), map(x, 0, width, 1, 20), map(x, 0, width, 1, 125));
        ellipse(x, y + height / 2, 16);
    }

    for (let wave of waves) {
        wave.update();
    }
}