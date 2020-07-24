/**
 * This example can be found in the Processing examples package
 * that comes with the Processing PDE.
 * Processing > Examples > Topics > Interaction > Follow3
 * Based on code from Keith Peters.
 */

var x = [20];
var y = [20];
segLength = 18;

function dragSegment(i,xin,yin) {
    dx = xin - x[i];
    dy = yin - y[i];
    angle = atan2(dy, dx);
    x[i] = xin - cos(angle) * segLength;
    y[i] = yin - sin(angle) * segLength;
    segment(x[i], y[i], angle);
  }

  function segment(x, y, a) {
    pushMatrix();
    translate(x, y);
    rotate(a);
    line(0, 0, segLength, 0);
    popMatrix();
  }

function setup() {
  createcanvas(760, 680);
  strokeWeight(9);
  stroke(255, 100);

  for(i = 0; i <= x.length; i++) {
    x[i] = random(0,20);
    y[i] = random(0,20);
  }
}

function draw() {
  background(0);
  dragSegment(0, mouseX, mouseY);
  for(i = 0; i < x.length-1; i++) {
    dragSegment(i+1, x[i], y[i]);
  }
}