import { AppView } from '../view/appView';
import { clearLevel } from './clearLevel';
import { levels } from '../levels/levels';

export class App {
  view: AppView;
  constructor() {
    this.view = new AppView();
  }

  initLayout() {
    this.view.start(0);
  }

  levelListen() {
    const levels = document.querySelectorAll('.level');
    let currentLevel = 0;
    levels.forEach((level, index) => {
      level.addEventListener('click', () => {
        clearLevel();
        this.view.drawLevel(index);
        currentLevel = index;
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
