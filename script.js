// HTML Elements
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');
import { snow } from "./utils/snow.js";
console.log(board)
console.log(startButton)

await snow();

let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;
const gameSpeed = 100;

const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
};

const directions = {
    
    ArrowUp: -10,   
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1,
};  

const setDirection = newDirection => {
    direction = newDirection;
}

const directionEvent = key => {
    switch(key.code) {
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code);
            break;
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code);
            break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code);
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code);
            break;
    }
}

const moveSnake = () => {
    
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction])
        .padStart(2, '0');
        const [row, column] = newSquare.split('');

        if( newSquare < 0 ||
        newSquare > 99 ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == 9) ||
        boardSquares[row][column] === squareTypes.snakeSquare) {
        gameOver();
    } else {
        snake.push(newSquare);
        if(boardSquares[row][column] === squareTypes.foodSquare) {
            
            addFood();
        } else {
            const emptySquare = snake.shift();
            drawSquare(emptySquare, 'emptySquare');
        }
        
        drawSnake();
        
    }
}

const gameOver = () => {
    gameOverSign.style.display = 'block';
    clearInterval(moveInterval);
    startButton.disabled = false;
    
}

const addFood = () => {
    score++;
    updateScore();
    drawFood();
}
const updateScore = () => {
    scoreBoard.innerText = score;
}
const createBoard = () => {
    boardSquares.forEach( (row, rowIndex) => {
        row.forEach( (column, columnIndex) => {
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('id', squareValue);
            squareElement.setAttribute('class', 'square emptySquare');
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        })
    })

    drawSnake();
    drawFood();
}

const drawSnake = () => {
    snake.forEach((square, index) => {
        drawSquare(square, squareTypes.snakeSquare);

    });
}
const drawFood = () => {
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const randomEmptySquare = emptySquares[randomIndex];
    
    emptySquares.splice(randomIndex, 1);
    drawSquare(randomEmptySquare, squareTypes.foodSquare);
    }
const drawSquare = (square, type) => {
    const [row, column] = square.split('');
    boardSquares[row][column] = type;
    const squareElement = document.getElementById(square);
    
    if (type === squareTypes.foodSquare) {
    squareElement.setAttribute('class', 'square foodSquare');
    emptySquares = emptySquares.filter(s => s !== square);
    }else if (type === squareTypes.snakeSquare) {
        squareElement.setAttribute('class', 'square snakeSquare');
        emptySquares = emptySquares.filter(s => s !== square);
    }else {
    emptySquares = [...emptySquares, square];
    squareElement.setAttribute('class', 'square emptySquare');
    }
}
const eliminateBoard = () => {
    board.innerHTML = '';
}
const resetScore = () => {
    scoreBoard.innerText = 0;
}
const setGame = () => {
    eliminateBoard();
    resetScore();
    snake = ['00', '01', '02', '03'];
    score = snake.length - 4;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(10), () => new Array(10).fill(squareTypes.emptySquare));
    emptySquares = [];
    createBoard();
    if (window.innerWidth < 700) {
        board.classList.add('mobile');
      } else {
        board.classList.remove('mobile');
      }
}

const startGame = () => {
    setGame();
    gameOverSign.style.display = 'none';
    addEventListener('keydown', directionEvent);
    moveInterval = setInterval( () => moveSnake(), gameSpeed);
    startButton.disabled = true;
}

startButton.addEventListener('click', startGame);