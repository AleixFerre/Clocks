let selectPallette; // Dropdown of the different pallettes
let div; // The div that all is in
let colors = []; // Actual pallette of colors
let buttons = []; // Clocks' buttons
let links = []; // Absolute links

let indexPallette = 0; // Index of the shown pallette

const pallettes = [
    ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#FFFFFF"],
    ["#1F2041", "#4B3F72", "#FFC857", "#119DA4", "#FFFFFF"],
    ["#314CB6", "#B68CB8", "#6461A0", "#EFBDEB", "#FFFFFF"],
    ["#3D315B", "#444B6E", "#708B75", "#9AB87A", "#FFFFFF"],
    ["#D8CFAF", "#E6B89C", "#ED9390", "#F374AE", "#333333"]
    //... add more!
];

function setup() {
    buttons = selectAll(".clockBtn");
    for (let button of buttons) {
        links.push(button.elt.href);
    }

    div = select("#pallette");
    selectPallette = createSelect();
    selectPallette.parent(div);
    selectPallette.changed(palletteChanged);


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

function palletteChanged() {
    let tempVal = selectPallette.value();
    indexPallette = parseInt(tempVal.charAt(tempVal.length - 1)) - 1;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].elt.href = links[i] + "/?id=" + indexPallette;
    }
}