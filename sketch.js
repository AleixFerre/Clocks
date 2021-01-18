let selectPallette; // Dropdown of the different pallettes
let div; // The div that all is in
let careta; // emoji link
let colors = []; // Actual pallette of colors
let desiredColors = []; // Actual pallette of colors desired for the effect
let buttons = []; // Clocks' buttons
let links = []; // Absolute links

let extensions = [".png", ".jpg"];

let switchSmooth; // The smoothing switcher
let switchAmpm; // The ampm switcher
let switchImg; // The image switcher
let switchDate; // The date switcher

let indexPallette = 0; // Index of the shown pallette
let smooth = false; // Will be the clock smooth?
let ampm = false; // Will be the clock 12h mode?
let clockImg = false; // Will the clock display an image?
let showDate = false; // Will the clock display the date?
let imgLink = ""; // Backgroung image from the internet

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

    for (let i = 0; i < pallettes.length; i++) {
        selectPallette.option("Pallette " + (i + 1));
    }

    careta = document.getElementById("carita");

    colors = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
    desiredColors = colors;

    switchSmooth = select("#smooth");
    switchSmooth.changed(changingSmooth);

    switchAmpm = select("#ampm");
    switchAmpm.changed(changingAmpm);

    switchImg = select("#image");
    switchImg.changed(changingImage);

    switchDate = select("#date");
    switchDate.changed(changingDate);

    linkText = select("#link");
    linkText.input(changingLink);
    careta.innerHTML = "&#xf11a;";

    // We first get the colors from the URL
    let params = getURLParams();

    if (params.id && !isNaN(params.id)) {
        if (params.id < pallettes.length && params.id >= 0) {
            indexPallette = params.id;
            selectPallette.selected('Pallette ' + Number(Number(indexPallette) + 1));
        }
    }

    let canvas = createCanvas(windowWidth - 40, 200);
    canvas.parent('pallette');
    checkLinks();
    noStroke();
}

function draw() {

    desiredColors = pallettes[indexPallette];

    for (let i = 0; i < desiredColors.length; i++) {
        colors[i] = lerpColor(color(colors[i]), color(desiredColors[i]), 0.1);
    }

    let size = floor(width / colors.length);

    for (let i = 0; i < colors.length; i++) {
        fill(colors[i]);
        rect(i * size, 0, size, height);
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

function testImage(url, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false, timer;
    var img = new Image();
    img.onerror = img.onabort = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "error");
        }
    };
    img.onload = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "success");
        }
    };
    img.src = url;
    timer = setTimeout(function() {
        timedOut = true;
        callback(url, "timeout");
    }, timeout); 
}

function record(url, result) {
    if (result === "success") {        
        careta.innerHTML = "&#xf118;";
        document.getElementById("caritaTxt").innerHTML = "You are good to go!";
        careta.style.color = "green";
    } else {
        careta.innerHTML = "&#xf119;";
        document.getElementById("caritaTxt").innerHTML = "Image not found in that link. Try another one";
        careta.style.color = "#ff5145";
        imgLink = "";
    }
    updateLinks();
}   

function changingLink() {
    console.log("loading...");
    careta.innerHTML = "&#xf110;";
    careta.style.color = "white";

    imgLink = trim(this.elt.value);
    if (imgLink === "") {
        console.log("String buit");
        careta.innerHTML = "&#xf11a;";
        document.getElementById("caritaTxt").innerHTML = "Empty link not allowed!";
        careta.style.color = "white";
        updateLinks();
    } else if (checkURL(imgLink)) {
        testImage(imgLink, record);
    } else {
        console.log("Extensió no valida");
        careta.innerHTML = "&#xf119;";
        document.getElementById("caritaTxt").innerHTML = "Link extension not allowed!";
        careta.style.color = "#ff5145";
        imgLink = "";
        updateLinks();
    }
}

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function updateLinks() {
    for (let i = 0; i < buttons.length; i++) {
        let link = links[i];
        if (link.charAt(link.length - 1) == "/") {
            buttons[i].elt.href = link + "?id=" + indexPallette + "&smooth=" + smooth + "&image=" + clockImg + "&ampm=" + ampm + "&date=" + showDate;
        } else {
            buttons[i].elt.href = link + "&id=" + indexPallette + "&smooth=" + smooth + "&image=" + clockImg + "&ampm=" + ampm + "&date=" + showDate;
        }

        if (imgLink !== "") {
            buttons[i].elt.href += "&imgLink=" + imgLink
        }
    }
}