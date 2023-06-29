import { levels } from '../levels/levels';
import hljs from 'highlight.js';
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

export class EdtorView {
  draw(currentLevel: number) {
    const input = document.querySelector('.html__field');
    const lvlCode = levels[currentLevel].boardMarkup;
    const code = document.createElement('code');
    code.textContent = `<div class="castle">`;
    const htmlCodeStart = document.createElement('pre');
    const htmlCodeEnd = document.createElement('pre');
    htmlCodeStart.textContent = `<div class="castle">`;
    htmlCodeStart.classList.add('html__code');
    hljs.highlightElement(htmlCodeStart);
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
    hljs.highlightElement(input as HTMLElement);
  }
}
