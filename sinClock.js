let angle1 = 0; // 外側のSin波の角度
let angle2 = 0; // 内側のSin波の角度
let a1 = 20; // 外側のSin波の振幅
let b1 = 25; // 外側のSin波の周波数
let a2 = 20; // 内側のSin波の振幅
let b2 = 25; // 内側のSin波の周波数
let c1 = 200; // 中心からの距離
let c2 = c1 - (a1 + a2/2); // 中心からの距離
let resolution = 5; // 描画の刻み（1度あたりの分割数）
let fillFlag = false; // 塗りつぶしの切り替えフラグ
let speed = 1 / resolution; // 1度あたりの角速度

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  
  // 外側のSinカーブを描画しながら塗り分ける
  noStroke();
  beginShape();
  for (let theta = 0; theta <= 360 * resolution; theta++) {
    tick = theta / resolution;
    let r = c1 + a1 * sin(b1 * (tick - angle1));
    let x = r * cos(tick);
    let y = r * sin(tick);
    vertex(x, y);
    
    // 正弦波の値が正であれば塗り分ける
    let sinValue = sin(b1 * (tick - angle1));
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

  // 内円を黒で塗りつぶす
  noStroke();
  fill(0);
  ellipse(0, 0, (c1-a1/2) * 2);
  
  // 内側のSinカーブを描画しながら塗り分ける
  noStroke();
  beginShape();
  for (let theta = 0; theta <= 360 * resolution; theta++) {
    tick = theta / resolution;
    let r = c2 - a2 * sin(b2 * (tick - angle2));
    let x = r * cos(tick);
    let y = r * sin(tick);
    vertex(x, y);
    
    // 正弦波の値が正であれば塗りつける
    let sinValue = sin(b2 * (tick - angle2));
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
  
// 外縁と内縁に線を描画
noFill();
stroke(255);
strokeWeight(2);
ellipse(0, 0, (c1 + a1) * 2); // 外縁
ellipse(0, 0, (c2 - a2) * 2); // 内縁

// 内円を黒で塗りつぶす
noStroke();
fill(0);
ellipse(0, 0, (c2-a2/2) * 2);

// 60秒で１周する
angle1 += speed;
angle2 -= speed;
if (angle1 >= 360) {
angle1 -= 360;
}
if (angle2 >= 360) {
angle2 -= 360;
}
}
