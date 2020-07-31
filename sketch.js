// Code by Aleix Ferré
// Github: https://github.com/CatalaHD/
// Sketch: editor.p5js.org/thecatalahd/sketches/gf_vssSWs
// Based on Daniel Shiffman's code
// https://thecodingtrain.com/CodingChallenges/074-clock.html

let roboto; // Font
let indexPallette = 0; // Index of the shown pallette
let pallettes = [
  ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#FFFFFF"],
  ["#1F2041", "#4B3F72", "#FFC857", "#119DA4", "#FFFFFF"],
  ["#314CB6", "#B68CB8", "#6461A0", "#EFBDEB", "#FFFFFF"],
  ["#3D315B", "#444B6E", "#708B75", "#9AB87A", "#FFFFFF"],
  ["#D8CFAF", "#E6B89C", "#ED9390", "#F374AE", "#333333"]
  //... add more!
];
let vignette; // The vignette effect image

// Function awake
function preload() {
  roboto = loadFont('assets/Roboto-Black.ttf');
  vignette = loadImage('assets/vignette.png');
}

// Function start
function setup() {
  // We make it fullscreen
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textFont(roboto);
  textSize(100);
}

// Function update
function draw() {

  const pallette = pallettes[indexPallette];

  background(pallette[0]);
  translate(width / 2, height / 2);
  rotate(-90);

  let hr = hour();
  let mn = minute();
  let sc = second();

  strokeWeight(8);
  stroke(pallette[1]);
  noFill();
  let secondAngle = map(sc, 0, 60, 0, 360);
  arc(0, 0, 300, 300, 0, secondAngle);

  stroke(pallette[2]);
  let minuteAngle = map(mn, 0, 60, 0, 360);
  arc(0, 0, 280, 280, 0, minuteAngle);

  stroke(pallette[3]);
  let hourAngle = map(hr % 12, 0, 12, 0, 360);
  arc(0, 0, 260, 260, 0, hourAngle);

  push();
  rotate(secondAngle);
  stroke(pallette[1]);
  line(0, 0, 100, 0);
  pop();

  push();
  rotate(minuteAngle);
  stroke(pallette[2]);
  line(0, 0, 75, 0);
  pop();

  push();
  rotate(hourAngle);
  stroke(pallette[3]);
  line(0, 0, 50, 0);
  pop();

  stroke(255);
  point(0, 0);

  rotate(90);
  fill(pallette[4]);
  noStroke();
  textAlign(CENTER);
  text(pad(hr, 2) + ':' + pad(mn, 2) + ':' + pad(sc, 2), 10, 250);

  image(vignette, -width / 2, -height / 2, width, height);
}

// Padding numbers function
// See: https://stackoverflow.com/a/10073788/13295607
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}