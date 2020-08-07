// Code by Aleix Ferré
// Github: https://github.com/CatalaHD/
// Sketch: editor.p5js.org/thecatalahd/sketches

class Particle {
    constructor(x, y, hu, firework) {
        this.pos = createVector(x, y);
        this.firework = firework;
        this.lifespan = random(50, 255);
        this.hu = random(71, 255);
        this.acc = createVector(0, 0);
        this.prevPos = createVector(x, y);
        if (this.firework) {
            this.vel = createVector(0, (height * random(-7, -4)) / 500);
        } else {
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(1.5, 3.5));
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.prevPos = p5.Vector.sub(this.pos, this.vel);

        if (!this.firework) {
            this.vel.mult(random(0.95, 1));
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    done() {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }

    show() {
        colorMode(HSB, 255);

        if (!this.firework) {
            strokeWeight(3);
            stroke(this.hu, 255, 255, this.lifespan);
        } else {
            strokeWeight(6);
            stroke(this.hu, 255, 255);
        }
        point(this.pos.x, this.pos.y);

        if (!this.firework) {
            colorMode(RGB, 255);
            stroke(255, 255, 255, this.lifespan);
            point(this.prevPos.x, this.prevPos.y);
        }
    }
}