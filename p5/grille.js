let x=0;
let y=0;
let z=0;

function setup() {
    createCanvas(640,480,WEBGL);
}

function draw() {
  background(0);
  abscisses();
  stroke(0,255,0);
  rotateX(millis() / 1000);
  rotateY(millis() / 1000);
  translate(width / 4, height / 16);
  translate(p5.Vector.fromAngle(millis() / 1000, 40));
  sphere(40);
}

function abscisses() {
    /* Définiton des limites du canvas */
    var angle=45;
    let maxX=width;
    let maxY=height;
    let maxZ=width*cos(angle);
    let unite=20;
    let marque=5;
  color('white');
  stroke(255,255,255);
  strokeWeight(2);
  /* abscisse y>0 */
  line(x,y,x,-maxY);
  /* abscisse x<0 */
  line(x,y,-maxX,y);
  /* abscisse x>0 */
  line(x,y,maxX,y);
  /* abscisse y<0 */
  line(x,y,x,maxY);
  /* abscisse z>0 */
  line(x,y,maxZ*cos(angle),maxZ);
  /* abscisse z<0 */
  line(x,y,-maxZ*cos(angle),-maxZ);
  /* Mise en place des graduations sur chacun des axes */
  stroke(255, 204, 0);
  for (i=-maxX;i<maxX;i+=unite) {
      line(i,y-marque,i,y+marque);
  }
  for (j=-maxY;j<maxY;j+=unite) {
      line(x-marque,j,x+marque,j);
  }
    for (k=-maxZ;k<maxZ;k+=unite) {
      line(k*cos(angle)-marque,k,k*cos(angle)+marque,k);
  }

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
}