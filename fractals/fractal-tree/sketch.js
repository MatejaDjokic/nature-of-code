function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(0);

    stroke(255);
    strokeWeight(4);

    translate(width / 2, height);

    branch(265);
}

function branch(len) {
    const angle = map(mouseX, 0, width, 0, TWO_PI);

    if (len < 2) return;
    line(0, 0, 0, -len);
    translate(0, -len);

    push();
    rotate(angle);
    branch(len * .67);
    pop();

    push();
    rotate(-angle);
    branch(len * .67);
    pop();
}
