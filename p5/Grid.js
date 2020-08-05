function setup() {
  createCanvas(740, 480,WEBGL);
}

function draw() {
  background(0);
  stroke(255);
  rotateX(millis()/1000);
  rotateY(millis()/1000);
  grid();
}

function grid() {
  let space = 10;
  space = space + (space * cos(space)-space * sin(space));
  console.log(space);
  point(space,space);
  point(space*2,space);
  point(space*3,space);
  point(space*4,space);
  point(space*5,space);
  point(space*6,space);
  point(space*7,space);
  point(space*8,space);
  point(space*9,space);
  point(space*10,space);

  point(space,space*2);
  point(space,space*3);
  point(space,space*4);
  point(space,space*5);
  point(space,space*6);
  point(space,space*7);
  point(space,space*8);
  point(space,space*9);
  point(space,space*10);

  point(space*2,space*2);
  point(space*2,space*3);
  point(space*2,space*4);
  point(space*2,space*5);
  point(space*2,space*6);
  point(space*2,space*7);
  point(space*2,space*8);
  point(space*2,space*9);
  point(space*2,space*10);

  point(space*3,space*2);
  point(space*3,space*3);
  point(space*3,space*4);
  point(space*3,space*5);
  point(space*3,space*6);
  point(space*3,space*7);
  point(space*3,space*8);
  point(space*3,space*9);
  point(space*3,space*10);

  point(space*4,space*2);
  point(space*4,space*3);
  point(space*4,space*4);
  point(space*4,space*5);
  point(space*4,space*6);
  point(space*4,space*7);
  point(space*4,space*8);
  point(space*4,space*9);
  point(space*4,space*10);

  point(space*5,space*2);
  point(space*5,space*3);
  point(space*5,space*4);
  point(space*5,space*5);
  point(space*5,space*6);
  point(space*5,space*7);
  point(space*5,space*8);
  point(space*5,space*9);
  point(space*5,space*10);

  point(space*6,space*2);
  point(space*6,space*3);
  point(space*6,space*4);
  point(space*6,space*5);
  point(space*6,space*6);
  point(space*6,space*7);
  point(space*6,space*8);
  point(space*6,space*9);
  point(space*6,space*10);

  point(space*7,space*2);
  point(space*7,space*3);
  point(space*7,space*4);
  point(space*7,space*5);
  point(space*7,space*6);
  point(space*7,space*7);
  point(space*7,space*8);
  point(space*7,space*9);
  point(space*7,space*10);

  point(space*8,space*2);
  point(space*8,space*3);
  point(space*8,space*4);
  point(space*8,space*5);
  point(space*8,space*6);
  point(space*8,space*7);
  point(space*8,space*8);
  point(space*8,space*9);
  point(space*8,space*10);

  point(space*9,space*2);
  point(space*9,space*3);
  point(space*9,space*4);
  point(space*9,space*5);
  point(space*9,space*6);
  point(space*9,space*7);
  point(space*9,space*8);
  point(space*9,space*9);
  point(space*9,space*10);

  point(space*10,space*2);
  point(space*10,space*3);
  point(space*10,space*4);
  point(space*10,space*5);
  point(space*10,space*6);
  point(space*10,space*7);
  point(space*10,space*8);
  point(space*10,space*9);
  point(space*10,space*10);
}