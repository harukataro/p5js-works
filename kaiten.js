// imspired by https://twitter.com/yuruyurau/status/1226843640040812546

let size = 500;
let num = 150;
let speed = 0.03;
let bgColor = 30;
let x = 0;
let y = 0;
let t = 0;
let v = 1.5;

function setup() {
  createCanvas(size, size);
  noStroke();
}

function draw() {
  background(bgColor);
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      fx(i, j);
    }
  }
  t += speed;
}

function fx(i, j) {
  let un = sin(i + y) + v * sin(i + x) ;
  let va = cos(i + y) + v * cos(i + x) ;
  x = un+t;
  y = va;
  let c = color(random(10, 255), random(10, 255), random(10, 255));
  fill(c);
  circle(un * num/2 + size/2, y * num/2 + size/2, cos(j));
}
