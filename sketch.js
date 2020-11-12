let selectPallette; // Dropdown of the different pallettes
let div; // The div that all is in
let colors = []; // Actual pallette of colors
let buttons = []; // Clocks' buttons
let links = []; // Absolute links

let switchSmooth; // The smoothing switcher
let switchAmpm; // The ampm switcher
let switchImg; // The image switcher
let switchDate; // The date switcher

let indexPallette = 0; // Index of the shown pallette
let smooth = false; // Will be the clock smooth?
let ampm = false; // Will be the clock 12h mode?
let clockImg = false; // Will the clock display an image?
let showDate = false; // Will the clock display the date?

let pallettes = []; // Pallettes imported from file
let jsonTemp; // Temporary variable that charges the JSON file

function preload() {
    jsonTemp = loadJSON("./assets/pallettes.json");
}

function setup() {

    // We charge the pallettes
    pallettes = jsonTemp.pallettes;

    buttons = selectAll(".clockBtn");
    for (let button of buttons) {
        links.push(button.elt.href);
    }

    div = select("#pallette");
    selectPallette = createSelect();
    selectPallette.parent(div);
    selectPallette.changed(palletteChanged);

    switchSmooth = select("#smooth");
    switchSmooth.changed(changingSmooth);

    switchAmpm = select("#ampm");
    switchAmpm.changed(changingAmpm);

    switchImg = select("#image");
    switchImg.changed(changingImage);

    switchDate = select("#date");
    switchDate.changed(changingDate);

    for (let i = 0; i < pallettes.length; i++) {
        selectPallette.option("Pallette" + (i + 1));
    }

    // We first get the colors from the URL
    let params = getURLParams();

    if (params.id && !isNaN(params.id)) {
        if (params.id < pallettes.length && params.id >= 0) {
            indexPallette = params.id;
            selectPallette.selected('Pallette' + Number(Number(indexPallette) + 1));
        }
    }

    createCanvas(windowWidth, 200);
    checkLinks();

}

function draw() {
    colors = pallettes[indexPallette];
    let size = floor(width / colors.length);

    background(0);
    noStroke();

    for (let i = 0; i < colors.length; i++) {
        let posX = i * size;
        fill(colors[i]);
        rect(posX, 0, size, height);
    }

    stroke(255, 255, 255, 100);

    line(0, 0, width, 0);
    line(0, height - 1, width, height - 1);
}

function windowResized() {
    resizeCanvas(windowWidth, 200);
}

function checkLinks() {
    // Pallette index
    let tempVal = selectPallette.value();
    indexPallette = parseInt(tempVal.charAt(tempVal.length - 1)) - 1;

    // Smooth
    smooth = switchSmooth.checked();
    clockImg = switchImg.checked();
    ampm = switchAmpm.checked();
    showDate = switchDate.checked();

    updateLinks();
}

function palletteChanged() {
    let tempVal = selectPallette.value();
    indexPallette = parseInt(tempVal.charAt(tempVal.length - 1)) - 1;
    updateLinks();
}

function changingSmooth() {
    smooth = this.checked();
    updateLinks();
}

function changingAmpm() {
    ampm = this.checked();
    updateLinks();
}

function changingImage() {
    clockImg = this.checked();
    updateLinks();
}

function changingDate() {
    showDate = this.checked();
    updateLinks();
}

function updateLinks() {
    for (let i = 0; i < buttons.length; i++) {
        let link = links[i];
        if (link.charAt(link.length - 1) == "/") {
            buttons[i].elt.href = link + "?id=" + indexPallette + "&smooth=" + smooth + "&image=" + clockImg + "&ampm=" + ampm + "&date=" + showDate;
        } else {
            buttons[i].elt.href = link + "&id=" + indexPallette + "&smooth=" + smooth + "&image=" + clockImg + "&ampm=" + ampm + "&date=" + showDate;
        }
    }
}