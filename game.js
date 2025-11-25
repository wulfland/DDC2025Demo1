// Game Constants
const ROWS = 6;
const COLS = 7;
const PLAYERS = {
    RED: 'red',
    YELLOW: 'yellow'
};

// Game State
class GameEngine {
    constructor() {
        this.board = this.createEmptyBoard();
        this.currentPlayer = PLAYERS.RED;
        this.gameStatus = 'playing'; // 'playing', 'won', 'draw'
        this.winner = null;
        this.winningCells = null;
        this.scores = { red: 0, yellow: 0 };
        this.moveHistory = [];
        this.canUndo = false;
        this.gamesPlayed = 0;
    }

    createEmptyBoard() {
        return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
    }

    isValidMove(col) {
        return this.board[0][col] === null;
    }

    getLowestRow(col) {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (this.board[row][col] === null) {
                return row;
            }
        }
        return null;
    }

    makeMove(col) {
        if (this.gameStatus !== 'playing' || !this.isValidMove(col)) {
            return null;
        }

        const row = this.getLowestRow(col);
        if (row === null) return null;

        this.board[row][col] = this.currentPlayer;
        this.moveHistory.push({ player: this.currentPlayer, row, col, timestamp: Date.now() });
        this.canUndo = true;

        const winningLine = this.checkWin(row, col);
        if (winningLine) {
            this.handleWin(winningLine);
        } else if (this.isBoardFull()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }

        return { row, col };
    }

    checkWin(row, col) {
        const player = this.board[row][col];
        const directions = [
            { dr: 0, dc: 1 },   // Horizontal
            { dr: 1, dc: 0 },   // Vertical
            { dr: 1, dc: 1 },   // Diagonal \
            { dr: 1, dc: -1 }   // Diagonal /
        ];

        for (const dir of directions) {
            const line = this.getLine(row, col, dir, player);
            if (line.length >= 4) {
                return line.slice(0, 4);
            }
        }

        return null;
    }

    getLine(row, col, direction, player) {
        const line = [{ row, col }];

        // Check forward direction
        let r = row + direction.dr;
        let c = col + direction.dc;
        while (this.isInBounds(r, c) && this.board[r][c] === player) {
            line.push({ row: r, col: c });
            r += direction.dr;
            c += direction.dc;
        }

        // Check backward direction
        r = row - direction.dr;
        c = col - direction.dc;
        while (this.isInBounds(r, c) && this.board[r][c] === player) {
            line.unshift({ row: r, col: c });
            r -= direction.dr;
            c -= direction.dc;
        }

        return line;
    }

    isInBounds(row, col) {
        return row >= 0 && row < ROWS && col >= 0 && col < COLS;
    }

    isBoardFull() {
        return this.board[0].every(cell => cell !== null);
    }

    handleWin(winningCells) {
        this.gameStatus = 'won';
        this.winner = this.currentPlayer;
        this.winningCells = winningCells;
        this.scores[this.currentPlayer]++;
        this.canUndo = false;
    }

    handleDraw() {
        this.gameStatus = 'draw';
        this.canUndo = false;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === PLAYERS.RED ? PLAYERS.YELLOW : PLAYERS.RED;
    }

    undoLastMove() {
        if (!this.canUndo || this.moveHistory.length === 0) {
            return false;
        }

        const lastMove = this.moveHistory.pop();
        this.board[lastMove.row][lastMove.col] = null;
        this.currentPlayer = lastMove.player;
        this.canUndo = false;

        if (this.gameStatus !== 'playing') {
            this.gameStatus = 'playing';
            this.winner = null;
            this.winningCells = null;
        }

        return true;
    }

    newGame() {
        this.board = this.createEmptyBoard();
        this.gamesPlayed++;
        this.currentPlayer = this.gamesPlayed % 2 === 0 ? PLAYERS.RED : PLAYERS.YELLOW;
        this.gameStatus = 'playing';
        this.winner = null;
        this.winningCells = null;
        this.moveHistory = [];
        this.canUndo = false;
    }

    restartGame() {
        const startingPlayer = this.moveHistory.length > 0 ? this.moveHistory[0].player : PLAYERS.RED;
        this.board = this.createEmptyBoard();
        this.currentPlayer = startingPlayer;
        this.gameStatus = 'playing';
        this.winner = null;
        this.winningCells = null;
        this.moveHistory = [];
        this.canUndo = false;
    }

    resetScores() {
        this.scores = { red: 0, yellow: 0 };
    }
}

