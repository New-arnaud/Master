function setup() {

  var resX=740;
  var resY=480;
  createCanvas(resX, resY);
}

function draw() {

  background(0);
  stroke(255);
  strokeWeight(4);
  rotate(millis() / 1000);

  /*
  rotateX(millis()/1000);
  rotateY(millis()/1000);
  */
  grid();
}

function grid() {

  let originX = 0;
  let originY = 0;
  let space = 10+0;
  let maxgridX = windowWidth;
  let maxgridY = windowHeight;
  let i = 0;
  let j = 0;

for (i = originX; i < maxgridX ; i += space) {

  for (j = originY; j < maxgridY ; j+= space) {
    point(i,j);
  }
}
}
/*
Here's a very general answer. Say the camera's at (Xc, Yc, Zc) and the point you want to project is P = (X, Y, Z). The distance from the camera to the 2D plane onto which you are projecting is F (so the equation of the plane is Z-Zc=F). The 2D coordinates of P projected onto the plane are (X', Y').
Then, very simply:
X' = ((X - Xc) * (F/Z)) + Xc
Y' = ((Y - Yc) * (F/Z)) + Yc
If your camera is the origin, then this simplifies to:
X' = X * (F/Z)
Y' = Y * (F/Z)
*/