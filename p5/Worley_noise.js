Pvector[] points = new Pvector[7];

function setup() {
    createCanvas(400,400,WEBGL);
    background(0);
    for (i=0; i<points.length; i++) {
        points[i] = new Pvector(random(width),random(height));
    }
}

function draw() {

    loadPixels();
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
             distances = new [points.length]
            for (i=0; i<points.length;i++){
                d = dist(x,y,points[i].x,points[i].y);
            }

            index = x + y * width;
            pixels[index] = color(random(255));
        }
    }
    updatePixels();
    for (Pvector v:points) {
        stroke(0,255,0);
        strokeWeight(8);
        point(v.x,v.y);
   }
}