// 画面サイズ
const WIDTH = 800;
const HEIGHT = 600;

// 曲線の数
const LINE_COUNT = 20;

// 曲線の座標を格納する配列
let lines = [];

// 女性像の色
const FEMALE_COLOR = [255, 192, 203];

function setup() {
  createCanvas(WIDTH, HEIGHT);

  // 曲線を生成して配列に格納
  for (let i = 0; i < LINE_COUNT; i++) {
    let line = [];
    for (let j = 0; j < 50; j++) {
      let x = random(0, WIDTH);
      let y = random(0, HEIGHT);
      line.push([x, y]);
    }
    lines.push(line);
  }
}

function draw() {
  background(0);

  // 曲線を描画
  stroke(FEMALE_COLOR);
  strokeWeight(2);
  for (let i = 0; i < lines.length; i++) {
    beginShape();
    for (let j = 0; j < lines[i].length; j++) {
      let x = lines[i][j][0];
      let y = lines[i][j][1];
      vertex(x, y);
    }
    endShape();
  }

  // 塗りつぶしを行うために女性像の輪郭を取得
  let femaleOutline = get(0, 0, WIDTH, HEIGHT);

  // 女性像の輪郭に色を塗りつぶす
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    if (r === FEMALE_COLOR[0] && g === FEMALE_COLOR[1] && b === FEMALE_COLOR[2]) {
      pixels[i] = FEMALE_COLOR[0];
      pixels[i + 1] = FEMALE_COLOR[1];
      pixels[i + 2] = FEMALE_COLOR[2];
    }
  }
  updatePixels();

  // 女性像を表示
  image(femaleOutline, 0, 0);
}
