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

let haveImage = false; // If we have a image link in the params
let isLoaded = false; // Check if image is loaded or not yet
let backgroundImage = null; // The background image if we set a link
let imgError = false; // Do we have troubles loading the image?


// Snowy things
const snow = [];
let gravity;
let zOff = 0;
let spritesheet;
const textures = [];
const clockImgs = []; // The clock img

// Function awake
function preload() {
    clockImgs[0] = loadImage('../assets/hours-w.png');
    clockImgs[1] = loadImage('../assets/hours-b.png');
    jsonTemp = loadJSON("../assets/pallettes.json");
    spritesheet = loadImage('assets/flakes32.png');
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

    const smoothing = params.smooth == "true";
    const showImg = params.image == "true";
    const isAmPm = params.ampm == "true";
    const showDate = params.date == "true";

    if (showImg) {
        const clockImg = pallettes[indexPallette][4] === "#FFFFFF" ? clockImgs[0] : clockImgs[1];
        clock = new Clock(smoothing, 0.1, clockImg, isAmPm, showDate);
    } else {
        clock = new Clock(smoothing, 0.1, null, isAmPm, showDate);
    }

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

    if (backgroundImage && isLoaded) {
        image(backgroundImage, 0, 0, width, height);
    }

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