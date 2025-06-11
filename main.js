// main 
class Game {
    constructor() {
        this.container = document.getElementById("game-container");
        this.scoreElement = document.getElementById("score");
        this.player = null;
        this.experiments = [];
        this.score = 0;

        this.setupGame(); // створити гру (екран, персонажа, експерименти)
        this.setupEvents(); // додати події клавіатури, миші і т.д.
    }
}