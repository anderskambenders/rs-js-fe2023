import { levels } from '../levels/levels';

export class LevelsView {
  private block: HTMLElement | null;

  constructor() {
    this.block = document.querySelector('.level-menu');
  }

  draw(currentLevel: number) {
    const levelsTitle = document.createElement('h2');
    levelsTitle.innerHTML = 'Levels';
    levelsTitle.classList.add('levels__title');
    (document.querySelector('.menu__header') as HTMLElement).append(levelsTitle);
    const levelsList = document.querySelector('.level__main');

    levels.forEach((level, ind) => {
      const lvl = document.createElement('li');
      lvl.classList.add('level');
      lvl.textContent = level.doThis;
      levelsList?.append(lvl);
      if (ind === currentLevel) {
        lvl.classList.add('level_focus');
      }
    });
  }
}
