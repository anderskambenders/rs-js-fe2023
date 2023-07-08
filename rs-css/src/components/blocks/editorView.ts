import { levels } from '../levels/levels';
import { EventEmitter } from '../eventEmitter';
import { clearLevel } from '../utils/clearLevel';

export class EditorView {
  private emitter: EventEmitter;
  private finishedLevels: Array<number>;
  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.finishedLevels = JSON.parse(localStorage.getItem('finished') as string) || [];
    this.emitter.subscribe('event:level-changed', (data) => this.draw(data as number));
  }
  draw(currentLevel: number) {
    const input = document.querySelector('.html__field');
    const lvlCode = levels[currentLevel].boardMarkup;
    const code = document.createElement('code');
    const form = document.querySelector('form');
    code.textContent = `<div class="castle">`;
    const htmlCodeStart = document.createElement('pre');
    const htmlCodeEnd = document.createElement('pre');
    htmlCodeStart.textContent = `<div class="castle">`;
    htmlCodeStart.classList.add('html__code');
    (input as HTMLElement).append(htmlCodeStart);
    lvlCode.forEach((code) => {
      const str = document.createElement('p');
      str.innerHTML = `\n${code}`;
      str.classList.add('html__code');
      (input as HTMLElement).append(str);
    });

    htmlCodeEnd.textContent = `\n</div>`;
    htmlCodeEnd.classList.add('html__code');
    input?.classList.add('xml');
    (input as HTMLElement).append(htmlCodeEnd);
    const newForm = (form as HTMLElement).cloneNode(true);
    ((form as HTMLFormElement).parentNode as HTMLElement).replaceChild(newForm, form as HTMLFormElement);
    this.formListener(currentLevel);
  }

  formListener(level: number) {
    const form = document.querySelector('form');
    const input = document.querySelector('input');
    const finishedLvlSet = new Set(this.finishedLevels);
    let nextLevel = level + 1;
    if (finishedLvlSet.has(nextLevel) || nextLevel === 10) {
      for (let i = 0; i < levels.length; i += 1) {
        if (!finishedLvlSet.has(i)) {
          nextLevel = i;
        }
      }
    }
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input?.value === levels[level].input) {
        if (finishedLvlSet.size === levels.length - 1) {
          alert('Congratulations!!! You win!');
          localStorage.clear();
          window.location.reload();
        } else {
          this.finishedLevels.push(level);
          localStorage.setItem('finished', JSON.stringify(this.finishedLevels));
          this.emitter.emit('event:right-answer', level);
          setTimeout(() => {
            clearLevel();
            this.emitter.emit('event:level-changed', nextLevel);
            localStorage.setItem('game', nextLevel.toString());
          }, 1000);
        }
      } else {
        if (input !== null) {
          input.value = '';
          this.moveWrong();
        }
      }
    });
  }

  moveWrong() {
    const body = document.querySelector('body');
    (body as HTMLElement).classList.add('move_wrong');
    setTimeout(() => (body as HTMLElement).classList.remove('move_wrong'), 1000);
  }
}
