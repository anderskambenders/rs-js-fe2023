import { levels } from '../levels/levels';

export class EdtorView {
  draw(currentLevel: number) {
    const input = document.querySelector('.html__field');
    const lvlCode = levels[currentLevel].boardMarkup;
    const htmlCodeStart = document.createElement('p');
    const htmlCodeEnd = document.createElement('p');
    htmlCodeStart.textContent = `<div class="castle">`;
    htmlCodeStart.classList.add('html__code');
    (input as HTMLElement).append(htmlCodeStart);
    lvlCode.forEach((code) => {
      const str = document.createElement('p');
      str.innerHTML = `<pre>${code}</pre>`;
      str.classList.add('html__code');
      (input as HTMLElement).append(str);
    });

    htmlCodeEnd.textContent = `</div>`;
    htmlCodeEnd.classList.add('html__code');
    (input as HTMLElement).append(htmlCodeEnd);
  }
}
