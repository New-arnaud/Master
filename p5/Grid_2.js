var resX=740;
var resY=480;

function setup() {
  createCanvas(resX, resY,WEBGL);
  frameRate(1)
}

function draw() {

  background(0);
  colorMode(RGB,255);
  fill;
  strokeWeight(10);
  /*rotate(millis() / 1000);*/
  rotateX(45);
  /*rotateY(millis()/1000);
  */
  grid();
}

function grid() {

  let originX = -1*(resX/2);
  let originY = -1*(resY/2);
  let space = 10+10;
  let maxgridX = resX-space*15/*windowWidth*/;
  let maxgridY = resY/*windowHeight*/;
  let i = 0;
  let j = 0;

for (i = originX; i < maxgridX ; i += space) {

  for (j = originY; j < maxgridY ; j+= space) {
    let z = random(0,50)
    if (z<10) {
      cl=50;
    } else if (z>20) {
      cl=255;
      } else {
      cl=150;
    }
    stroke(0,cl,0);
    point(i,j,z);
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