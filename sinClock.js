// 10個の配列を用意
wave = []
num = 15;
let resolution = 5; // 描画の刻み（1度あたりの分割数）
let fillFlag = false; // 塗りつぶしの切り替えフラグ
let speed = 1 / resolution; // 1度あたりの角速度
let sFactor = 30;
wave.push({a: 22, b: 25, c: 220, angle: 0, s: 5});
for(let i = 1; i < num; i++) {
  let _a = wave[i - 1].a - 2;
  let _b = wave[0].b;
  let _c = wave[i - 1].c - (_a + wave[i - 1].a);
  let _s = ((Math.random() - 0.5 ) * 2)* sFactor;
  wave.push({a: _a, b: _b, c: _c, angle: 0, s: _s});
}

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  drawCircleLine(wave);
  for(let i = 0; i < wave.length; i++)
  {
    drawSineWave(wave[i]);
    drawBlackCircle(wave[i]);
  }

  // 60秒で１周する
  for(let i = 0; i < wave.length; i++)
  {
    wave[i].angle += speed * wave[i].s;
    if (wave[i].angle >= 360) {
      wave[i].angle -= 360;
    }
    else if(wave[i].angle <= -360) {
      wave[i].angle += 360;
    }
  }
}

function drawSineWave(_wave) {
  let _angle = _wave.angle;
  let _a = _wave.a;
  let _b = _wave.b;
  let _c = _wave.c;
  let fillFlag = false;
  
  noStroke();
  beginShape();
  for (let theta = 0; theta <= 360 * resolution; theta++) {
    tick = theta / resolution;
    let r = _c + _a * sin(_b * (tick - _angle));
    let x = r * cos(tick);
    let y = r * sin(tick);
    vertex(x, y);
    
    // 正弦波の値が正であれば塗り分ける
    let sinValue = sin(_b * (tick - _angle));
    if (sinValue > 0) {
      if (!fillFlag) {
        fill(255);
        fillFlag = true;
      }
      arc(0, 0, r * 2, r * 2, tick, tick + 1 / resolution, PIE);
    } else {
      fillFlag = false;
    }
  }
  endShape(CLOSE);
}

function drawCircleLine(_wave) {
  let r = _wave.c + _wave.a;
  noFill();
  stroke(255);
  strokeWeight(2);
  ellipse(0, 0, r * 2);
}

function drawBlackCircle(_wave) {
  let r = _wave.c - _wave.a;
  noStroke();
  fill(0);
  ellipse(0, 0, r * 2);
}