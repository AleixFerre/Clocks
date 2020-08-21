// Code by Aleix Ferré
// Github: https://github.com/CatalaHD/
// Sketch: editor.p5js.org/thecatalahd/sketches/kAhhmh1hw

class Firework {
    constructor() {
        this.hu = random(255);
        this.firework = new Particle(random(width), height, true, false);
        this.exploded = false;
        this.particles = [];
        this.nParticles = 100;
    }

    done() {
        return this.exploded && this.particles.length === 0;
    }

    update() {
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();

            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                if (hearts) {
                    this.explodeHeart();
                } else {
                    this.explode();
                }
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(gravity);
            this.particles[i].update();

            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    }

    explode() {
        for (let i = 0; i < this.nParticles; i++) {
            const p = new Particle(this.firework.pos.x, this.firework.pos.y);
            this.particles.push(p);
        }
    }

    explodeHeart() {
        // 8.402045832815858 11.59986097841077 -1.191827649232908 1.699277493167158
        const minimX = 8.402045832815858;
        const minimY = -1.191827649232908;
        const maximX = 11.59986097841077;
        const maximY = 1.699277493167158;

        const scale = random(3, 8);
        const increment = TWO_PI / this.nParticles;

        angleMode(RADIANS);
        for (let a = 0; a < TWO_PI; a += increment) {
            const r = 0.1;
            const x = -r * 16 * pow(sin(a), 3) + 10;
            const y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));

            const newX = map(x, minimX, maximX, -scale, scale);
            const newY = map(y, minimY, maximY, -scale, scale);

            const target = createVector(newX, newY);

            this.particles.push(new Particle(this.firework.pos.x, this.firework.pos.y, false, target));
        }
    }

    show() {
        if (!this.exploded) {
            this.firework.show();
        }

        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    }
}