function createLayout() {
  const container = document.createElement('main');
  container.classList.add('container');
  document.body.append(container);
  const title = document.createElement('h1');
  title.classList.add('title');
  title.innerHTML = 'MINESWEEPER';
  container.append(title);
  const gameArea = document.createElement('section');
  gameArea.classList.add('game-area');
  container.append(gameArea);
  const gameMenu = document.createElement('div');
  gameMenu.classList.add('game-menu');
  gameArea.append(gameMenu);
  const menuWrapper = document.createElement('div');
  menuWrapper.classList.add('menu__wrapper');
  gameMenu.append(menuWrapper);
  const minesCounter = document.createElement('div');
  minesCounter.classList.add('game__mines-cnt');
  minesCounter.innerHTML = '000';
  menuWrapper.append(minesCounter);
  const gameBtn = document.createElement('button');
  gameBtn.classList.add('game__btn');
  gameBtn.innerHTML = '&#128578;';
  menuWrapper.append(gameBtn);
  const timer = document.createElement('div');
  timer.classList.add('menu__timer');
  timer.innerHTML = '000';
  menuWrapper.append(timer);
  const main = document.createElement('div');
  main.classList.add('game__main');
  gameArea.append(main);
  const gameField = document.createElement('div');
  gameField.classList.add('game__field');
  main.append(gameField);
}

export default createLayout;
