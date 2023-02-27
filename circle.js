// メビウスの輪を表すオブジェクト
class Mobius {
  constructor() {
    // ランダムな色を生成
    this.color = color(random(255), random(255), random(255));
    // メビウスの輪の半径をランダムに設定
    this.radius = random(20, 80);
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
    const currentAngle = this.angle + frameCount * 0.05;
    // メビウスの輪を描画
    noFill();
    strokeWeight(4);
    stroke(this.color);
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      const x = this.radius * cos(a);
      const y = this.radius * sin(a + currentAngle);
      vertex(this.x + x, this.y + y);
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
  for (let i = 0; i < 100; i++) {
    mobiusArr.push(new Mobius());
  }
  // 背景を黒に設定
  background(0);
}

function draw() {
  // 背景を毎回黒に描画
  background(0);
  // メビウスの輪を描画
  mobiusArr.forEach((mobius) => {
    mobius.display();
    mobius.update();
  });
  // メビウスの輪が20個以下になったら新しいメビウスの輪を生成する
  if (mobiusArr.length < 20) {
    mobiusArr.push(new Mobius());
  }

  // 透明度の低い白い円を描画
  noStroke();
  fill(255, 30);
  ellipse(width / 2, height / 2, 400);
}

