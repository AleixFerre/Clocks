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

function preload() {
    // We first get the colors from the URL
    params = getURLParams();

    jsonTemp = loadJSON("../assets/pallettes.json");
    roboto = loadFont("../assets/Roboto-Black.ttf");
    vignette = loadImage('../assets/vignette.png');

    showImg = params.stars == "true";

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

    let smoothing = params.smooth == "true";

    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER, CENTER);

    clock = new Clock(smoothing, 0.1);

    let showImg = params.stars == "true";
    const amount = showImg ? 400 : 1000;

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
    for (var i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }

    pop();

    clock.update();
    clock.show();

    // Show the vignette image effect
    image(vignette, 0, 0, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}