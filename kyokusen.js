let numPoints = 10; // 制御点の数
let points = []; // 制御点の座標
let noiseScale = 0.05; // Perlinノイズのスケール
let t = 0; // 時間

function setup() {
  createCanvas(400, 400);
  // 制御点をランダムに生成
  for (let i = 0; i < numPoints; i++) {
    points.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(220);
  
  // 制御点を描画
  stroke(0);
  noFill();
  beginShape();
  for (let i = 0; i < numPoints; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();
  
  // 曲線を描画
  noStroke();
  fill(0);
  beginShape();
  for (let i = 0; i < 1; i += 0.01) {
    let pt = getCurvePoint(i, points);
    curveVertex(pt.x, pt.y);
  }
  endShape();
  
  // 制御点を移動させる
  for (let i = 0; i < numPoints; i++) {
    points[i].x += map(noise(i, t * noiseScale), 0, 1, -1, 1);
    points[i].y += map(noise(i + 100, t * noiseScale), 0, 1, -1, 1);
  }
  
  // 時間を進める
  t += 0.01;
}

// 3次関数的な曲線上の点を取得する
function getCurvePoint(t, points) {
  let x = 0;
  let y = 0;
  let n = points.length - 1;
  for (let i = 0; i <= n; i++) {
    let b = bernstein(n, i, t);
    x += points[i].x * b;
    y += points[i].y * b;
  }
  return createVector(x, y);
}

// Bernstein多項式を計算する
function bernstein(n, i, t) {
  let a = binomial(n, i);
  let b = pow(t, i);
  let c = pow(1 - t, n - i);
  return a * b * c;
}

// 二項係数を計算する
function binomial(n, k) {
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result *= (n - k + i) / i;
  }
  return result;
}
