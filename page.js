// Игра 1: Проверка реакции
const reactionBtn = document.getElementById('reactionBtn');
const reactionMessage = document.getElementById('reactionMessage');
let reactionTimeout, startTime;

reactionBtn.addEventListener('click', () => {
  if (reactionBtn.classList.contains('active')) {
    const reactionTime = Date.now() - startTime;
    reactionMessage.textContent = `Сиздин Рекцияныздын реакциясы: ${reactionTime} мс`;
    reactionBtn.textContent = 'куто турун...';
    reactionBtn.classList.remove('active');
    setupReactionGame();
  } else {
    reactionMessage.textContent = 'Эрте! Жашылды куто турун';
  }
});

function setupReactionGame() {
  clearTimeout(reactionTimeout);
  const delay = Math.random() * 3000 + 2000;
  reactionTimeout = setTimeout(() => {
    reactionBtn.textContent = 'Басыныз!';
    reactionBtn.classList.add('active');
    startTime = Date.now();
  }, delay);
}
setupReactionGame();

// Игра 2: Бросок кубика
const rollDiceBtn = document.getElementById('rollDiceBtn');
const diceResult = document.getElementById('diceResult');

rollDiceBtn.addEventListener('click', () => {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `Сиз ыргытыныз: ${diceRoll}`;
});

// Игра 3: Угадай слово
const wordInput = document.getElementById('wordInput');
const checkLetterBtn = document.getElementById('checkLetterBtn');
const wordResult = document.getElementById('wordResult');
const secretWord = 'apple';
let guessedWord = '_'.repeat(secretWord.length).split('');

checkLetterBtn.addEventListener('click', () => {
  const letter = wordInput.value.toLowerCase();
  wordInput.value = '';

  if (secretWord.includes(letter)) {
    secretWord.split('').forEach((char, index) => {
      if (char === letter) guessedWord[index] = letter;
    });
    wordResult.textContent = `соз: ${guessedWord.join(' ')}`;
  } else {
    wordResult.textContent = `Тамгалар "${letter}" создо жок.`;
  }

  if (!guessedWord.includes('_')) {
    wordResult.textContent = `  Сиз созду таптыныз: ${secretWord}`;
  }
});

// Игра 4: Лабиринт
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 30;
const player = { x: 0, y: 0 };
const goal = { x: 9, y: 9 };

function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  ctx.fillRect(goal.x * tileSize, goal.y * tileSize, tileSize, tileSize);
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && player.y > 0) player.y--;
  if (e.key === 'ArrowDown' && player.y < 9) player.y++;
  if (e.key === 'ArrowLeft' && player.x > 0) player.x--;
  if (e.key === 'ArrowRight' && player.x < 9) player.x++;
  drawMaze();
  if (player.x === goal.x && player.y === goal.y) {
    alert('Вы достигли цели!');
    player.x = 0;
    player.y = 0;
    drawMaze();
  }
});

drawMaze();
