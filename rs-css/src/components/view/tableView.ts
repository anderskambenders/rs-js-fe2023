import { levels } from '../levels/levels';

export class TableView {
  draw(currentLevel: number) {
    const table = document.querySelector('.table__main');
    const images = levels[currentLevel].img;
    const select = levels[currentLevel].selector;

    images.forEach((image, ind) => {
      const imgWrapper = document.createElement('div');
      const img = document.createElement('img');
      img.src = image;
      imgWrapper.classList.add('image__wrapper');
      img.classList.add('image');
      if (select.includes(ind)) {
        img.classList.add('active');
      }
      imgWrapper.append(img);
      table?.append(imgWrapper);
    });
  }
}
