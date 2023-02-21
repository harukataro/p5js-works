const bubble = (p) => {
  const Bubble = {
    pos: { x: 0, y: 0, z: 0 },
    size: 0,
    speed: 0,
    isFill: false,
  };

  const COUNT = 100;
  const MINSIZE = 0.001;
  const MAXSIZE = 0.5;
  const MINSPEED = 0.01;
  const MAXSPEED = 0.02;
  const BG_COLOR = "#0d212e";
  let bubbles = [];

  const addBubble = () => {
    const zDist = p.random() ** 3;
    const x = p.random(-p.width/2, p.width/2);
    const y = p.random(-p.height/2, p.height/2);
    bubbles.push({
      pos: { x, y, z: -p.width },
      size: p.map(zDist, 0, 1, MINSIZE, MAXSIZE),
      speed: p.map(zDist, 0, 1, MINSPEED, MAXSPEED),
      isFill: Math.random() > 0.5,
    });
  };

  const removeOutBubbles = () => {
    bubbles = bubbles.filter(
      (b) => b.pos.z < p.width && b.pos.y < p.height + 50
    );
  };

  const updateBubbles = () => {
    bubbles.forEach((b) => {
      b.pos.z += b.speed * p.width;
      const xShift = p.map(b.pos.z, -p.width, 0, -15, 15);
      b.pos.x = (b.pos.x + xShift) % p.width;
      b.pos.y = (b.pos.y + xShift) % p.width;
    });
  };

  const drawBubbles = () => {
    const bubbleColors = ["#4F70D6", "#BD3C3A", "#47BAC1", "#F2B134", "#9FDBF4", "#D4A4EB", "#F07F87"];
    bubbles.forEach((b) => {
      const noise = p.noise(b.pos.x * 0.01, b.pos.y * 0.01, b.pos.z * 0.005);
      const color = p.color(p.random(bubbleColors));
      p.stroke(color);
      b.isFill ? p.fill(color) : p.noFill();
      p.circle(b.pos.x, b.pos.y, b.size * p.width * noise);
    });
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  };

  p.draw = () => {
    p.push();
    p.background(p.color(BG_COLOR));
    p.blendMode(p.SCREEN);
    removeOutBubbles();
    while (bubbles.length < COUNT) {
      addBubble();
    }
    updateBubbles();
    drawBubbles();
    p.pop();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(bubble);