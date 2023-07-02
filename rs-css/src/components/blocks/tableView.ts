import { levels } from '../levels/levels';
import { EventEmitter } from '../eventEmitter';

export class TableView {
  private emitter: EventEmitter;
  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.emitter.subscribe('event:level-changed', (data: number): void => {
      this.draw(data);
    });
  }

  draw(currentLevel: number) {
    const table = document.querySelector('.table__main');
    const images = levels[currentLevel].img;
    const select = levels[currentLevel].selector;

    images.forEach((image, ind) => {
      const imgWrapper = document.createElement('div');
      const img = document.createElement('img');
      const imgHelper = document.createElement('p');
      img.src = image;
      imgWrapper.classList.add('image__wrapper');
      img.classList.add('image');
      if (select.includes(ind)) {
        img.classList.add('active');
      }
      imgHelper.classList.add('image__content');
      imgHelper.textContent = levels[currentLevel].boardMarkup[ind];

      imgWrapper.append(img);
      imgWrapper.append(imgHelper);
      table?.append(imgWrapper);
    });
  }
}
