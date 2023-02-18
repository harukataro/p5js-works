let centerX, centerY;
let radius;
let earthRadius;
let moonRadius;
let moonAngle = 0;
let moonSpeed;
let earthX, earthY;
let moonX, moonY;
let angle = 0;
let angles = [0, 0, 0, 0, 0, 0, 0, 0, 0];  // 惑星アングル
let orbitalRatios = [0.38, 0.72, 1.00, 1.52, 5.20, 9.54, 19.18, 30.06, 39.53]; // 惑星の公転半径 
let speeds = [0.2408, 0.6152, 1.0000, 1.8808, 11.862, 29.457, 84.01, 164.8, 248.0]; // 惑星の公転周期
let colors = ['gray', 'orange', 'blue', 'brown', 'orange', 'brown', 'blue', 'blue', 'blue']; // 惑星の色
let sizes = [0.5, 0.5, 1.0, 0.7, 3.0, 2.5, 2.0, 2.0, 1.5]; // 惑星の大きさ
let speed;
let saturnSize;
let ringSize;
let stars = [];
let sunRadius;
let cometSpeed = 4;
let cometAngle = 0;
let cometEccentricity = 0.7;
let cometDistance = radius * 20;
let cometAccel;
let cometX, cometY;


function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  centerX = width / 2;
  centerY = height / 2;
  radius = min(width, height) * 0.1 / 2;
  size = radius * 0.3;
  moonSize = size * 0.2727;
  speed = 0.5;
  moonSpeed = speed * 12;
  saturnSize = size * 2.8;
  ringSize = size * 4.2;

  // stars
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    stars.push({x: x, y: y, color: color(random(255), random(255), random(255))});
  }
}

function draw() {
  background(0);

  // 星
  noStroke();
  fill('yellow');
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    fill(star.color);
    circle(star.x, star.y, 2);
  }

  // 太陽
  noStroke();
  fill('red');
  circle(centerX, centerY, radius/2);

  // 惑星
  for (let i=0; i < 9; i++){
    angles[i] += speed / speeds[i];
    let x = centerX + cos(angles[i]) * radius * orbitalRatios[i];
    let y = centerY + sin(angles[i]) * radius * orbitalRatios[i];
    noStroke();
    fill(colors[i]);
    let s = size * sizes[i];
    circle(x, y, s);

    if(i == 2){
      earthX = x;
      earthY = y;
      noStroke();
      fill(25, 188, 157, 100);
      circle(earthX, earthY, size * sizes[2] * 0.5);
      fill(25, 188, 157, 50);
      circle(earthX, earthY, size * sizes[2] * 0.7);
    }
    
    if(i  == 5){
     // 土星の位置に輪を描画する
      stroke(139, 69, 19); // 茶色
      strokeWeight(5);
      noFill();
      circle(x, y, ringSize);

     // 土星を描画する
      noStroke();
      fill(244, 164, 96); // 淡い黄色
      circle(x, y, s);
    }
  }

  // 月
  let moonX = earthX + cos(moonAngle) * size * 1;
  let moonY = earthY + sin(moonAngle) * size * 1;
  noStroke();
  fill(200);
  circle(moonX, moonY, moonSize);
  
// 彗星
let a = cometDistance / (1 + cometEccentricity);
  let b = a * sqrt(1 - cometEccentricity * cometEccentricity);
  let cometRadius = map(cometAngle, 0, 360, 3, 10);
  let cometX = centerX + a * cos(cometAngle) - cometRadius / 2;
  let cometY = centerY + b * sin(cometAngle);
  noStroke();
  fill('white');
  circle(cometX, cometY, cometRadius);

  // 彗星の軌道
  stroke('gray');
  noFill();
  let x, y;
  beginShape();
  for (let i = 0; i <= 360; i++) {
    let angle = i;
    let a = cometDistance / (1 + cometEccentricity * cos(angle));
    let b = a * sqrt(1 - cometEccentricity * cometEccentricity);
    x = centerX + a * cos(angle);
    y = centerY + b * sin(angle);
    vertex(x, y);
  }
  endShape();

  // 彗星の速度と角度を更新
  cometAngle += cometSpeed;
  cometSpeed += cometAccel;
  if (cometAngle > 360) {
    cometAngle = 0;
    cometSpeed = 0.5;
  }

  angle += speed;
  moonAngle += moonSpeed;

}
