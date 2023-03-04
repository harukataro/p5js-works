var canvas;
var yoff = 0;
var lastDrawTime = 0;
var lastX = 0;
var mouseXHistory = [];

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  noiseDetail(2, 0.2);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  if (millis() - lastDrawTime > 500) {
    lastDrawTime = millis();
    background(255, 255, 255);
    noStroke();
    beginShape();
    fill(182, 208, 220, 70);
    // 波を描画する
    var xoff = 0;
    var distXSum = 0;
    var mouseXHistoryIndex = 0;
    for (var x = 0; x <= width + 200; x += 20) {
      // ランダムな値を生成する
      var r = random(-1, 1);
      var distX = abs(x - lastX);
      distXSum += distX;
      // マウスの移動をシミュレートするように、画面の半分以上を0.5秒かけて動くようにする
      if (distXSum < width / 2) {
        var gaussianX = mouseXHistory[mouseXHistoryIndex];
        var gaussianY = map(Gaussian(gaussianX), 0, 0.4, 0, height / 10);
        mouseXHistoryIndex++;
      } else {
        var elapsed = millis() - lastDrawTime;
        var fraction = (elapsed - 500) / 500;
        var gaussianY = map(fraction, 0, 1, height / 10, 0);
      }
      var y = map(noise(xoff, yoff), 0, 1, height * 1 / 10, height * 8 / 10);
      // ガウス曲線
      fill(255, 0, 0);
      ellipse(x, gaussianY, 5);
      fill(182, 208, 220, 70);
      // 曲線の頂点座標を指定する
      curveVertex(x, y + gaussianY);
      // x
      xoff += 0.01;
    }
    curveVertex(width, height);
    curveVertex(0, height);
    endShape(CLOSE);
    yoff += 0.003;

    // マウスの移動を記録する
    if (mouseXHistory.length < width / 2) {
      mouseXHistory.push(map(mouseX, 0, width, -5, 5));
    } else {
      mouseXHistory.splice(0, 1);
      mouseXHistory.push(map(mouseX, 0, width, -5, 5));
    }
    lastX += mouseXHistory[mouseXHistory.length - 1];
    lastX = constrain(lastX, 0, width);
  }
}

function Gaussian(x) {
  return 1 / (pow(2 * PI, 1 / 2)) * Math.exp(-pow(x, 2) / 2)}
