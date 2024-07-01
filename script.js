document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game');
    const resetButton = document.getElementById('reset');
    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let isGameActive = true;
  
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
  
    function checkWinner() {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          isGameActive = false;
          alert(`${board[a]} wins!`);
          return;
        }
      }
      if (!board.includes(null)) {
        isGameActive = false;
        alert('It\'s a draw!');
      }
    }
  
    function handleClick(event) {
      const index = event.target.dataset.index;
      if (board[index] || !isGameActive) return;
      board[index] = currentPlayer;
      event.target.textContent = currentPlayer;
      checkWinner();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (currentPlayer === 'O' && isGameActive) {
        computerMove();
      }
    }
  
    function computerMove() {
      let availableIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
      let randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      board[randomIndex] = 'O';
      document.querySelector(`[data-index='${randomIndex}']`).textContent = 'O';
      checkWinner();
      currentPlayer = 'X';
    }
  
    function resetGame() {
      board.fill(null);
      isGameActive = true;
      currentPlayer = 'X';
      gameContainer.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    }
  
    function createBoard() {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'w-16', 'h-16', 'bg-white', 'flex', 'items-center', 'justify-center', 'text-2xl', 'font-bold', 'cursor-pointer', 'border', 'border-gray-400');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        gameContainer.appendChild(cell);
      }
    }
  
    createBoard();
    resetButton.addEventListener('click', resetGame);
  });