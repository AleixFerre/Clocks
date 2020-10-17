function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const imgSize = 450; // Should be equal w & h
const alpha = 255; // Alpha 0-255

class Clock {

    constructor(smooth, smoothVel, img, ampm) {
        this.h = hour();
        this.m = minute();
        this.s = second();
        this.isSmooth = smooth;
        this.angles = [];
        this.smoothedAngles = [];
        this.smoothVel = smoothVel || 0.1;
        this.img = img;
        this.ampm = ampm;
        this.setupClock();
    }

    setupClock() {

        // Smoothed Values
        for (let i = 0; i < 3; i++) {
            this.smoothedAngles[i] = 0;
        }

        // Non Smoothed Values
        this.angles[0] = second();
        this.angles[1] = minute();
        this.angles[2] = hour();

        angleMode(DEGREES);
        textFont(roboto);
        textSize(100);
    }

    update() {
        this.h = hour();
        this.m = minute();
        this.s = second();
    }

    show() {

        angleMode(DEGREES);
        const pallette = pallettes[indexPallette];

        this.updateAngles();

        translate(width / 2, height / 2);

        if (this.img) {
            // We are in the middle of the screen
            image(this.img, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
        }

        rotate(-90);

        const color1 = color(pallette[1]);
        color1.setAlpha(alpha);
        const color2 = color(pallette[2]);
        color2.setAlpha(alpha);
        const color3 = color(pallette[3]);
        color3.setAlpha(alpha);
        const color4 = color(pallette[4]);
        //color4.setAlpha(alpha);

        strokeWeight(8);
        stroke(color1);
        noFill();
        arc(0, 0, 300, 300, 0, this.isSmooth ? this.smoothedAngles[0] : this.angles[0]);

        stroke(color2);
        arc(0, 0, 280, 280, 0, this.isSmooth ? this.smoothedAngles[1] : this.angles[1]);

        stroke(color3);
        arc(0, 0, 260, 260, 0, this.isSmooth ? this.smoothedAngles[2] : this.angles[2]);

        push();
        rotate(this.isSmooth ? this.smoothedAngles[0] : this.angles[0]);
        strokeWeight(4);
        stroke(color1);
        line(-30, 0, 100, 0);
        pop();

        push();
        rotate(this.isSmooth ? this.smoothedAngles[1] : this.angles[1]);
        stroke(color2);
        strokeWeight(6);
        line(0, 0, 75, 0);
        pop();

        push();
        rotate(this.isSmooth ? this.smoothedAngles[2] : this.angles[2]);
        strokeWeight(8);
        stroke(color3);
        line(0, 0, 50, 0);
        pop();

        stroke(pallette[0]);
        strokeWeight(15);
        point(0, 0);

        stroke(255);
        strokeWeight(8);
        point(0, 0);

        rotate(90);
        fill(color4);
        noStroke();
        textAlign(CENTER);
       
        let hora = this.h;
        if (this.ampm) {
            let isAM = this.h < 12;
            if (this.h === 12) {
                hora = 12;
                isAM = true;
            } else {
                hora = this.h % 12;
            }
            textSize(30);
            text(isAM ? "AM" : "PM", 240, 300);
        }
        textSize(100);
        text(pad(hora, 2) + ':' + pad(this.m, 2) + ':' + pad(this.s, 2), 10, 300);
    }

    updateAngles() {
        // Angles
        this.angles[0] = map(this.s, 0, 60, 0, 360);
        this.angles[1] = map(this.m, 0, 60, 0, 360);
        this.angles[2] = map(this.h % 12, 0, 12, 0, 360);

        // Smoothed angles
        if (this.isSmooth) {
            this.smoothedAngles[0] = lerp(this.smoothedAngles[0], this.angles[0], this.smoothVel);
            this.smoothedAngles[1] = lerp(this.smoothedAngles[1], this.angles[1], this.smoothVel);
            this.smoothedAngles[2] = lerp(this.smoothedAngles[2], this.angles[2], this.smoothVel);
        }
    }


}