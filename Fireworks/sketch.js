// Code by Aleix Ferré
// Github: https://github.com/CatalaHD/
// Sketch: https://editor.p5js.org/thecatalahd/sketches/kAhhmh1hw
// Based on Daniel Shiffman's code
// https://thecodingtrain.com/CodingChallenges/074-clock.html

let roboto; // Font
let indexPallette = 0; // Index of the shown pallette
let pallettes = []; // Pallettes imported from file
let jsonTemp; // Temporary variable that charges the JSON file
let vignette; // The vignette effect image

// Firework things
const fireworks = [];
let gravity;
let hearts;

const clockImgs = []; // The clock img

// Function awake
function preload() {
    clockImgs[0] = loadImage('../assets/hours-w.png');
    clockImgs[1] = loadImage('../assets/hours-b.png');
    jsonTemp = loadJSON("../assets/pallettes.json");
    roboto = loadFont('../assets/Roboto-Black.ttf');
    vignette = loadImage('../assets/vignette-25.png');
}

// Function start
function setup() {

    // We charge the pallettes
    pallettes = jsonTemp.pallettes;

    gravity = createVector(0, 0.1);

    // We first get the colors from the URL
    let params = getURLParams();

    if (params.id && !isNaN(params.id)) {
        if (params.id < pallettes.length && params.id >= 0) {
            indexPallette = params.id;
        }
    }

    createCanvas(windowWidth, windowHeight);

    hearts = params.heart == "true";

    const smoothing = params.smooth == "true";
    const showImg = params.image == "true";
    const isAmPm = params.ampm == "true";

    if (showImg) {
        const clockImg = pallettes[indexPallette][4] === "#FFFFFF" ? clockImgs[0] : clockImgs[1];
        clock = new Clock(smoothing, 0.1, clockImg, isAmPm);
    } else {
        clock = new Clock(smoothing, 0.1, null, isAmPm);
    }

}

// Function update
function draw() {

    const pallette = pallettes[indexPallette];
    colorMode(RGB);
    const col = color(pallette[0]);
    col.setAlpha(95);
    background(col);

    // Show the fireworks
    colorMode(HSB);
    if (random() < 0.02) { // 2% chance every frame to spawn
        fireworks.push(new Firework());
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();

        if (fireworks[i].done()) {
            fireworks.splice(i, 1);
        }
    }

    // Show the clock
    colorMode(RGB);
    clock.update();
    clock.show();

    image(vignette, -width / 2, -height / 2, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}