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

let haveImage = false; // If we have a image link in the params
let isLoaded = false; // Check if image is loaded or not yet
let backgroundImage = null; // The background image if we set a link
let imgError = false; // Do we have troubles loading the image?

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
    vignette = loadImage('../assets/vignette.png');

    if (getURLParams()["imgLink"]) {
        haveImage = true;
        imgLink = window.location.href.substring(window.location.href.indexOf("imgLink=") + 8);
    }
}

function loaded(i) {
    backgroundImage = i;
    isLoaded = true;
}

function loadError(e) {
    console.log(e);
    console.log("Error al carregar la imatge del background!");
    imgError = true;
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

    if (haveImage) {
        isLoaded = false;
        backgroundImage = loadImage(imgLink, loaded, loadError);
    }

    hearts = params.heart == "true";

    const smoothing = params.smooth == "true";
    const showImg = params.image == "true";
    const isAmPm = params.ampm == "true";
    const showDate = params.date == "true";

    colorMode(HSB);

    if (showImg) {
        const clockImg = pallettes[indexPallette][4] === "#FFFFFF" ? clockImgs[0] : clockImgs[1];
        clock = new Clock(smoothing, 0.1, clockImg, isAmPm, showDate);
    } else {
        clock = new Clock(smoothing, 0.1, null, isAmPm, showDate);
    }

}

// Function update
function draw() {
    const pallette = pallettes[indexPallette];
    background(pallette[0]);

    if (backgroundImage && isLoaded) {
        image(backgroundImage, 0, 0, width, height);
    }

    // Show the fireworks
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

    if (imgError) {
        translate(-width / 2, -height / 2);
        textAlign(CENTER);
        textSize(40);
        fill("red");
        stroke("white");
        strokeWeight(2);
        text("ERROR: CANNOT LOAD THE BACKGROUND IMAGE!", width / 2, height / 2);
        text("Try with other link, we are sorry...", width / 2, 50 + height / 2);
        noLoop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}