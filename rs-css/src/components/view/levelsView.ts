import { levels } from '../levels/levels';
import { clearLevel } from '../app/clearLevel';
import { EventEmitter } from '../eventEmitter';

export class LevelsView {
  private block: HTMLElement | null;
  private emitter;

  constructor(emitter: EventEmitter) {
    this.block = document.querySelector('.level-menu');
    this.emitter = emitter;
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
      lvl.addEventListener('click', this.levelListen);
    });
  }

}
