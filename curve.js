let t = 0;
let dt = 0.1;
let a = 100;
let b = 120;
let c = 5;
let d = 7;
let finished = false;

function setup() {
  createCanvas(400, 400);
  background(0);
  stroke(255);
  noFill();
}

function draw() {
  if (t < TWO_PI) {
    let x = a * sin(c * t);
    let y = b * sin(d * t);
    point(width/2 + x, height/2 + y);
    t += dt;
  } else if (!finished) {
    a += 50;
    //clear();
    t = 0;
    drawLissajous();
    finished = true;
  }
}

function drawLissajous() {
  for (let i = 0; i < TWO_PI; i += 0.01) {
    let x = a * sin(c * i);
    let y = b * sin(d * i);
    point(width/2 + x, height/2 + y);
  }
}

