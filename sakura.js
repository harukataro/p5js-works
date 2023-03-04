let flowers = [];
let petalPath = [
  {x: 0, y: 0},
  {x: 10, y: 5},
  {x: 20, y: 0},
  {x: 10, y: -5}
];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200);
  
  // 新しい花を追加する
  if (frameCount % 10 == 0) {
    let x = random(width);
    let y = random(height / 2);
    let size = random(50, 100);
    flowers.push({x: x, y: y, size: size, petalFall: false});
  }
  
  // 花びらを描画する
  for (let i = 0; i < flowers.length; i++) {
    let flower = flowers[i];
    drawFlower(flower.x, flower.y, flower.size);
    
    // 花びらをアニメーションする
    if (flower.petalFall === false) {
      flower.y += random(1, 3);
      flower.x += random(-2, 2);
      flower.size -= random(0.05, 0.1);
      if (flower.size <= 0) {
        flower.petalFall = true;
      }
    }
  }
  
  // 落下中の花びらを描画する
  for (let i = 0; i < flowers.length; i++) {
    let flower = flowers[i];
    if (flower.petalFall) {
      for (let j = 0; j < 5; j++) {
        let x = flower.x;
        let y = flower.y;
        let size = random(5, 10);
        drawPetal(x, y, size);
        flower.y += random(1, 3);
        flower.x += random(-2, 2);
      }
    }
  }
  
  // 範囲外の花を削除する
  flowers = flowers.filter(flower => flower.y < height + 50);
}

function drawFlower(x, y, size) {
  noStroke();
  fill(255, 192, 203);
  ellipse(x, y, size, size);
  fill(255, 228, 225);
  ellipse(x, y - size / 3, size * 0.7, size * 0.9);
  ellipse(x, y + size / 3, size * 0.7, size * 0.9);
}

function drawPetal(x, y, size) {
  noStroke();
  fill(255, 192, 203);
  beginShape();
  for (let i = 0; i < petalPath.length; i++) {
    let petalPoint = petalPath[i];
    let px = petalPoint.x * size / 20 + x;
    let py = petalPoint.y * size / 20 + y;
    vertex(px, py);
  }
  endShape(CLOSE);
}
