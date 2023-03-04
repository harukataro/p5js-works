let margin, diameter, x, y, radius, angle, count, points, latestPrime;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100);
  margin = width * 0.1;
  diameter = width - 2 * margin;
  x = width / 2;
  y = height / 2;
  radius = 0;
  angle = 0;
  count = 1;
  latestPrime = 0;
  points = [];
  while (count <= 5000) {
    let xPos = x + radius * cos(angle);
    let yPos = y + radius * sin(angle);
    let isPrime = checkPrime(count);
    if (isPrime) {
      latestPrime = count;
    }
    points.push({x: xPos, y: yPos, isPrime: isPrime});
    radius += 0.1;
    angle += 0.1;
    count++;
  }
  noStroke();
  frameRate(240);
}

function draw() {
  background(0);
  let digitPrime;
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let hue = point.isPrime ? 0 : 200;
    let saturation = 0;
    let brightness = 100;
    let alpha = 1;
    if (i <= frameCount * 2) {
      if (point.isPrime) {
        // 素数の場合、光沢感のある色に変更
        digitPrime = i;
        let hue = 0;
        let saturation = 0;
        let brightness = 100;
        let alpha = 1;
        fill(hue, saturation, brightness, alpha);
        ellipse(point.x, point.y, 3, 3);
        let size = 2;
        let offset = size / 2;
        push();
        translate(point.x, point.y);
        rotate(radians(45));
        strokeWeight(1);
        stroke(hue, saturation, brightness, alpha);
        // noFill();
        rect(-offset, -offset, size, size);
        pop();
    } else if (i % 100 == 0) {
        // 100の倍数の場合、青に変更
        fill(240, 100, 100, alpha); // 青に変更
        ellipse(point.x, point.y, 3, 3);
    } else {
        // 素数以外かつ100の倍数でない場合、グレーに変更
        fill(0, 0, 50, alpha);
        ellipse(point.x, point.y, 1, 1);
      }
    }
  }
  // 最新素数を表示
  textAlign(RIGHT, BOTTOM);
  textSize(20);
  fill(255);
  text(`Prime: ${digitPrime}`, width - 10, height - 10);
}

function checkPrime(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
