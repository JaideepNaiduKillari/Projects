document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    cells.forEach(cell => {
        cell.addEventListener('click', () => cellClick(cell));
    });

    function cellClick(cell) {
        const index = cell.dataset.index;

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            switchPlayer();
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                announceWinner(gameBoard[a]);
                return;
            }
        }

        if (!gameBoard.includes('')) {
            announceDraw();
        }
    }

    function announceWinner(player) {
        document.getElementById('result-text').textContent = `${player} wins!`;
        showResultPopup();
        gameActive = false;
    }

    function announceDraw() {
        document.getElementById('result-text').textContent = 'It\'s a draw!';
        showResultPopup();
        gameActive = false;
    }

    function showResultPopup() {
        const resultPopup = document.getElementById('result-popup');
        resultPopup.style.display = 'block';
    }

    window.restartGame = function () {
        const resultPopup = document.getElementById('result-popup');
        resultPopup.style.display = 'none';

        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
        });

        currentPlayer = 'X';
        gameActive = true;
    };
});
