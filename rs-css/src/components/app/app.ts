import { AppView } from '../view/appView';
import { clearLevel } from './clearLevel';
import { levels } from '../levels/levels';

export class App {
  view: AppView;
  constructor() {
    this.view = new AppView();
  }

  initLayout() {
    this.view.start(this.storageChecker());
  }

  storageChecker() {
    const currentLevel = Number(localStorage.getItem('game'));
    return currentLevel;
  }

  levelListen() {
    const levels = document.querySelectorAll('.level');
    let currentLevel = 0;
    levels.forEach((level, index) => {
      level.addEventListener('click', () => {
        levels.forEach((lvl) => {
          lvl.classList.remove('level_focus');
        });
        clearLevel();
        this.view.drawLevel(index);
        currentLevel = index;
        level.classList.add('level_focus');
        localStorage.setItem('game', currentLevel.toString());
      });
    });
    this.formListener(currentLevel);
  }
  formListener(level: number) {
    const form = document.querySelector('form');
    const input = document.querySelector('input');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input?.value === levels[level].input) {
        clearLevel();
        this.view.drawLevel(level + 1);
      } else {
        if (input !== null) {
          input.value = '';
        }
      }
    });
  }
}
