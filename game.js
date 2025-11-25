// Game Constants
const ROWS = 6;
const COLS = 7;
const MIN_MOVES_FOR_RESTART_CONFIRM = 3;
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
        this.moveHistory.push({ player: this.currentPlayer, row, col });
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
        this.currentPlayer = this.gamesPlayed % 2 === 1 ? PLAYERS.RED : PLAYERS.YELLOW;
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
        this.restartModal = document.getElementById('restart-modal');
        
        this.initBoard();
        this.bindEvents();
        this.updateUI();
    }

    initBoard() {
        this.boardElement.innerHTML = '';
        this.isAnimating = false;
        this.currentPreviewCol = null;
        
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.tabIndex = 0; // Make cell focusable
                cell.setAttribute('role', 'button'); // Optional: improve accessibility
                
                // Click/tap handlers
                cell.addEventListener('click', () => this.handleCellClick(col));
                cell.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        this.handleCellClick(col);
                    }
                });
                
                // Column preview on hover/touch
                cell.addEventListener('mouseenter', () => this.showColumnPreview(col));
                cell.addEventListener('mouseleave', () => this.hideColumnPreview(col));
                cell.addEventListener('touchstart', () => {
                    this.showColumnPreview(col);
                }, { passive: true });
                cell.addEventListener('touchend', () => this.hideColumnPreview(col), { passive: true });
                cell.addEventListener('touchcancel', () => this.hideColumnPreview(col), { passive: true });
                
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
        document.getElementById('restart-confirm').addEventListener('click', () => {
            this.hideModal(this.restartModal);
            this.engine.restartGame();
            this.renderBoard();
            this.updateUI();
        });
        document.getElementById('restart-cancel').addEventListener('click', () => {
            this.hideModal(this.restartModal);
        });
    }

    handleCellClick(col) {
        if (this.engine.gameStatus !== 'playing' || this.isAnimating) return;

        // Check if move is valid
        if (!this.engine.isValidMove(col)) {
            this.showInvalidMoveAnimation(col);
            return;
        }

        const result = this.engine.makeMove(col);
        if (result) {
            this.hideColumnPreview(col);
            this.animatePieceDrop(result.row, result.col);
            
            if (this.engine.gameStatus === 'won') {
                setTimeout(() => this.showWinModal(), 1000);
            } else if (this.engine.gameStatus === 'draw') {
                setTimeout(() => this.showDrawModal(), 1000);
            }
        }
    }

    animatePieceDrop(row, col) {
        this.isAnimating = true;
        const cells = this.boardElement.children;
        const cellIndex = row * COLS + col;
        const cell = cells[cellIndex];
        
        const piece = document.createElement('div');
        piece.className = `piece ${this.engine.board[row][col]} drop`;
        
        // Calculate duration based on drop distance
        // row is the final landing position (0-5 from top to bottom)
        // distance is how many rows the piece falls (row + 1)
        const distance = row + 1;
        const duration = Math.min(400, 200 + distance * 30); // 200ms base + 30ms per row
        piece.style.animationDuration = `${duration}ms`;
        
        cell.appendChild(piece);
        
        // Update UI after animation completes
        setTimeout(() => {
            this.isAnimating = false;
            this.updateUI();
            this.addTurnIndicatorTransition();
        }, duration);
    }
    
    showColumnPreview(col) {
        if (this.engine.gameStatus !== 'playing' || this.isAnimating) return;
        if (!this.engine.isValidMove(col)) return;
        if (this.currentPreviewCol === col) return;
        
        // Hide previous preview if switching columns
        if (this.currentPreviewCol !== null && this.currentPreviewCol !== col) {
            const previousCol = this.currentPreviewCol;
            this.currentPreviewCol = null; // Clear it first so hideColumnPreview works
            this.hideColumnPreview(previousCol);
        }
        
        this.currentPreviewCol = col;
        const cells = this.boardElement.children;
        
        // Show preview on top cell of the column
        for (let row = 0; row < ROWS; row++) {
            const cellIndex = row * COLS + col;
            const cell = cells[cellIndex];
            
            if (row === 0) {
                // Add preview piece to top cell
                const previewPiece = document.createElement('div');
                previewPiece.className = `preview-piece ${this.engine.currentPlayer} show`;
                cell.appendChild(previewPiece);
                cell.classList.add('preview');
            }
            
            // Highlight entire column
            cell.classList.add('column-highlight');
        }
    }
    
    hideColumnPreview(col) {
        const cells = this.boardElement.children;
        
        for (let row = 0; row < ROWS; row++) {
            const cellIndex = row * COLS + col;
            const cell = cells[cellIndex];
            
            // Remove preview piece
            const previewPiece = cell.querySelector('.preview-piece');
            if (previewPiece) {
                previewPiece.remove();
            }
            cell.classList.remove('preview', 'column-highlight');
        }
    }
    
    showInvalidMoveAnimation(col) {
        const cells = this.boardElement.children;
        
        // Animate all cells in the column
        for (let row = 0; row < ROWS; row++) {
            const cellIndex = row * COLS + col;
            const cell = cells[cellIndex];
            
            // Add shake and flash animations
            cell.classList.add('invalid-shake', 'invalid-flash');
            
            // Remove classes after animation
            setTimeout(() => {
                cell.classList.remove('invalid-shake', 'invalid-flash');
            }, 300);
        }
        
        // Optional: Add haptic feedback if supported
        try {
            if (navigator.vibrate && typeof navigator.vibrate === 'function') {
                navigator.vibrate(100);
            }
        } catch (e) {
            // Vibrate API not supported or failed, silently continue
        }
    }
    
    addTurnIndicatorTransition() {
        this.currentPlayerElement.classList.add('turn-transition');
        
        // Remove the transition class after animation completes
        setTimeout(() => {
            this.currentPlayerElement.classList.remove('turn-transition');
        }, 300);
    }

    handleUndo() {
        if (!this.engine.canUndo || this.isAnimating) return;
        
        this.isAnimating = true;
        
        const lastMove = this.engine.moveHistory[this.engine.moveHistory.length - 1];
        const { row, col } = lastMove;
        
        // Get the cell and piece to animate
        const cells = this.boardElement.children;
        const cellIndex = row * COLS + col;
        const cell = cells[cellIndex];
        const piece = cell.querySelector('.piece');
        
        if (piece) {
            // Add removal animation
            piece.classList.add('removing');
            
            // Wait for animation to complete before updating state
            setTimeout(() => {
                this.completeUndo();
            }, 300);
        } else {
            // Fallback if no piece found
            this.completeUndo();
        }
    }
    
    completeUndo() {
        if (this.engine.undoLastMove()) {
            this.renderBoard();
            this.updateUI();
            this.addTurnIndicatorTransition();
        }
        this.isAnimating = false;
    }

    handleRestart() {
        if (this.engine.moveHistory.length >= MIN_MOVES_FOR_RESTART_CONFIRM) {
            this.showModal(this.restartModal);
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
        // Update current player indicator (remove old color, add new)
        this.currentPlayerElement.classList.remove('red', 'yellow');
        this.currentPlayerElement.classList.add(this.engine.currentPlayer);
        
        // Update scores
        this.redScoreElement.textContent = this.engine.scores.red;
        this.yellowScoreElement.textContent = this.engine.scores.yellow;
        
        // Update undo button
        this.undoBtn.disabled = !this.engine.canUndo;
        
        // Update board interactivity
        const cells = this.boardElement.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (this.engine.gameStatus === 'playing') {
                cell.classList.remove('cell-disabled');
            } else {
                cell.classList.add('cell-disabled');
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
        modal.style.display = 'flex';
        // Force reflow to ensure the display change is applied before adding 'show'
        modal.offsetHeight;
        modal.classList.add('show');
    }

    hideModal(modal) {
        modal.classList.add('hide');
        modal.classList.remove('show');
        
        // Wait for exit animation to complete before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('hide');
        }, 300);
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GameUI();
});
