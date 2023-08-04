const map = document.querySelector(".map");
const dino = document.querySelector(".dino");
const cactus = document.querySelector(".cactus");
const bird = document.querySelector(".bird");
const scoreText = document.querySelector(".score");
const startButton = document.querySelector(".start_button");

let gameInterval;
let isJumping = false;
let position = 50;
let score = 0;
let speed = 10;
let obstacles = ["cactus", "bird"];
let obstaclePosition = 550;
let nextObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
let backgroundPosition = 0;

function handleKeyDown(event) {
    if (event.code === "Space") {
      if (!isJumping) {
        isJumping = true;
  
        let upInterval = setInterval(() => {
          if (position >= 200) {
            clearInterval(upInterval);
  
            let downInterval = setInterval(() => {
              if (position <= 50) {
                clearInterval(downInterval);
                isJumping = false;
              } else {
                position -= 10;
                dino.style.bottom = position + "px";
              }
            }, 20);
          } else {
            position += 10;
            dino.style.bottom = position + "px";
          }
        }, 20);
      }
    }
}

function updateScore() {
    scoreText.innerHTML = `Score : ${score}`;
  }
  
  function checkAvoid() {
    if (obstaclePosition < -30) {
      obstaclePosition = 550;
      score++;
      updateScore();
      speed += 0.5;
      nextObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
    }
  }
  
  function updateObstaclePosition() {
    obstaclePosition -= speed;
  
    if (nextObstacle === "cactus") {
      cactus.style.right = 550 - obstaclePosition + "px";
    } else if (nextObstacle === "bird") {
      bird.style.right = 550 - obstaclePosition + "px";
    }
  }
  
  function checkObstacleCollision() {
    if (nextObstacle === "cactus") {
      if (obstaclePosition < 100 && obstaclePosition > 20 && position < 120) {
        gameOver();
      }
    } else if (nextObstacle === "bird") {
      if (obstaclePosition < 50 && obstaclePosition > 0 && position > 80) {
        gameOver();
      }
    }
  }
  
  function gameOver() {
    clearInterval(gameInterval);
    startButton.style.display = "block";
  }
  
  function moveBackground() {
    backgroundPosition -= speed;
    map.style.left = backgroundPosition + "px";
    if (backgroundPosition < -500) backgroundPosition += 500;
  }
  
  function gameInit() {
    obstaclePosition = 550;
    cactus.style.right = "-55px";
    bird.style.right = "-50px";
    score = 0;
    updateScore();
    speed = 10;
  }

startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    gameInit();
    nextObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
  
    gameInterval = setInterval(() => {
      updateObstaclePosition();
      checkAvoid();
      moveBackground();
      checkObstacleCollision();
    }, 20);
  
    document.addEventListener("keydown", handleKeyDown);
});