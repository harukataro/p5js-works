// メビウスの輪を表すオブジェクト
class Mobius {
  constructor() {
    // ランダムな色を生成
    this.color = color(random(0,100));
    // メビウスの輪の半径をランダムに設定
    this.radius = random(10, 10);
    // メビウスの輪のx方向の速度をランダムに設定
    this.vx = random(-2, 2);
    // メビウスの輪のy方向の速度をランダムに設定
    this.vy = random(-2, 2);
    // メビウスの輪の回転角度を初期化
    this.angle = 0;
    // メビウスの輪のx座標をランダムに設定
    this.x = random(this.radius, width - this.radius);
    // メビウスの輪のy座標をランダムに設定
    this.y = random(this.radius, height - this.radius);
  }

  // メビウスの輪を描画する関数
  display() {
    // 現在の回転角度を計算
    const currentAngle = this.angle * 2 + frameCount * 0.05;
    // メビウスの輪を描画
    noFill();
    strokeWeight(4);
    stroke(this.color);
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      const x = this.radius * cos(a);
      const y = this.radius / 2 * sin(a * 2 + currentAngle);
      if (this.x < width / 2) {
        vertex(this.x + x, this.y + y);
      } else {
        vertex(this.x - x, this.y + y);
      }
    }
    endShape(CLOSE);
  }

  // メビウスの輪を更新する関数
  update() {
    // 画面端に到達したら反転する
    if (this.x + this.radius > width || this.x - this.radius < 0) {
      this.vx *= -1;
    }
    if (this.y + this.radius > height || this.y - this.radius < 0) {
      this.vy *= -1;
    }
    // 座標を更新
    this.x += this.vx;
    this.y += this.vy;
    // 回転角度を更新
    this.angle += 0.02;
  }
}

// メビウスの輪の配列
let mobiusArr = [];

function setup() {
  createCanvas(500, 500);
  // メビウスの輪の配列を初期化
  for (let i = 0; i < 500; i++) {
    mobiusArr.push(new Mobius());
  }
  // 1st one color to red
  mobiusArr[0].color = color(255, 0, 0);
  // 1st one size to smaller
  mobiusArr[0].radius = 8;
}

function draw() {
  // 背景を黒に設定
  background(10);
  // メビウスの輪を更新して描画
  for (let i = 0; i < mobiusArr.length; i++) {
    mobiusArr[i].update();
    mobiusArr[i].display();
  }
}