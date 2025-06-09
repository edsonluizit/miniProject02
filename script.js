const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = "X";
let isGameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // -
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // |
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let cond of winConditions) {
        const [a, b, c] = cond;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${board[a]} wins!`;
            isGameActive = false;
            return;
        }
    }
    if (!board.includes('')) {
        statusText.textContent = "It's a draw!";
        isGameActive = false
    }
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (!board[index] && isGameActive) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWinner();
        if (isGameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true
    currentPlayer = 'X';
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame)