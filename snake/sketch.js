let food;
let snake;
let rez = 20;
let w;
let h;
let font, fontsize = 40;
let highscore = 0;
let generation = 0;
let population = 1;
let foodcount = 1;
let score = 0;

function setup() {
    createCanvas(400, 400);
    textFont();
    textSize(fontsize);
    textAlign(RIGHT, RIGHT);
    w = floor(width / rez);
    h = floor(height / rez);
    snake = new Snake();
    frameRate(5);
    createFood();

}

function draw() {
    scale(rez);
    background(220);
    if (snake.eat(food)) {
        createFood();
        score += 1;
    }
    snake.show();
    snake.update();
    snake.think(food);
    if (snake.endgame()) {
        snake.body = [];
        snake.body[0] = createVector(floor(random(w)), floor(random(h)))
        score = 0;
        if (score > highscore) {
            highscore = score;
        }
        console.log("game over");
        nextGeneration();
        generation += 1;
        //  noLoop();
    }
    fill(255, 0, 0);
    noStroke();
    rect(food.x, food.y, 1, 1);
    // text("score : " + foodcount, width - 10, height - 45);
    // text("highscore : " + highscore, width - 10, height - 40);
    // text("generation : " + generation, width - 10, height - 35);
    // console.log('score=' + score);
    // console.log('highscore=' + highscore);
    // console.log('generation=' + generation);



}

function createFood() {
    foodcount += 1;
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x, y);

}

function keyPressed() {
    if (key === 's') {
        noLoop();
    }
}

// function keyPressed() {
//     if (keyCode === UP_ARROW) {
//         if (snake.yspeed != 1)
//             snake.setDir(0, -1);
//     } else if (keyCode === DOWN_ARROW) {
//         if (snake.yspeed != -1)
//             snake.setDir(0, 1);
//     } else if (keyCode === LEFT_ARROW) {
//         if (snake.xspeed != 1)
//             snake.setDir(-1, 0);
//     } else if (keyCode === RIGHT_ARROW) {
//         if (snake.xspeed != -1)
//             snake.setDir(1, 0);
//     }
// }