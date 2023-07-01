import { levels } from '../levels/levels';
import { clearLevel } from '../utils/clearLevel';
import { EventEmitter } from '../eventEmitter';

export class LevelsView {
  private emitter;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.emitter.subscribe('event:win-level', (data: number) => {
      this.winLevel(data);
    });
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
      lvl.addEventListener('click', () => {
        this.levelListen(ind);
        localStorage.setItem('game', ind.toString());
      });
    });
  }
  levelListen(index: number) {
    const levels = document.querySelectorAll('.level');
    let currentLevel = 0;
    levels.forEach((level) => {
      level.classList.remove('level_focus');
    });
    clearLevel();
    currentLevel = index;
    levels[index].classList.add('level_focus');
    localStorage.setItem('game', currentLevel.toString());
    this.emitter.emit('event:level-changed', index);
  }
  winLevel(lvl: number) {
    const levels = document.querySelectorAll('.level');
    levels.forEach((level) => {
      level.classList.remove('level_focus');
    });
    levels[lvl].classList.add('level_focus');
  }
}
