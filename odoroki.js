let angle = 0;
let radius = 100;
let speed = 0.05;

function setup() {
  createCanvas(400, 400);
  strokeWeight(2);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);

  for (let i = 0; i < TWO_PI; i += PI / 4) {
    let x = cos(angle + i) * radius;
    let y = sin(angle + i) * radius;
    stroke(map(x, -radius, radius, 0, 255), map(y, -radius, radius, 0, 255), 255);
    line(0, 0, x, y);
  }

  angle += speed;
}
