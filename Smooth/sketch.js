// Code by Aleix Ferré
// Github: https://github.com/CatalaHD/
// Sketch: editor.p5js.org/thecatalahd/sketches/

let roboto; // Font
let indexPallette = 0; // Index of the shown pallette
let pallettes = []; // Pallettes imported from file
let jsonTemp; // Temporary variable that charges the JSON file
let vignette; // The vignette effect image

// Smoothing things
// Formatting [s, m, h]
let angles = []; // The actual raw angles
let smoothedAngles = []; // The smoothed ones
let smoothVel = 0.1; // The smooting velocity

// Function awake
function preload() {
    jsonTemp = loadJSON("../assets/pallettes.json");
    roboto = loadFont('../assets/Roboto-Black.ttf');
    vignette = loadImage('../assets/vignette.png');
}

// Function start
function setup() {

    // Smoothed Values
    smoothedAngles[0] = second();
    smoothedAngles[1] = minute();
    smoothedAngles[2] = hour();

    // Non Smoothed Values
    angles[0] = second();
    angles[1] = minute();
    angles[2] = hour();

    // We charge the pallettes
    pallettes = jsonTemp.pallettes;

    // We first get the colors from the URL
    let params = getURLParams();

    if (params.id && !isNaN(params.id)) {
        if (params.id < pallettes.length && params.id >= 0) {
            indexPallette = params.id;
        }
    }

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

    let sc = second();
    let mn = minute();
    let hr = hour();

    strokeWeight(8);
    stroke(pallette[1]);
    noFill();
    angles[0] = map(sc, 0, 60, 0, 360);
    smoothedAngles[0] = lerp(smoothedAngles[0], angles[0], smoothVel);
    arc(0, 0, 300, 300, 0, smoothedAngles[0]);

    stroke(pallette[2]);
    angles[1] = map(mn, 0, 60, 0, 360);
    smoothedAngles[1] = lerp(smoothedAngles[1], angles[1], smoothVel);
    arc(0, 0, 280, 280, 0, smoothedAngles[1]);

    stroke(pallette[3]);
    angles[2] = map(hr % 12, 0, 12, 0, 360);
    smoothedAngles[2] = lerp(smoothedAngles[2], angles[2], smoothVel);
    arc(0, 0, 260, 260, 0, smoothedAngles[2]);

    push();
    rotate(smoothedAngles[0]);
    stroke(pallette[1]);
    line(0, 0, 100, 0);
    pop();

    push();
    rotate(smoothedAngles[1]);
    stroke(pallette[2]);
    line(0, 0, 75, 0);
    pop();

    push();
    rotate(smoothedAngles[2]);
    stroke(pallette[3]);
    line(0, 0, 50, 0);
    pop();

    stroke(255);
    point(0, 0);

    rotate(90);
    fill(pallette[4]);
    noStroke();
    textAlign(CENTER);
    let txt = pad(hr, 2) + ':' + pad(mn, 2) + ':' + pad(sc, 2);
    text(txt, 10, 250);

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