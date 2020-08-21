// Code by Aleix Ferre
// GitHub: https://github.com/CatalaHD
// Based on Daniel Shiffman's code
// Coding Challenge #1

class Star {
    constructor(isImg) {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);
        this.pz = this.z;
        this.isImg = isImg;
    }

    update() {
        this.z = this.z - speed;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.pz = this.z;
        }
    }

    show() {
        fill(255, 255, 255, 50);
        noStroke();

        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);


        if (this.isImg) {
            let r = map(this.z, 0, width, 40, 1);
            this.showStar(sx, sy, r);
        } else {
            let r = map(this.z, 0, width, 16, 0);
            ellipse(sx, sy, r);
        }

        var px = map(this.x / this.pz, 0, 1, 0, width);
        var py = map(this.y / this.pz, 0, 1, 0, height);

        this.pz = this.z;

        stroke(255);
        strokeWeight(3);
        line(px, py, sx, sy);
    }

    showStar(sx, sy, r) {
        imageMode(CENTER, CENTER);
        image(starGlow, sx, sy, r, r);
    }
}