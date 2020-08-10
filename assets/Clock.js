function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

class Clock {

    constructor(smooth, smoothVel) {
        this.h = hour();
        this.m = minute();
        this.s = second();
        this.isSmooth = smooth;
        this.angles = [];
        this.smoothedAngles = [];
        this.smoothVel = smoothVel || 1;
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
        const pallette = pallettes[indexPallette];

        translate(width / 2, height / 2);
        rotate(-90);

        strokeWeight(8);
        stroke(pallette[1]);
        noFill();
        this.angles[0] = map(this.s, 0, 60, 0, 360);
        this.smoothedAngles[0] = lerp(this.smoothedAngles[0], this.angles[0], this.smoothVel);
        arc(0, 0, 300, 300, 0, this.isSmooth ? this.smoothedAngles[0] : this.angles[0]);

        stroke(pallette[2]);
        this.angles[1] = map(this.m, 0, 60, 0, 360);
        this.smoothedAngles[1] = lerp(this.smoothedAngles[1], this.angles[1], this.smoothVel);
        arc(0, 0, 280, 280, 0, this.isSmooth ? this.smoothedAngles[1] : this.angles[1]);

        stroke(pallette[3]);
        this.angles[2] = map(this.h % 12, 0, 12, 0, 360);
        this.smoothedAngles[2] = lerp(this.smoothedAngles[2], this.angles[2], this.smoothVel);
        arc(0, 0, 260, 260, 0, this.isSmooth ? this.smoothedAngles[2] : this.angles[2]);

        push();
        rotate(this.isSmooth ? this.smoothedAngles[0] : this.angles[0]);
        stroke(pallette[1]);
        line(0, 0, 100, 0);
        pop();

        push();
        rotate(this.isSmooth ? this.smoothedAngles[1] : this.angles[1]);
        stroke(pallette[2]);
        line(0, 0, 75, 0);
        pop();

        push();
        rotate(this.isSmooth ? this.smoothedAngles[2] : this.angles[2]);
        stroke(pallette[3]);
        line(0, 0, 50, 0);
        pop();

        stroke(255);
        point(0, 0);

        rotate(90);
        fill(pallette[4]);
        noStroke();
        textAlign(CENTER);
        text(pad(this.h, 2) + ':' + pad(this.m, 2) + ':' + pad(this.s, 2), 10, 250);
    }


}