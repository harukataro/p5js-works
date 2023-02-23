//Position of left hand side of floor
let base1;

//Position of right hand side of floor
let base2;

// Variables related to moving ball
let positions = [];
let velocities = [];
let rs = [];
let speeds = [];

let numBalls = 1;
let maxBalls = 100;

function setup() {
  createCanvas(500, 500);

  fill(128);
  base1 = createVector(0, height - 150);
  base2 = createVector(width, height);

  //start ellipse at middle top of screen
  for (let i = 0; i < numBalls; i++) {
    positions.push(createVector(width / 2, 0));

    //calculate initial random velocity
    let velocity = p5.Vector.random2D();
    velocity.mult(random(2.5, 4.5));
    velocities.push(velocity);

    rs.push(random(5, 10));
    speeds.push(random(3, 7));
  }
}

function draw() {
  //draw background
  fill(0, 12);
  noStroke();
  rect(0, 0, width, height);

  //draw base
  fill("red");
  quad(base1.x, base1.y, base2.x, base2.y, base2.x, height, 0, height);

  //calculate base top normal
  let baseDelta = p5.Vector.sub(base2, base1);
  baseDelta.normalize();
  let normal = createVector(-baseDelta.y, baseDelta.x);
  let intercept = p5.Vector.dot(base1, normal);

  for (let i = 0; i < numBalls; i++) {
    let position = positions[i];
    let velocity = velocities[i];
    let r = rs[i];
    let speed = speeds[i];

    //draw ellipse
    noStroke();
    fill(255, i * 10, 0, 200);
    ellipse(position.x, position.y, r * 2, r * 2);

    //move ellipse
    position.add(velocity);

    //normalized incidence vector
    incidence = p5.Vector.mult(velocity, -1);
    incidence.normalize();

    // detect and handle collision with base
    if (p5.Vector.dot(normal, position) > intercept) {
      //calculate dot product of incident vector and base top
      let dot = incidence.dot(normal);

      //calculate reflection vector
      //assign reflection vector to direction vector
      velocity.set(
        2 * normal.x * dot - incidence.x,
        2 * normal.y * dot - incidence.y,
        0
      );
      velocity.mult(speed);

      // split ball if it hits the edge
      if (position.x < base1.x + r || position.x > base2.x - r) {
        if (numBalls < maxBalls) {
          numBalls++;
          positions.push(
            createVector(position.x, position.y)
          );
          velocities.push(
            p5.Vector.fromAngle(random(-PI / 6, PI / 6))
            .mult(speed)
          );
          rs.push(r * 0.7);
          speeds.push(speed);
        }
      }
    }

    // detect boundary collision
    // right
    if (position.x > width - r) {
      position.x = width - r;
      velocity.x *= -1;
    }
    // left
    if (position.x < r) {
      position.x = r;
      velocity.x *= -1;
    }
// top
if (position.y < r) {
    position.y = r;
    velocity.y *= -1;

    //randomize base top
    base1.y = random(height - 100, height);
    base2.y = random(height - 100, height);

    // split ball into two
    if (numBalls < maxBalls) {
      numBalls += 2;

      let angle = velocity.heading();
      let offset = random(-PI / 6, PI / 6);
      velocities.push(
        p5.Vector.fromAngle(angle + offset)
          .mult(speed)
      );
      velocities.push(
        p5.Vector.fromAngle(angle - offset)
          .mult(speed)
      );

      positions.push(
        createVector(position.x, position.y)
      );
      positions.push(
        createVector(position.x, position.y)
      );

      rs.push(r * 0.7);
      rs.push(r * 0.7);

      speeds.push(speed);
      speeds.push(speed);
    }
  }
}
}

