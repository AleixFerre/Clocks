// Code by Aleix Ferré
// Github: https://github.com/CatalaHD/
// Sketch: editor.p5js.org/thecatalahd/sketches/nt24zmSyW
// Based on Daniel Shiffman's code
// https://thecodingtrain.com/CodingChallenges/074-clock.html
// and also https://youtu.be/cl-mHFCGzYk

let roboto; // Font
let indexPallette = 0; // Index of the shown pallette
let pallettes = []; // Pallettes imported from file
let jsonTemp; // Temporary variable that charges the JSON file
let vignette; // The vignette effect image

let clock;

// Snowy things
let snow = [];
let gravity;
let zOff = 0;
let spritesheet;
let textures = [];

// Function awake
function preload() {
    jsonTemp = loadJSON("../assets/pallettes.json");
    spritesheet = loadImage('assets/flakes32.png');
    roboto = loadFont('../assets/Roboto-Black.ttf');
    vignette = loadImage('../assets/vignette.png');
}

// Function start
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

    gravity = createVector(0, 0.3);
    for (let x = 0; x < spritesheet.width; x += 32) {
        for (let y = 0; y < spritesheet.height; y += 32) {
            let img = spritesheet.get(x, y, 32, 32);
            image(img, x, y);
            textures.push(img);
        }
    }


    for (let i = 0; i < 400; i++) {
        let x = random(width);
        let y = random(height);
        let design = random(textures);
        snow.push(new Snowflake(x, y, design));
    }

}

// Function update
function draw() {

    background(pallettes[indexPallette][0]);

    zOff += 0.01;

    for (let flake of snow) {
        let xOff = flake.pos.x / width;
        let yOff = flake.pos.y / height;
        let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
        let wind = p5.Vector.fromAngle(wAngle);
        wind.mult(0.1);

        flake.applyForce(gravity);
        flake.applyForce(wind);
        flake.update();
        flake.render();
    }

    clock.update();
    clock.show();

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