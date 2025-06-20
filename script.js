class CheckersGame {
    constructor() {
        this.board = document.getElementById('checkers-board');
        this.statusElement = document.getElementById('game-status');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendMessageBtn = document.getElementById('send-message-btn');
        this.newGameBtn = document.getElementById('new-game-btn');
        this.surrenderBtn = document.getElementById('surrender-btn');
        
        this.currentPlayer = 'white';
        this.selectedChecker = null;
        this.gameId = null;
        this.playerColor = null;
        this.opponentName = null;
        
        this.initBoard();
        this.setupEventListeners();
        this.connectToBot();
    }
    
    initBoard() {
        this.board.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.className = `cell ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                if ((row + col) % 2 !== 0) {
                    if (row < 3) {
                        this.addChecker(cell, 'black');
                    } else if (row > 4) {
                        this.addChecker(cell, 'white');
                    }
                }
                
                this.board.appendChild(cell);
            }
        }
    }
    
    addChecker(cell, color) {
        const checker = document.createElement('div');
        checker.className = `checker ${color}`;
        cell.appendChild(checker);
    }
    
    setupEventListeners() {
        this.board.addEventListener('click', (e) => this.handleCellClick(e));
        this.sendMessageBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        this.newGameBtn.addEventListener('click', () => this.requestNewGame());
        this.surrenderBtn.addEventListener('click', () => this.surrenderGame());
    }
    
    handleCellClick(e) {
        const cell = e.target.closest('.cell');
        if (!cell) return;
        
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        // Если шашка уже выбрана, пытаемся сделать ход
        if (this.selectedChecker) {
            this.makeMove(row, col);
        } 
        // Иначе выбираем шашку
        else {
            const checker = cell.querySelector('.checker');
            if (checker && checker.classList.contains(this.currentPlayer)) {
                this.selectChecker(cell, row, col);
            }
        }
    }
    
    selectChecker(cell, row, col) {
        // Снимаем выделение со всех клеток
        document.querySelectorAll('.cell').forEach(c => {
            c.classList.remove('highlight', 'possible-move');
        });
        
        // Выделяем выбранную шашку
        cell.classList.add('highlight');
        this.selectedChecker = { row, col, cell };
        
        // Показываем возможные ходы (здесь должна быть логика определения возможных ходов)
        this.showPossibleMoves(row, col);
    }
    
    showPossibleMoves(row, col) {
        // Простая реализация - показываем клетки для обычного хода
        const directions = this.currentPlayer === 'white' ? [-1, -1] : [1, 1];
        
        for (let i = 0; i < directions.length; i++) {
            const newRow = row + directions[i];
            const newCol = col + (i === 0 ? -1 : 1);
            
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const targetCell = document.querySelector(`.cell[data-row="${newRow}"][data-col="${newCol}"]`);
                if (targetCell && !targetCell.querySelector('.checker')) {
                    targetCell.classList.add('possible-move');
                }
            }
        }
    }
    
    makeMove(toRow, toCol) {
        const targetCell = document.querySelector(`.cell[data-row="${toRow}"][data-col="${toCol}"]`);
        
        // Проверяем, является ли ход допустимым
        if (!targetCell.classList.contains('possible-move')) {
            this.selectedChecker = null;
            document.querySelectorAll('.cell').forEach(c => {
                c.classList.remove('highlight', 'possible-move');
            });
            return;
        }
        
        // Перемещаем шашку
        const checker = this.selectedChecker.cell.querySelector('.checker');
        this.selectedChecker.cell.removeChild(checker);
        targetCell.appendChild(checker);
        
        // Проверяем, стала ли шашка дамкой
        if ((this.currentPlayer === 'white' && toRow === 0) || 
            (this.currentPlayer === 'black' && toRow === 7)) {
            checker.classList.add('king');
        }
        
        // Меняем игрока
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        this.updateStatus();
        
        // Сбрасываем выделение
        this.selectedChecker = null;
        document.querySelectorAll('.cell').forEach(c => {
            c.classList.remove('highlight', 'possible-move');
        });
        
        // Отправляем ход боту
        this.sendMoveToBot(this.selectedChecker.row, this.selectedChecker.col, toRow, toCol);
    }
    
    updateStatus() {
        if (this.playerColor) {
            const yourTurn = this.currentPlayer === this.playerColor;
            this.statusElement.textContent = yourTurn 
                ? 'Ваш ход' 
                : `Ход соперника (${this.opponentName})`;
        } else {
            this.statusElement.textContent = this.currentPlayer === 'white' 
                ? 'Ход белых' 
                : 'Ход чёрных';
        }
    }
    
    connectToBot() {
        // Здесь должна быть логика подключения к Telegram боту через WebSocket или long polling
        console.log("Connecting to Telegram bot...");
        
        // Имитация подключения и получения данных игры
        setTimeout(() => {
            this.gameId = 'game_' + Math.random().toString(36).substr(2, 9);
            this.playerColor = Math.random() > 0.5 ? 'white' : 'black';
            this.opponentName = 'Opponent';
            this.updateStatus();
            
            if (this.playerColor === 'black') {
                this.currentPlayer = 'black';
                this.statusElement.textContent = 'Ваш ход';
            }
        }, 1000);
    }
    
    sendMoveToBot(fromRow, fromCol, toRow, toCol) {
        console.log(`Sending move to bot: from (${fromRow},${fromCol}) to (${toRow},${toCol})`);
        // Здесь должна быть логика отправки хода боту
    }
    
    receiveMoveFromBot(fromRow, fromCol, toRow, toCol) {
        console.log(`Received move from bot: from (${fromRow},${fromCol}) to (${toRow},${toCol})`);
        // Здесь должна быть логика обработки хода от бота
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        this.addMessageToChat('Вы', message);
        this.chatInput.value = '';
        
        // Здесь должна быть логика отправки сообщения боту
        console.log(`Sending message to bot: ${message}`);
    }
    
    addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        this.chatMessages.appendChild(messageElement);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    requestNewGame() {
        console.log("Requesting new game from bot");
        // Здесь должна быть логика запроса новой игры у бота
    }
    
    surrenderGame() {
        console.log("Surrendering the game");
        // Здесь должна быть логика сдачи игры
    }
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.checkersGame = new CheckersGame();
});
