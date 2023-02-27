let heart_centers;
let max_heart_size;
let min_heart_size;
let heart_margin;

function setup() {
  createCanvas(400, 400);
  max_heart_size = 170;
  min_heart_size = 100;
  heart_margin = 10;
  textAlign(CENTER, CENTER);
  
  heart_centers = [];
  let heart_width = (width - heart_margin * 2) / 3;
  let heart_height = (height - heart_margin * 2) / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = heart_margin + heart_width * (i + 0.5);
      let y = heart_margin + heart_height * (j + 0.5);
      heart_centers.push({ x: x, y: y });
    }
  }
}

function draw() {
  let bg_color = color(50);
  if (frameCount % 120 === 0 && max_heart_size === 170) {
    bg_color = color(255, 204, 0); // 背景を光らせる色を設定
  }
  background(bg_color);
  fill(255, 0, 0);
  for (let i = 0; i < 9; i++) {
    let heart_size = map(sin(frameCount * 0.05), -1, 1, min_heart_size, max_heart_size);
    drawHeart(heart_centers[i].x, heart_centers[i].y, heart_size);
  }
}

function drawHeart(x, y, size) {
  textSize(size);
  textStyle(BOLD);
  text("♥", x, y);
}
