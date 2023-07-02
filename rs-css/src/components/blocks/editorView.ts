import { levels } from '../levels/levels';
import { EventEmitter } from '../eventEmitter';
import { clearLevel } from '../utils/clearLevel';
import hljs from 'highlight.js';
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

export class EditorView {
  private emitter: EventEmitter;
  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.emitter.subscribe('event:level-changed', (data: number): void => {
      this.draw(data);
    });
  }
  draw(currentLevel: number) {
    const input = document.querySelector('.html__field');
    const lvlCode = levels[currentLevel].boardMarkup;
    const code = document.createElement('code');
    code.textContent = `<div class="castle">`;
    const htmlCodeStart = document.createElement('pre');
    const htmlCodeEnd = document.createElement('pre');
    htmlCodeStart.textContent = `<div class="castle">`;
    htmlCodeStart.classList.add('html__code');
    // hljs.highlightElement(htmlCodeStart);
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
    // hljs.highlightElement(input as HTMLElement);
  }

  formListener(level: number) {
    const form = document.querySelector('form');
    const input = document.querySelector('input');
    const nextLevel = level + 1;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input?.value === levels[level].input) {
        clearLevel();
        this.emitter.emit('event:level-changed', nextLevel);
        this.emitter.emit('event:win-level', nextLevel);
        localStorage.setItem('game', nextLevel.toString());
      } else {
        if (input !== null) {
          input.value = '';
        }
      }
    });
  }
}
