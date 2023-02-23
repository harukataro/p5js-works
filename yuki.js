let snowflakes = [];
let snowpile = [];

function setup() {
  createCanvas(400, 400);
}

function drawSnowflake() {
  let snowflake = {
    x: random(width),
    y: random(-100, -10),
    size: random(5, 10),
    speed: random(1, 3),
    onGround: false
  };
  snowflakes.push(snowflake);
}

function draw() {
  background(0);
  // 雪の描画と落下処理
  for (let i = snowflakes.length - 1; i >= 0; i--) {
    let snowflake = snowflakes[i];
    fill(255);
    noStroke();
    ellipse(snowflake.x, snowflake.y, snowflake.size, snowflake.size);
    if (!snowflake.onGround) {
      snowflake.y += snowflake.speed;
      if (snowflake.y > height) {
        // 雪が地面に到達した場所に対応する snowpile の index
        let pileIndex = floor(snowflake.x);
        if (!snowpile[pileIndex]) {
          snowpile[pileIndex] = [];
        }
        // 地面に落ちた雪を `snowpile` に追加する
        snowpile[pileIndex].push({ x: snowflake.x, y: height, size: snowflake.size });
        snowflake.onGround = true;
      }
    }
  }
  // 積もった雪の描画
  for (let i = 0; i < snowpile.length; i++) {
    if (snowpile[i]) {
      let pile = snowpile[i];
      let pileHeight = 0;
      let count = 0;
      for (let p of pile) {
        pileHeight += p.size;
        count++;
      }
      if (count > 2) {
        let x = i - 1;
        let prevPile = snowpile[x];
        let p1 = prevPile ? prevPile[prevPile.length - 1].size : 0;
        let p2 = pile[0].size;
        let p3 = pile[pile.length - 1].size;
        pileHeight = (p1 + p2 + p3) / 3;
      }
      fill(200);
      noStroke();
      rect(i, height - pileHeight, 1 + pile[pile.length-1].size, pileHeight, 5);
    }
  }

  // 雪が少なくなったら追加する
  if (snowflakes.length < 10000) {
    drawSnowflake();
  }
}
