// Code by Aleix Ferré
// Github: https://github.com/CatalaHD/
// Sketch: editor.p5js.org/thecatalahd/sketches/kAhhmh1hw

class Particle {
    constructor(x, y, firework, target) {
        this.pos = createVector(x, y);
        this.firework = firework;
        this.lifespan = random(50, 255);
        this.hu = random(71, 255);
        this.acc = createVector(0, 0);
        this.history = [];

        if (this.firework) {
            this.vel = createVector(random(-2, 2), (height * random(-7, -4)) / 500);
        } else {
            if (target) {
                this.vel = target;
            } else {
                this.vel = p5.Vector.random2D();
                this.vel.mult(random(3, 5));
            }
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        if (this.history.length > 3) {
            this.history.splice(0, 1);
        }

        if (!this.firework) {
            this.vel.mult(random(0.95, 1));
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        let v = createVector(this.pos.x, this.pos.y);
        this.history.push(v);
    }

    done() {
        return this.lifespan < 0;
    }

    show() {
        colorMode(HSB, 255);

        if (!this.firework) {
            strokeWeight(3.5);
            stroke(this.hu, 255, 255, this.lifespan);
        } else {
            strokeWeight(6);
            stroke(this.hu, 255, 255);
        }
        point(this.pos.x, this.pos.y);

        if (!this.firework) {
            colorMode(RGB, 255);
            stroke(255, 255, 255, this.lifespan/2);
            for (let i = 0; i < this.history.length; i++) {
                point(this.history[i].x, this.history[i].y);
            }
        }
    }
}