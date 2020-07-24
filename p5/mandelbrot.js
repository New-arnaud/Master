function setup() {

    createCanvas(640,480,WEBGL);
  }

function draw() {

    background(0);
    textSize(32);
    textAlign(CENTER);
    color(75,75,75);
    //let digits = 2;
    //let c = 0.25;
    //let e = 1.0 / Math.pow(100,digits-1);
    //c=c+e;
    //let z = 0;
    //let iterations=0;
    //while(z < 2){
    //z = z * z + c;
    //iterations++;
    text(iterations, width/2, height/2);
  }