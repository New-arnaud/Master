/* Raycast */
let R=20;
let Origin=0;
let spawn;
let target;

function setup(){

    createCanvas(400,400, WEBGL);
}

function draw(){

    spawn=createVector(random(-200,200)+R,random(-200,200)+R);
    /* Place a user in the canvas represented by a blue circle */
    background(0);
    strokeWeight(0);
    stroke(0,0,255);
    fill(0,0,255);
    circle(spawn.x,spawn.y,R);
    /* Place a target randomly in the canvas represented by a red circle */
    stroke(255,0,0);
    fill(255,0,0);
    target=createVector(random(-200,200),random(-200,200));
    circle(target.x,target.y,R);
    /* Trace a line between user and target */
    let distance;
    distance= createVector(spawn.x-target.x,spawn.y-target.y);
    console.log(distance.x,distance.y);
    stroke(255,255,255);
    strokeWeight(1);
    line(spawn.x,spawn.y,target.x,target.y);
    /*
    let dx=spawn.x-target.x;
    let dy=spawn.y-target.y;
    let step=dx/dy;
    let Y=0
    for (l=spawn.x;l<target.x;l+step)
    {
        strokeWeight(1);
        stroke(255);
        point(l, spawn.y+Y);
        Y++;
    }*/
    noLoop();
}
    /*
    for(x=spawn.x;x<distance.x;x++)
      {
        for(y=spawn.y;y<distance.y;y++)
          {
        point(x,y);
        }
      }*/

/* function Norm(xA,yA,xB,yB) {return Math.sqrt(Math.pow(xB-xA,2)+Math.pow(yB-yA,2));}

function DashedLine(xA,yA,xB,yB,L,l) {
 Nhatch=Norm(xA,yA,xB,yB)/(L+l);
 x1=xA;y1=yA;
 for (i=0;i < Nhatch; i++) {
  newXY=Hatch(xA,yA,xB,yB,x1,y1,L);
  x2=newXY[0];y2=newXY[1];
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  newXY=Hatch(xA,yA,xB,yB,x2,y2,l);
  x1=newXY[0];
  y1=newXY[1];
 }
}

function Hatch(xA,yA,xB,yB,x1,y1,l) {
 a=(yB-yA)/(xB-xA);b=yA-a*xA;// Equation reduite y=ax+b de (AB):
 if ((xB-xA)>0) {sgn=1;} else {sgn=-1;}
 x2=sgn*l/Math.sqrt(1+a*a)+x1;
 y2=a*x2+b;
 if (Norm(x1,y1,x2,y2)>Norm(x1,y1,xB,yB)) {x2=xB;y2=yB;}
 return [x2,y2];
}*/