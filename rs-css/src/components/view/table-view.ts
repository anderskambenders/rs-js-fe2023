import { levels } from '../levels/levels';

export class TableView {
  draw(currentLevel: number) {
    const table = document.querySelector('.table__main');
    const images = levels[currentLevel].img;

    images.forEach((image) => {
      const imgWrapper = document.createElement('div');
      const img = document.createElement('img');
      img.src = image;
      imgWrapper.classList.add('image__wrapper');
      img.classList.add('image');
      imgWrapper.append(img);
      table?.append(imgWrapper);
    });
  }
}
