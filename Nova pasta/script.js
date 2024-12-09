const board = document.getElementById("game-board");
const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let gameInterval;

// Inicializa o jogo
function startGame() {
  drawBoard();
  placeFood();
  gameInterval = setInterval(updateGame, 200);
}

// Atualiza o jogo a cada intervalo
function updateGame() {
  moveSnake();
  if (isGameOver()) {
    clearInterval(gameInterval);
    alert("Game Over! Press OK to restart.");
    resetGame();
  } else {
    drawBoard();
  }
}

// Movimenta a cobra
function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    placeFood();
  } else {
    snake.pop(); // Remove o último segmento, a menos que coma a comida
  }
}

// Desenha o tabuleiro e a cobra
function drawBoard() {
  board.innerHTML = "";
  snake.forEach(segment => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Adiciona comida aleatoriamente
function placeFood() {
  food = {
    x: Math.floor(Math.random() * boardSize) + 1,
    y: Math.floor(Math.random() * boardSize) + 1,
  };
}

// Checa se o jogo acabou
function isGameOver() {
  const head = snake[0];
  return (
    head.x < 1 ||
    head.x > boardSize ||
    head.y < 1 ||
    head.y > boardSize ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  );
}

// Reinicia o jogo
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  placeFood();
  startGame();
}

// Detecta teclas pressionadas para controlar a cobra
window.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Estilo para a cobra e comida
const style = document.createElement("style");
style.innerHTML = `
  .snake {
    background-color: #5BC2E7;
    border: 1px solid #000;
  }

  .food {
    background-color: red;
    border-radius: 50%;
  }
`;
document.head.appendChild(style);

// Inicia o jogo
startGame();
