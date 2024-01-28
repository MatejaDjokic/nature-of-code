class Wave {
  constructor(amp, period, phase) {
    this.amp = amp;
    this.period = period;
    this.phase = phase;
  }

  eval(x) {
    return sin(this.phase + (TWO_PI * x) / this.period) * this.amp;
  }

  update(change) {
    this.phase += change;
  }
}
