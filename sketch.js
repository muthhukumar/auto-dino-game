let lineup = 50;
let stones = [];
let stone;
var dinoImage;
let b = 1;
let abstacles = [];
let dinos = [];
let font, fontsize = 40;
const total_population = 400;
let savedDinos = [];
let highscore = 0;
let generation = 0;

function preload() {
    //dinoImage = loadImage('./assest/dino.png');
    //font = loadFont('assets/SourceSansPro-Regular.otf');
}

function setup() {
    createCanvas(1080, 480);
    textFont();
    textSize(fontsize);
    textAlign(RIGHT, RIGHT);
    for (let i = 0; i < total_population; i++) {
        dinos.push(new Dino());
    }
    stone = new Path();
    stone.getPosition();
    abstacles.push(new Cactus());
}

function draw() {
    background(240);

    createAbstacle();

    line(0, height - lineup, width, height - lineup);

    for (let i = abstacles.length - 1; i >= 0; i--) {
        abstacles[i].show();
        for (let j = dinos.length - 1; j >= 0; j--) {
            if (dinos[j].hits(abstacles[i])) {
                savedDinos.push(dinos.splice(j, 1)[0]);
            }
        }
        if (abstacles[i].offscreen()) {
            abstacles.splice(i, 1);
        }
    }
    // if (Math.floor(b * 0.2) % 10 == 0) {
    //     for (let i = 0; i < abstacles.length; i++) {
    //         abstacles[i].velocityX -= 1;
    //     }
    //     console.log('increased');
    // }
    text("score : " + Math.floor(b * 0.2), width - 50, height - 450);
    text("highscore : " + highscore, width - 50, height - 400);
    text("generation : " + generation, width - 50, height - 350);
    text("Alive : " + dinos.length, width - 50, height - 300);
    b += 1;
    for (let dino of dinos) {
        dino.show();
        dino.move();
        dino.think(abstacles);
    }


    if (dinos.length === 0) {
        if (b * 0.2 > highscore) {
            highscore = Math.floor(b * 0.2);
        }
        generation += 1;
        newGeneration();
        abstacles = [];
        b = 0;
        abstacles.push(new Cactus());
    }


}

function createAbstacle() {
    // if (Math.random(1) < 0.001) {
    //     //
    //     {
    //         abstacles.push(new Bird());
    //     }
    // } else if (abstacles.length === 0) {
    //     abstacles.push(new Bird());
    // }
    if (Math.random(1) > 0.5) {
        if (frameCount % 80 == 0) {
            abstacles.push(new Cactus());
        }
    } else {
        // if (frameCount % 60 == 0) {
        //     abstacles.push(new Cactus());
        // }

    }


}


function keyPressed() {
    if (key === 's') {
        noLoop();
    }
}