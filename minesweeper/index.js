// eslint-disable-next-line import/extensions
import createLayout from './components/layout.js';

window.addEventListener('DOMContentLoaded', () => {
  createLayout();
  const gameField = document.querySelector('.game__field');
  const newGameBtn = document.querySelector('.game__btn');
  const score = JSON.parse(localStorage.getItem('score1337mine')) || [];
  const timerWidget = document.querySelector('.menu__timer');
  const moveCounter = document.querySelector('.game__mines-cnt');
  const width = 10;
  const height = 10;
  const bombsNumber = 10;
  let flags = 0;
  let cells = [];
  let gameOver = false;
  let moves = 0;
  let timer = 0;
  let isStart = false;
  let result = '';
  let message = '';
  moveCounter.innerHTML = '000';
  const clickSnd = new Audio('assets/sounds/click.mp3');
  clickSnd.volume = 0.1;
  const flagSnd = new Audio('assets/sounds/flag.mp3');
  flagSnd.volume = 0.1;
  const winSnd = new Audio('assets/sounds/win.mp3');
  winSnd.volume = 0.1;
  const loseSnd = new Audio('assets/sounds/lose.mp3');
  loseSnd.volume = 0.1;

  function addFlag(cell) {
    if (gameOver) return;
    flagSnd.play();
    if (!cell.classList.contains('checked') && (flags < bombsNumber)) {
      if (!cell.classList.contains('flag')) {
        cell.classList.add('flag');
        // eslint-disable-next-line no-param-reassign
        cell.innerHTML = ' 🚩';
        flags += 1;
        checkForWin();
        if (result === 'Win') {
          renderResult(message, result);
        }
      } else {
        cell.classList.remove('flag');
        cell.innerHTML = '';
        flags -= 1;
      }
    }
  }

  function checkSquare(cell, currentId) {
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width - 1);

    setTimeout(() => {
      if (!isLeftEdge) {
        const newId = cells[+currentId - 1].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = cells[+currentId + 1 - width].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId >= 10) {
        const newId = cells[+currentId - width].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId >= 11 && !isLeftEdge) {
        const newId = cells[+currentId - 1 - width].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (!isRightEdge) {
        const newId = cells[+currentId + 1].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = cells[+currentId - 1 + width].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId <= 88 && !isRightEdge) {
        const newId = cells[+currentId + 1 + width].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId <= 89) {
        const newId = cells[+currentId + width].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
    }, 10);
  }

  function openCell(cell) {
    const currentId = cell.id;
    if (gameOver) return;
    if (cell.classList.contains('checked') || cell.classList.contains('flag')) return;
    if (cell.classList.contains('bomb') && moves !== 1) {
      gameEnd(cell);
    } else if (cell.classList.contains('valid')) {
      clickSnd.play();
      const total = cell.getAttribute('data');
      if (+total !== 0) {
        cell.classList.add('checked');
        if (+total === 1) cell.classList.add('one');
        if (+total === 2) cell.classList.add('two');
        if (+total === 3) cell.classList.add('three');
        if (+total === 4) cell.classList.add('four');
        // eslint-disable-next-line no-param-reassign
        cell.innerHTML = total;
        return;
      }
      checkSquare(cell, currentId);
      cell.classList.add('checked');
    }
  }

  function createTable() {
    gameField.classList.remove('game__result');
    gameField.classList.add('game__field')
    const bombArr = Array(bombsNumber).fill('bomb');
    const emptyArray = Array((width * width) - bombsNumber).fill('valid');
    const gameArr = [...emptyArray, ...bombArr].sort(() => Math.random() - 0.5);
    for (let i = 0; i < width * height; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('id', i);
      cell.classList.add(gameArr[i]);
      gameField.append(cell);
      cells.push(cell);

      // eslint-disable-next-line no-loop-func
      cell.addEventListener('click', () => {
        if (!cell.classList.contains('checked') && !cell.classList.contains('flag')) {
          moves += 1;
          moveCounter.textContent = moves.toString().padStart(3, 0);
        }
        openCell(cell);
      });
      cell.addEventListener('contextmenu', (target) => {
        target.preventDefault();
        addFlag(cell);
      });
    }

    for (let i = 0; i < cells.length; i += 1) {
      let total = 0;
      const isLeftEdge = (i % width === 0);
      const isRightEdge = (i % width === width - 1);

      if (cells[i].classList.contains('valid')) {
        if (!isLeftEdge && cells[i - 1].classList.contains('bomb')) total += 1;
        if (i > 9 && !isRightEdge && cells[i + 1 - width].classList.contains('bomb')) total += 1;
        if (i >= 10 && cells[i - width].classList.contains('bomb')) total += 1;
        if (i >= 11 && !isLeftEdge && cells[i - 1 - width].classList.contains('bomb')) total += 1;
        if (!isRightEdge && cells[i + 1].classList.contains('bomb')) total += 1;
        if (i < 90 && !isLeftEdge && cells[i - 1 + width].classList.contains('bomb')) total += 1;
        if (i <= 88 && !isRightEdge && cells[i + 1 + width].classList.contains('bomb')) total += 1;
        if (i <= 89 && cells[i + width].classList.contains('bomb')) total += 1;

        cells[i].setAttribute('data', total);
      }
    }
  }
  function gameEnd(cell) {
    gameOver = true;
    isStart = false;
    cells.forEach(cell => {
      if (cell.classList.contains('bomb')) {
        cell.innerHTML = '💣';
        cell.classList.remove('bomb');
        cell.classList.add('checked');
      }
    });
    loseSnd.play();
    message = 'Game Over! Try again!';
    result = 'Lose';
    newGameBtn.innerHTML = '&#128530;';
    setTimeout(() => (
      renderResult(message, result)
    ), 1000);
  }
  function checkForWin() {
    let matches = 0;
    for (let i = 0; i < cells.length; i += 1) {
      if (cells[i].classList.contains('flag') && cells[i].classList.contains('bomb')) {
        matches += 1;
      }
      if (matches === bombsNumber) {
        gameOver = true;
        isStart = false;
        winSnd.play();
        message = `Hooray! You found all mines in ${timer} seconds and ${moves} moves!`;
        result = 'Win';
        newGameBtn.innerHTML = '&#128512;';
      }
    }
  }

  function renderResult(outcome, report) {
    gameField.innerHTML = '';
    gameField.classList.remove('game__field');
    gameField.classList.add('game__result');
    const gameResult = [report, timer];
    score.unshift(gameResult);
    score.length = score.length > 10 ? 10 : score.length;
    localStorage.setItem('score1337mine', JSON.stringify(score));
    let resultStr = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const res of score) {
      resultStr += `<li>${res[0]} - ${res[1]} seconds</li>`;
    }
    const resultBlock = `
    <h2 class="game__message">${outcome}</h2>
    <h3 class="result__title">Results</h3>
    <ol>
    ${resultStr}
    </ol>
    `;
    gameField.innerHTML = resultBlock;
  }

  function setTimer() {
    setTimeout(() => {
      if (isStart) {
        timer += 1;
        timerWidget.textContent = timer.toString().padStart(3, 0);
        setTimer();
      }
    }, 1000);
  }

  createTable();

  const cellHandler = (cell) => {
    if (cell.target.classList.contains('bomb') && moves === 1) {
      gameField.innerHTML = '';
      moves = 0;
      cells = [];
      createTable();
      openCell(cells[cell.target.id]);
      moves += 1;
      if (!isStart && timer === 0 && moves === 1) {
        isStart = true;
        setTimer();
      }
    } else {
      if (!isStart && timer === 0 && moves === 1) {
        isStart = true;
        setTimer();
      }
      if (cells.includes(cell.target)) {
        openCell(cell.target);
      }
    }
  };

  newGameBtn.addEventListener('click', () => {
    gameField.innerHTML = '';
    moves = 0;
    moveCounter.innerHTML = '000';
    isStart = false;
    gameOver = false;
    timer = 0;
    timerWidget.textContent = '000';
    cells = [];
    newGameBtn.innerHTML = '&#128578;';
    createTable();
  });

  gameField.addEventListener('click', cellHandler);
});

