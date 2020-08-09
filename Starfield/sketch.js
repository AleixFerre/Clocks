// Code by Aleix Ferre
// GitHub: https://github.com/CatalaHD
// Sketch: https://editor.p5js.org/thecatalahd/sketches/n75-txP0w
// Based on Daniel Shiffman's code
// https://thecodingtrain.com/CodingChallenges/001-starfield.html

let stars = [];

let roboto; // Font
let speed = 3;
let indexPallette = 0; // Index of the shown pallette

let clock;

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

    let smoothing = params.smooth == "true";

    createCanvas(windowWidth, windowHeight);

    clock = new Clock(smoothing, 0.1);

    for (var i = 0; i < 800; i++) {
        stars[i] = new Star();
    }
}

function draw() {

    background(pallettes[indexPallette][0]);
    push();
    translate(width / 2, height / 2);

    // Update and show all the particles
    for (var i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }

    pop();

    clock.update();
    clock.show();

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