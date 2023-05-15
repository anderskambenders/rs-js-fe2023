function createTable(gameField) {
  // eslint-disable-next-line no-param-reassign
  gameField.innerHTML = '';
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const cellDiv = document.createElement('div');
      cellDiv.setAttribute('data-index-y', i);
      cellDiv.setAttribute('data-index-x', j);
      cellDiv.classList.add('cell');
      gameField.append(cellDiv);
    }
  }
}

export default createTable;
