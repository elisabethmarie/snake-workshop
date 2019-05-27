const SQUARE_WIDTH = 10;
const SQUARE_FILL_COLOR = "#FFF786";
const SQUARE_STROKE_COLOR = "mediumaquamarine";
const SPEED = 10;
let snake = [];
const canvas = document.getElementById("gameCanvas");
const WIDTH = canvas.width;
const HEIGHT = canvas.width;
let dy = 0;
let dx = SPEED;
let x = 10;
let y = 10;

let food = {
  x: 50,
  y: 90
};

let snakeGrowth = 4;

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  foodCollision();
  collisionDetection();
  drawSnake();
  drawFood();
  moveSnake();
  setTimeout(main, 100);
}

function generateRandomFoodPlacement() {
  const x = Math.round((Math.random() * canvas.width - 10) / 10) * 10;
  const y = Math.round((Math.random() * canvas.height - 10) / 10) * 10;
  food = { x, y };
}

function drawFood() {
  drawSquare(food.x, food.y, "#FF4238");
}

function foodCollision() {
  if (food.x === x && food.y === y) {
    snakeGrowth += 2;
    generateRandomFoodPlacement();
  }
}

function gameOver() {
  window.alert(`Game over! Score: ${snake.length}`);
  snake = [];
  x = 10;
  y = 10;
  dx = 10;
  dy = 0;
  snakeGrowth = 5;
  generateRandomFoodPlacement();
}

function collisionDetection() {
  if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) {
    gameOver();
  }

  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === x && snake[i].y === y) {
      gameOver();
    }
  }
}

const ctx = gameCanvas.getContext("2d");
document.addEventListener("keydown", changeDirection);

drawSquare(20, 20);

function drawSquare(x, y, fill) {
  ctx.font = "10px Tahoma";
  ctx.fillText(`Score: ${snake.length}`, 240, 25);
  ctx.strokeStyle = SQUARE_STROKE_COLOR;
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
  ctx.strokeRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
}

function moveSnake() {
  snake.unshift({
    x: x + dx,
    y: y + dy
  });
  x += dx;
  y += dy;

  if (snakeGrowth > 0) {
    snakeGrowth--;
  } else {
    snake.pop();
  }
}

function drawSnake() {
  for (const square of snake) {
    drawSquare(square.x, square.y, SQUARE_FILL_COLOR);
  }
}

main();

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  if (keyPressed === LEFT_KEY) {
    dx = -SPEED;
    dy = 0;
  }

  if (keyPressed === UP_KEY) {
    dx = 0;
    dy = -SPEED;
  }

  if (keyPressed === RIGHT_KEY) {
    dx = SPEED;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY) {
    dx = 0;
    dy = SPEED;
  }
}
