let cloud1_x = -50;
let cloud2_x = -100;
let boat_x = 0;
let fish_x = [];
let fish_y = [];
let fish_speed = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 5; i++) {
    fish_x.push(random(width));
    fish_y.push(random(height - 50));
    fish_speed.push(random(1, 3));
  }
}

function draw() {
  background(0, 194, 255);
  
  // draw sea
  fill(30, 144, 255);
  rect(0, height - 50, width, 50);

  // draw fish
  fill(255, 192, 203); // ピンク色
  noStroke();
  for (let i = 0; i < fish_x.length; i++) {
    ellipse(fish_x[i], fish_y[i], 30, 15);
    triangle(fish_x[i] - 15, fish_y[i], fish_x[i] - 30, fish_y[i] - 10, fish_x[i] - 30, fish_y[i] + 10);
    
    if (fish_x[i] > width + 30) {
      fish_x[i] = -30;
      fish_y[i] = random(height - 50);
      fish_speed[i] = random(1, 3);
    }
    fish_x[i] += fish_speed[i];
  }
  
  // draw boat
  fill(139, 69, 19); // 茶色
  rect(boat_x, height - 50, 40, 10);
  rect(boat_x + 18, height - 70, 4, 20); // 柱
  fill(255);
  triangle(boat_x, height - 55, boat_x + 20, height - 90, boat_x + 40, height - 55);
  
  
  // draw first cloud
  fill(255);
  ellipse(cloud1_x, 100, 50, 50);
  ellipse(cloud1_x + 25, 100, 50, 50);
  ellipse(cloud1_x + 50, 100, 50, 50);
  ellipse(cloud1_x + 25, 75, 50, 50);
  ellipse(cloud1_x + 25, 125, 50, 50);
  
  // draw second cloud
  fill(200);
  ellipse(cloud2_x, 150, 70, 70);
  ellipse(cloud2_x + 35, 150, 70, 70);
  ellipse(cloud2_x + 70, 150, 70, 70);
  ellipse(cloud2_x + 35, 115, 70, 70);
  ellipse(cloud2_x + 35, 185, 70, 70);
  
  // animate clouds and boat
  cloud1_x += 0.5;
  if (cloud1_x > width + 50) {
    cloud1_x = -50;
  }
  
  cloud2_x += 0.3;
  if (cloud2_x > width + 70) {
    cloud2_x = -70;
  }
  
  boat_x += 0.2;
  if (boat_x > width + 40) {
    boat_x = -40;
  }

  for (let i = 0; i < fish_x.length; i++) {
    fish_x[i] += fish_speed[i] * 0.05;
    if (fish_x[i] > width + 30) {
      fish_x[i] = -30;
      fish_y[i] = random(height - 50);
      fish_speed[i] = random(1, 3);
    }
  }
}
