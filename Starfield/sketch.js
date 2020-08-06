// Code by Aleix Ferre
// GitHub: https://github.com/CatalaHD
// Sketch: https://editor.p5js.org/thecatalahd/sketches/n75-txP0w
// Based on Daniel Shiffman's code
// https://thecodingtrain.com/CodingChallenges/001-starfield.html

let stars = [];

let roboto; // Font
let speed = 3;
let indexPallette = 0; // Index of the shown pallette

let pallettes = []; // Pallettes imported from file
let jsonTemp; // Temporary variable that charges the JSON file
let vignette; // The vignette effect image

function preload() {
    jsonTemp = loadJSON("../assets/pallettes.json");
    roboto = loadFont("../assets/Roboto-Black.ttf");
    vignette = loadImage('../assets/vignette.png');
}

function setup() {

    // We charge the pallettes
    pallettes = jsonTemp.pallettes;

    // We first get the colors from the URL
    let params = getURLParams();

    if (params.id && !isNaN(params.id)) {
        if (params.id < pallettes.length && params.id >= 0) {
            indexPallette = params.id;
        }
    }

    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    textFont(roboto);
    textSize(100);
    for (var i = 0; i < 800; i++) {
        stars[i] = new Star();
    }
}

function draw() {

    // Choose the color pallette
    const pallette = pallettes[indexPallette];

    background(pallette[0]);
    translate(width / 2, height / 2);

    // Update and show all the particles
    for (var i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }

    // -------------------------
    // Show the clock
    // -------------------------
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

    // Show the vignette image effect
    image(vignette, -width / 2, -height / 2, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Padding numbers function
// See: https://stackoverflow.com/a/10073788/13295607
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}