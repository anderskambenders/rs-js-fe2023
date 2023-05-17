// eslint-disable-next-line import/extensions
import createLayuot from './components/layout.js';

window.addEventListener('DOMContentLoaded', () => {
  createLayuot();
  const gameField = document.querySelector('.game__field');
  const width = 10;
  const height = 10;
  const bombsNumber = 10;
  let flags = 0;
  const cells = [];
  let gameOver = false;
  let gameCnt = 0;
  let moves = 0;
  let timer = 0;
  let isStart = false;
  const timerWidget = document.querySelector('.menu__timer');
  const mineCounter = document.querySelector('.game__mines-cnt');
  const message = document.querySelector('.message');
  mineCounter.innerHTML = `0${bombsNumber.toString()}`;



  function addFlag(cell) {
    if (gameOver) return;
    if (!cell.classList.contains('checked') && (flags < bombsNumber)) {
      if (!cell.classList.contains('flag')) {
        cell.classList.add('flag');
        cell.innerHTML = ' 🚩';
        flags += 1;
        checkForWin();
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
      if (currentId > 0 && !isLeftEdge) {
        const newId = cells[+currentId - 1].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = cells[+currentId + 1 - width].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId > 10) {
        const newId = cells[+currentId - width].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = cells[+currentId - 1 - width].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = cells[+currentId + 1].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = cells[+currentId - 1 + width].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = cells[+currentId + 1 + width].id;
        const newSquare = document.getElementById(newId);
        openCell(newSquare);
      }
      if (currentId < 89) {
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
    if (cell.classList.contains('bomb')) {
      gameEnd(cell);
    } else {
      const total = cell.getAttribute('data');
      if (+total !== 0) {
        cell.classList.add('checked');
        if (+total === 1) cell.classList.add('one');
        if (+total === 2) cell.classList.add('two');
        if (+total === 3) cell.classList.add('three');
        if (+total === 4) cell.classList.add('four');
        cell.innerHTML = total;
        return;
      }
      checkSquare(cell, currentId);
    }
    cell.classList.add('checked');
  }

  function createTable() {
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

      cell.addEventListener('click', () => {
        moves += 1;
        openCell(cell);
      });
      cell.addEventListener('contextmenu', (target) => {
        target.preventDefault();
        moves += 1;
        addFlag(cell);
      });
    }

    for (let i = 0; i < cells.length; i += 1) {
      let total = 0;
      const isLeftEdge = (i % width === 0);
      const isRightEdge = (i % width === width - 1);

      if (cells[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && cells[i - 1].classList.contains('bomb')) total += 1;
        if (i > 9 && !isRightEdge && cells[i + 1 - width].classList.contains('bomb')) total += 1;
        if (i > 10 && cells[i - width].classList.contains('bomb')) total += 1;
        if (i > 11 && !isLeftEdge && cells[i - 1 - width].classList.contains('bomb')) total += 1;
        if (i < 98 && !isRightEdge && cells[i + 1].classList.contains('bomb')) total += 1;
        if (i < 90 && !isLeftEdge && cells[i - 1 + width].classList.contains('bomb')) total += 1;
        if (i < 88 && !isRightEdge && cells[i + 1 + width].classList.contains('bomb')) total += 1;
        if (i < 89 && cells[i + width].classList.contains('bomb')) total += 1;
        cells[i].setAttribute('data', total);
      }
    }
  }
  function gameEnd(cell) {
    gameOver = true;
    cells.forEach(cell => {
      if (cell.classList.contains('bomb')) {
        cell.innerHTML = '💣';
        cell.classList.remove('bomb');
        cell.classList.add('checked');
      }
    });
    message.innerHTML = 'Game Over! Try again!';
  }
  function checkForWin() {
    let matches = 0;
    for (let i = 0; i < cells.length; i += 1) {
      if (cells[i].classList.contains('flag') && cells[i].classList.contains('bomb')) {
        matches += 1;
      }
      if (matches === bombsNumber) {
        gameOver = true;
        message.innerHTML = `Hooray! You found all mines in ${timer} seconds and ${moves} moves!`;
      }
    }
  }

  function setTimer() {
    setTimeout(() => {
      if (!gameOver) {
        timer += 1;
        timerWidget.textContent = timer.toString().padStart(3, 0);
        setTimer();
      }
    }, 1000);
  }

  createTable();
  gameField.addEventListener('click', (cell) => {
    if (!isStart) {
      isStart = true;
      setTimer();
    }
    if (cells.includes(cell.target)) {
      openCell(cell.target);
    }
  });
});