function selfRating() {
  // eslint-disable-next-line no-console
  console.log(`
  Score: 140/ 180
  Выполненные пункты

- [x]  layout, design, responsive UI: +10
- [x]  at the beginning state of the game, the frame has size 10x10 and is filled with unopened cells. Should be 10 mines on field by default: +10
- [x]   when user click on cells - it should be opened and marked as one of the following state: empty cell, cell with number, or cell with mine: +10
- [x]  the game should end when the player reveals all cells that do not contain mines (win) or clicks on mine (lose) and related message is displayed at the end of the game: +10
- [x]   mines are placed after the first move, so that user cannot lose on the first move. +20
- [x]   user can mark “mined” cells using flags so as not to accidentally open them displaying the number of mines remaining and displaying number of used flags: +10
- [x]   the game should use color coding (using numbers and colors) to indicate the number of mines surrounding a revealed cell: +10
- [x]   the game can be restarted without reloading the page: +10
- [x]   game duration and number of clicks are displayed: +15
- [x]   when user opens a square that does not touch any mines, it will be empty and the adjacent squares will automatically open in all directions until reaching squares that contain numbers: +15
- [x]   sound accompaniment (on/off) when clicking on cell and at the end of the game: +10
- [x]  implemented saving the latest 10 results using LocalStorage: +10

  Невыполненные пункты

- [x]  implement ability to change the size (easy - 10x10, medium - 15x15, hard - 25x25) and number of mines for each size of the field (from 10 to 99): +20
- [x]  implemented saving the state of the game: +10
- [x]  option to choose different themes for the game board (dark/light themes): +10
  `);
}
selfRating();
