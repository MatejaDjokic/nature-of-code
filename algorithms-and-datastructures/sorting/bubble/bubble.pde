float[] values;

int padd = 0;
int speed = 100;

int i = 0;
int j = 0;

void setup() {
  size(800, 600);
  values = new float[width];
  for (int i = 0; i < values.length; i++) {
    // values[i] = random(height);
    values[i] = noise(i / 100.0) * height;
  }
}

void swap(float[] arr, int a, int b) {
  float t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
}

void draw() {
  background(0);

  for (int p = 0; p < speed; p++) {
    float a = values[j];
    float b = values[j + 1];
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
      noLoop();
    }
  }

  for (int i = 0; i < values.length; i++) {
    stroke(255);
    line(padd + i, height, padd + i, height - values[i]);
  }
}
