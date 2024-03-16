class Complex {
  constructor(real, imaginary) {
    this.real = real;
    this.img = imaginary;
  }

  add(other) {
    return new Complex(this.real + other.real, this.img + other.img);
  }

  sub(other) {
    return new Complex(this.real - other.real, this.img - other.img);
  }

  scale(value) {
    return new Complex(this.real * value, this.img * value);
  }

  mul(other) {
    let real = this.real * other.real - this.img * other.img;
    let img = this.real * other.img + other.real * this.img;
    return new Complex(real, img);
  }

  sqrt() {
    let r = sqrt(this.real * this.real + this.img * this.img);
    let theta = atan2(this.img, this.real);

    // s = sqrt(z) -> the square root of the complex number z
    // s = sqrt(r) * (cos(theta / 2) + isin(theta / 2));
    // s = sqrt(r) * cos(theta / 2) + i * sqrt(r) * sin(theta / 2)
    // R(s) = sqrt(r) * cos(theta / 2) -> real part of the complex number s
    // I(s) = sqrt(r) * sin(theta / 2) -> imaginary part of the complex number s

    let real = sqrt(r) * cos(theta / 2);
    let img = sqrt(r) * sin(theta / 2);

    return new Complex(real, img);
  }
}
