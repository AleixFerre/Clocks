// Code by Aleix Ferre
// GitHub: https://github.com/CatalaHD
// Sketch: https://editor.p5js.org/thecatalahd/sketches/n75-txP0w
// Based on Daniel Shiffman's code
// https://thecodingtrain.com/CodingChallenges/001-starfield.html

let stars = [];

const globalStarSize = 0;

const starTypes = [{
        name: "starGlow.png",
        img: null,
        minSize: 0 + globalStarSize,
        maxSize: 2 + globalStarSize
    },
    {
        name: "starGlow2.png",
        img: null,
        minSize: 2 + globalStarSize,
        maxSize: 4 + globalStarSize
    },
    // {
    //     name: "starGlow3.png",
    //     img: null,
    //     size: 4 + globalStarSize
    // }
];

let roboto; // Font
const speed = 3;
let indexPallette = 0; // Index of the shown pallette

let clock;

let pallettes = []; // Pallettes imported from file
let jsonTemp; // Temporary variable that charges the JSON file
let vignette; // The vignette effect image

let params;
let showImg;
let isAmPm;
let clockImgs = [];
let showClockImg;

function preload() {
    // We first get the colors from the URL
    params = getURLParams();
    jsonTemp = loadJSON("../assets/pallettes.json");
    roboto = loadFont("../assets/Roboto-Black.ttf");
    vignette = loadImage('../assets/vignette.png');

    showImg = params.stars == "true";
    showClockImg = params.image == "true";
    isAmPm = params.ampm == "true";

    if (showClockImg) {
        clockImgs[0] = loadImage('../assets/hours-w.png');
        clockImgs[1] = loadImage('../assets/hours-b.png');
    }

    if (showImg) {
        for (let i = 0; i < starTypes.length; i++) {
            starTypes[i].img = loadImage('./assets/' + starTypes[i].name);
        }
    }
}

function setup() {

    // We charge the pallettes
    pallettes = jsonTemp.pallettes;

    if (params.id && !isNaN(params.id)) {
        if (params.id < pallettes.length && params.id >= 0) {
            indexPallette = params.id;
        }
    }

    const smoothing = params.smooth == "true";
    const showDate = params.date == "true";

    createCanvas(windowWidth, windowHeight);

    if (showClockImg) {
        let clockImg = pallettes[indexPallette][4] === "#FFFFFF" ? clockImgs[0] : clockImgs[1];
        clock = new Clock(smoothing, 0.1, clockImg, isAmPm, showDate);
    } else {
        clock = new Clock(smoothing, 0.1, null, isAmPm, showDate);
    }

    const amount = showImg ? 600 : 1000;

    for (let i = 0; i < amount; i++) {
        if (showImg) {
            const type = random(starTypes);
            stars[i] = new Star(type);
        } else {
            stars[i] = new Star();
        }
    }
}

function draw() {

    background(pallettes[indexPallette][0]);

    push();
    translate(width / 2, height / 2);

    // Update and show all the particles
    imageMode(CENTER, CENTER);
    for (var i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }

    pop();

    imageMode(CORNER);
    clock.update();
    clock.show();

    // Show the vignette image effect
    image(vignette, -width / 2, -height / 2, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}