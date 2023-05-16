function newGeneration() {
    calculateFitness();
    for (let i = 0; i < total_population; i++) {
        dinos[i] = pickOne();
    }
    savedDinos = [];
}

function calculateFitness() {
    let sum = 0;
    for (let dino of savedDinos) {
        sum += dino.score;
    }
    for (let dino of savedDinos) {
        dino.fitness = dino.score / sum;

    }
}

function nextGeneration() {

    snake.copy();
}

function pickOne() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r = r - savedDinos[index].fitness;
        index += 1;
    }
    index -= 1;

    return savedDinos[index].copy();
}