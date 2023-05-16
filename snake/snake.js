function mutate(x) {
    console.log('mutated');
    if (random(1) < 0.5) {
        let offset = randomGaussian() * 0.5;
        let mutated = offset + x;
        return mutated;
    }
    return x;
}


class Snake {
    constructor(brain) {
        this.body = [];
        this.body[0] = createVector(floor(random(w)), floor(random(h)));
        this.xspeed = 1;
        this.yspeed = 0;
        if (brain instanceof Neuralnetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate);
        } else {
            this.brain = new Neuralnetwork(4, 4, 4);
        }
    }
    copy() {
        return new Snake(this.brain);
    }
    grow() {
        let head = this.body[this.body.length - 1];
        this.body.push(head);
    }
    setDir(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
    endgame() {
        let x = this.body[this.body.length - 1].x
        let y = this.body[this.body.length - 1].y
        if (x < 0 || x > w - 1 || y < 0 || y > h - 1) {
            return true;
        }
        for (let i = 0; i < this.body.length - 1; i++) {
            let head = this.body[0];
            if (head.x == x && head.y == y) {
                return true;
            }
        }
        return false;
    }


    eat(food) {
        let head = this.body[this.body.length - 1];
        if (head.x == food.x && head.y == food.y) {
            this.grow();
            return true;
        }
        return false;
    }

    update() {
        let head = this.body[this.body.length - 1].copy();
        this.body.shift();
        head.x += this.xspeed;
        head.y += this.yspeed;
        this.body.push(head);
    }
    show() {
        for (let i = 0; i < this.body.length; i++) {
            fill(0);
            noStroke();
            rect(this.body[i].x, this.body[i].y, 1, 1);
        }

    }
    think(food) {
        let inputs = [];
        inputs[0] = food.x / w;
        inputs[1] = food.y / h;
        let head = this.body[this.body.length - 1];
        inputs[2] = head.x / w;
        inputs[3] = head.y / h;
        let output = this.brain.feedforward(inputs);
        console.log(output);
        if (output[0] > 0.9) {
            if (this.yspeed != 1)
                this.setDir(0, -1);
        } else if (output[1] > 0.9) {
            if (this.yspeed != -1)
                this.setDir(0, 1);
        } else if (output[2] > 0.9) {
            if (this.xspeed != 1)
                this.setDir(-1, 0);

        } else if (output[3] > 0.9) {
            if (this.xspeed != -1)
                this.setDir(1, 0);

        }

    }

}