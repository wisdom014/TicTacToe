const gameBoard = document.getElementById("gameBoard");
const statusDisplay = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const winningLine = document.getElementById("winningLine");

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.setAttribute("data-cell-index", index);
        cellElement.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute("data-cell-index");

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;
    let winningCombination = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCombination = [a, b, c]; // Store the winning combination
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        drawWinningLine(winningCombination); // Call drawWinningLine function
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
}

function drawWinningLine(winningCombination) {
    for (let index of winningCombination) {
        const cell = document.querySelector(`[data-cell-index="${index}"]`);
        cell.classList.add('winning-cell');
    }
    winningLine.style.display = 'block'; // Show the winning line
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    gameBoard.innerHTML = '';
    createBoard();
    winningLine.style.display = 'none'; // Hide the winning line
}

restartBtn.addEventListener("click", restartGame);
createBoard();
statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
