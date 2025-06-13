// main 
class Game {
    constructor() {
        this.container = document.getElementById("game-container");
        this.scoreElement = document.getElementById("points");
        this.character = null;
        this.balls = [];
        this.experimentBall = null;
        this.points = 0;
        this.caughtBalls = 0;
        this.maxBalls = 10; // 10 звичайних + 1 експериментальний = 11

        this.setupGame();
        this.setupEvents();
        this.checkCollision();
        this.updateScore();
    }

    setupGame() {
        this.character = new Character();
        this.container.appendChild(this.character.element);
        for (let i = 0; i < this.maxBalls; i++) {
            const ball = new Ball();
            this.balls.push(ball);
            this.container.appendChild(ball.element);
        }
    }

    setupEvents() {
        window.addEventListener("keydown", (e) => this.character.move(e));
        this.checkCollision();
    };

    checkCollision() {
        this.collisionInterval = setInterval(() => {
            this.balls.forEach((ball, index) => {
                if (this.character.collidesWith(ball)) {
                    // Якщо зіткнення — видаляємо м'яч, додаємо бали
                    this.container.removeChild(ball.element);
                    this.balls.splice(index, 1);
                    this.points += 10;
                    this.caughtBalls += 1;
                    this.updateScore();

                    //показуємо експериментальний після 10!!!
                    if (this.caughtBalls === this.maxBalls && !this.experimentBall) {
                        this.showExperimentBall();
                    }

                    // Game Over(11)
                    if (this.caughtBalls === this.maxBalls + 1) {
                        this.endGame();
                    }
                }
            });

            // Перевірка експериментального м'яча...
            if (this.experimentBall && this.character.collidesWith(this.experimentBall)) {
                // Якщо зіткнення то видаляємо експериментальний м'яч, додаємо бали
                this.container.removeChild(this.experimentBall.element);
                this.experimentBall = null;
                this.points += 10;
                this.caughtBalls += 1;
                this.updateScore();

                // Game Over
                if (this.caughtBalls === this.maxBalls + 1) {
                    this.endGame();
                }
            }
        }, 100);
    }

    showExperimentBall() {
        this.experimentBall = new ExperimentBall();
        this.container.appendChild(this.experimentBall.element);
    }

    updateScore() {
        if (this.scoreElement) {
            this.scoreElement.textContent = `Points: ${this.points}`;
        }
    }

    endGame() {
        clearInterval(this.collisionInterval);
        setTimeout(() => {
            alert("You caught the experiment! \nYour score: " + this.points);
            window.location.reload();
        }, 100);
    }
}

class Character {
    constructor() {
        this.x = 50;
        this.y = 300;
        this.width = 59;
        this.height = 80;
        this.speed = 10;
        this.element = document.createElement("div");
        this.element.classList.add("character");
        this.updatePosition();
    }
    move(event) {
        if (event.key === "ArrowRight") {
            this.x += this.speed;
        } else if (event.key === "ArrowLeft") {
            this.x -= this.speed;
        } else if (event.key === "ArrowUp") {
            this.y -= this.speed;
        } else if (event.key === "ArrowDown") {
            this.y += this.speed;
        }
        this.updatePosition();
    }
    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
    collidesWith(objeto) {
        // Перевірка зіткнення 
        return (
            this.x < objeto.x + objeto.width &&
            this.x + this.width > objeto.x &&
            this.y < objeto.y + objeto.height &&
            this.y + this.height > objeto.y
        );
    }
}

class Ball {
    constructor() {
        this.x = Math.random() * 700 + 50;
        this.y = Math.random() * 250 + 50;
        this.width = 30;
        this.height = 30;
        this.element = document.createElement("div");
        this.element.classList.add("balls");
        this.updatePosition();
    }
    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
}


class ExperimentBall {
    constructor() {
        this.x = Math.random() * 700 + 50;
        this.y = Math.random() * 250 + 50;
        this.width = 30;
        this.height = 30;
        this.element = document.createElement("div");
        this.element.classList.add("experiment-ball");
        this.updatePosition();
    }
    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
}

const game = new Game();