// UI Controller
class GameUI {
    constructor() {
        this.engine = new GameEngine();
        this.boardElement = document.getElementById('game-board');
        this.currentPlayerElement = document.getElementById('current-player');
        this.redScoreElement = document.getElementById('red-score');
        this.yellowScoreElement = document.getElementById('yellow-score');
        this.undoBtn = document.getElementById('undo-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.newGameBtn = document.getElementById('new-game-btn');
        this.winModal = document.getElementById('win-modal');
        this.drawModal = document.getElementById('draw-modal');
        
        this.initBoard();
        this.bindEvents();
        this.updateUI();
    }

    initBoard() {
        this.boardElement.innerHTML = '';
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => this.handleCellClick(col));
                this.boardElement.appendChild(cell);
            }
        }
    }

    bindEvents() {
        this.undoBtn.addEventListener('click', () => this.handleUndo());
        this.restartBtn.addEventListener('click', () => this.handleRestart());
        this.newGameBtn.addEventListener('click', () => this.handleNewGame());
        
        document.getElementById('modal-new-game').addEventListener('click', () => {
            this.hideModal(this.winModal);
            this.handleNewGame();
        });
        document.getElementById('modal-close').addEventListener('click', () => {
            this.hideModal(this.winModal);
        });
        document.getElementById('draw-new-game').addEventListener('click', () => {
            this.hideModal(this.drawModal);
            this.handleNewGame();
        });
        document.getElementById('draw-close').addEventListener('click', () => {
            this.hideModal(this.drawModal);
        });
    }

    handleCellClick(col) {
        if (this.engine.gameStatus !== 'playing') return;

        const result = this.engine.makeMove(col);
        if (result) {
            this.animatePieceDrop(result.row, result.col);
            this.updateUI();
            
            if (this.engine.gameStatus === 'won') {
                setTimeout(() => this.showWinModal(), 1000);
            } else if (this.engine.gameStatus === 'draw') {
                setTimeout(() => this.showDrawModal(), 1000);
            }
        }
    }

    animatePieceDrop(row, col) {
        const cells = this.boardElement.children;
        const cellIndex = row * COLS + col;
        const cell = cells[cellIndex];
        
        const piece = document.createElement('div');
        piece.className = `piece ${this.engine.board[row][col]} drop`;
        cell.appendChild(piece);
    }

    handleUndo() {
        if (this.engine.undoLastMove()) {
            this.renderBoard();
            this.updateUI();
        }
    }

    handleRestart() {
        if (this.engine.moveHistory.length >= 3) {
            if (confirm('Restart current game? Progress will be lost.')) {
                this.engine.restartGame();
                this.renderBoard();
                this.updateUI();
            }
        } else {
            this.engine.restartGame();
            this.renderBoard();
            this.updateUI();
        }
    }

    handleNewGame() {
        this.engine.newGame();
        this.renderBoard();
        this.updateUI();
    }

    renderBoard() {
        const cells = this.boardElement.children;
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cellIndex = row * COLS + col;
                const cell = cells[cellIndex];
                cell.innerHTML = '';
                
                const player = this.engine.board[row][col];
                if (player) {
                    const piece = document.createElement('div');
                    piece.className = `piece ${player}`;
                    
                    // Check if this is a winning cell
                    if (this.engine.winningCells) {
                        const isWinning = this.engine.winningCells.some(
                            pos => pos.row === row && pos.col === col
                        );
                        if (isWinning) {
                            piece.classList.add('winning');
                        }
                    }
                    
                    cell.appendChild(piece);
                }
            }
        }
    }

    updateUI() {
        // Update current player indicator
        this.currentPlayerElement.className = `player-piece ${this.engine.currentPlayer}`;
        
        // Update scores
        this.redScoreElement.textContent = this.engine.scores.red;
        this.yellowScoreElement.textContent = this.engine.scores.yellow;
        
        // Update undo button
        this.undoBtn.disabled = !this.engine.canUndo;
        
        // Update board interactivity
        const cells = this.boardElement.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (this.engine.gameStatus === 'playing') {
                cell.classList.remove('disabled');
            } else {
                cell.classList.add('disabled');
            }
        });
    }

    showWinModal() {
        const winnerText = document.getElementById('winner-text');
        winnerText.textContent = `${this.engine.winner.charAt(0).toUpperCase() + this.engine.winner.slice(1)} Wins!`;
        winnerText.style.color = this.engine.winner === PLAYERS.RED ? '#E74C3C' : '#F39C12';
        
        document.getElementById('modal-red-score').textContent = this.engine.scores.red;
        document.getElementById('modal-yellow-score').textContent = this.engine.scores.yellow;
        
        this.showModal(this.winModal);
    }

    showDrawModal() {
        document.getElementById('draw-red-score').textContent = this.engine.scores.red;
        document.getElementById('draw-yellow-score').textContent = this.engine.scores.yellow;
        
        this.showModal(this.drawModal);
    }

    showModal(modal) {
        modal.classList.add('show');
    }

    hideModal(modal) {
        modal.classList.remove('show');
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GameUI();
});
