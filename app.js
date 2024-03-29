import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js"

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const button1 = document.getElementById("start-button");
// const scoreEl = document.querySelector('#scoreEl');

//added some modal support
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");

//modal functions
openBtn.addEventListener("click", () => {
    modal.classList.add("open");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
});

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "pink", false);
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;
// let score = 0;

// function scoreUpdate() {
//     if (enemyController.collisionDetection()) {
//         score += 100;
//         console.log(score);
//         scoreEl.innerHTML = score;
//     } else {

//     }
// }

function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

function displayGameOver() {
    if (isGameOver) {
        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.5 : 5;

        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}

function checkGameOver() {
    if (isGameOver) {
        return;
    }

    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true;
    }
}

// This section below was made with the help of David Reid on youtube

button1.addEventListener("click", function () {
    console.log('start game');
    start();
})


function toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    let display = (toggle) ? 'block' : 'none';
    console.log(display);
    console.log(element);
    element.style.display = display;
}

function start() {
    toggleScreen('start-screen', false);
    toggleScreen('game', true);
    showScore();
    //this is equal to 60 fps which is a comfortable speed for our eyes and computer
    setInterval(game, 1000 / 60);
}

function showScore() {
    var node = document.getElementById('scoreDisplay')
    var visibility = node.style.visibility;
    node.style.visibility = visibility == "visible" ? 'hidden' : "visible"
}

// scoreUpdate();