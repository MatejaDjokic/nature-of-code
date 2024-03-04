class Box {
  PVector pos;
  float r;
  
  Box(float x, float y, float z, float _r) {
    pos = new PVector(x, y, z);
    r = _r;
  }
  
  ArrayList<Box> generate() {
    ArrayList<Box> boxes = new ArrayList<Box>();
    for(int x = -1; x <= 1; x++) {
      for(int y = -1; y <= 1; y++) {
        for(int z = -1; z <= 1; z++) {
          int sum = abs(x) + abs(y) + abs(z);
        
          if(sum > 1) {
            float new_r = r / 3;
            float new_x = pos.x + x * new_r;
            float new_y = pos.y + y * new_r;
            float new_z = pos.z + z * new_r;
            Box b = new Box(new_x, new_y, new_z, new_r);
            boxes.add(b);
          }
        }
      }
    }
    return boxes;
  }
  
  void show() {
    pushMatrix();
    translate(pos.x, pos.y, pos.z);
    fill(255);
    noStroke();
    box(r);
    popMatrix();
  }
}
