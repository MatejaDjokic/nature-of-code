const offset = 30;

let auto_mode, set15, set30, set45, set60, set90, set150;
let M, N, O;
let auto;

let to_radians = (degrees) => degrees * (Math.PI / 180);
let to_degrees = (radians) => radians * (180 / Math.PI);

function setup() {
  createCanvas(innerWidth, innerHeight - 25);
  M = createVector(width / 2 + 100, height / 2 - 100);
  O = createVector(width / 2, height / 2);
  N = createVector(width / 2 + 100, height / 2);

  auto = false;

  auto_mode = get_auto_mode_btn();
  set15 = get_angle_button(15);
  set30 = get_angle_button(30);
  set45 = get_angle_button(45);
  set60 = get_angle_button(60);
  set90 = get_angle_button(90);
}

function keyPressed() {
  if (keyCode === 32) {
    swith_auto_mode();
  }
}

function draw() {
  background(0);
  draw_coord_sys();
  draw_mouse_pos();
  draw_mouse_projection();
  draw_vec();
  draw_center();
  draw_angle_value();
  draw_quadrant();
  draw_angle();
}

function draw_angle() {
  stroke(255);
  strokeWeight(1);
  fill(255);

  push();
  noFill();
  strokeWeight(2);
  stroke(255);
  translate(width / 2, height / 2);
  let sed = get_angles(calculate_angle());
  if (sed[2]) arc(0, 0, 100, 100, to_radians(sed[0]), to_radians(sed[1]));
  pop();
}

function get_angles(theta) {
  let cx = width / 2;
  let cy = height / 2;
  if (M.y < cy && M.x > cx) return [-theta, 0, true];
  else if (M.y < cy && M.x < cx) return [180, 180 + theta, true];
  else if (M.y > cy && M.x < cx) return [180 - theta, 180, true];
  else if (M.y > cy && M.x > cx) return [0, theta, true];
  else return [0, 0, false];
}

function draw_quadrant() {
  stroke(255);
  strokeWeight(1);
  textSize(30);
  fill(255);

  let quadrant = get_quadrant();
  text("Q: " + quadrant, offset, offset + 15);
}

function get_quadrant() {
  let cx = width / 2;
  let cy = height / 2;
  let q = 0;
  if (M.x > cx && M.y > cy) q = 1;
  else if (M.x < cx && M.y > cy) q = 2;
  else if (M.x < cx && M.y < cy) q = 3;
  else if (M.x > cx && M.y < cy) q = 4;

  return q == 0 ? "Line" : 5 - q;
}

function get_angle_button(angle) {
  let btn = createButton(angle + "°");
  btn.mousePressed(() => {
    let cx = width / 2;
    let cy = height / 2;
    let x = cx + 100;
    let y = cy - 100 * Math.tan((angle * Math.PI) / 180);
    M = createVector(x, y);
    N = createVector(x, cy);
  });
  return btn;
}

function calculate_angle() {
  let NM = Math.sqrt(Math.pow(M.x - N.x, 2) + Math.pow(M.y - N.y, 2));
  let NO = Math.sqrt(Math.pow(O.x - N.x, 2) + Math.pow(O.y - N.y, 2));
  let tan_theta = Math.atan(NO / NM);
  return 90 - to_degrees(tan_theta);
}

function draw_angle_value() {
  stroke(255);
  strokeWeight(1);
  fill(255);
  textSize(30);

  let theta = Math.round(calculate_angle() * 100) / 100;
  let x = offset;
  let y = height - offset;
  text("θ: " + theta + "°", x, y);
}

function draw_mouse_projection() {
  stroke(255);
  strokeWeight(2);

  if (auto && on_screen(M.x, height / 2)) {
    N = createVector(M.x, height / 2);
  }
  text("N", N.x - 10, N.y + 35);

  stroke(255, 0, 0);
  strokeWeight(4);
  point(N.x, N.y);
}

function draw_center() {
  stroke(255, 0, 0);
  strokeWeight(4);

  let cx = width / 2;
  let cy = height / 2;
  point(cx, cy);
}

function draw_coord_sys() {
  stroke(255);
  strokeWeight(2);

  let mid_x = width / 2;
  let mid_y = height / 2;
  line(mid_x, 0, mid_x, height);
  line(0, mid_y, width, mid_y);
}

function on_screen(x, y) {
  return x < width && y < height && x > 0 && height > 0;
}

function draw_mouse_pos() {
  stroke(255, 0, 0);
  strokeWeight(4);

  if (auto && on_screen(mouseX, mouseY)) {
    M = createVector(mouseX, mouseY);
  }
  point(M.x, M.y);

  stroke(255);
  strokeWeight(2);
  textSize(30);

  let offy;
  if (M.y >= height / 2) {
    offy = 35;
  } else {
    offy = -20;
  }

  text("M", M.x - 10, M.y + offy);
}

function draw_vec() {
  stroke(0, 0, 255);
  strokeWeight(2);

  let cx = width / 2;
  let cy = height / 2;
  line(cx, cy, M.x, M.y);
}

function get_auto_mode_btn() {
  let btn = createButton("Auto Mode");
  btn.addClass("red");
  btn.mousePressed(() => {
    swith_auto_mode();
  });
  return btn;
}

function swith_auto_mode() {
  if (auto_mode.hasClass("red")) {
    auto_mode.removeClass("red");
    auto_mode.addClass("green");
  } else if (auto_mode.hasClass("green")) {
    auto_mode.removeClass("green");
    auto_mode.addClass("red");
  }
  auto = !auto;
}
