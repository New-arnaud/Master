class Star {
    // Star coordinates in 3D
    float x;
    float y;
    float z;
    float pz;

    // define a value
    Star() {
      x = random(-width, width);
      y = random(-height, height);
      z = width;
      pz = z;
    }
  }

  void update() {

    z = z - speed;
    if (z < 1) {
      z = width;
      x = random(-width, width);
      y = random(-height, height);
      pz = z;
    }
  }

  void show() {

    fill(255);
    nostroke();

    float sx = map(x / z,0,1,0,width);
    float sy = map(y / z,0,1,0,height);

    float r = map(z,0,width,16,0);
  //  ellipse(sx,sy,r,r);

    float px = map(x / pz,0,1,0,width);
    float py = map(y / pz,0,1,0,height);

    pz=z;
    stroke(255);
    line(px,py,sx,sy);

    }
  }

  // Array of stars
  Star[] stars = new Star[800];

  float speed;

  void setup() {
    size(800, 800);