let numPoints = 10; // 制御点の数
let points = []; // 制御点の座標
let lineSpacing = 5; // 線の間隔
let noiseScale = 0.02; // Perlinノイズのスケール

function setup() {
  createCanvas(400, 400);
  // 制御点をランダムに生成
  for (let i = 0; i < numPoints; i++) {
    points.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(220);
  
  // 10本の線を描画
  for (let i = 0; i < 10; i++) {
    drawLine(i * lineSpacing);
  }
  
  // 制御点を移動させる
  for (let i = 0; i < numPoints; i++) {
    points[i].x += map(noise(i, frameCount * noiseScale), 0, 1, -1, 1);
    points[i].y += map(noise(i + 100, frameCount * noiseScale), 0, 1, -1, 1);
  }
}

// 線を描画する
function drawLine(offset) {
  noFill();
  stroke(0);
  beginShape();
  for (let i = 0; i < 1; i += 0.01) {
    let pt = getCurvePoint(i, points);
    curveVertex(pt.x, pt.y + offset);
  }
  endShape();
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
