import { createBtn } from '../buttons/button';

export class Navigation {
  draw() {
    const menu = this.create();
    const garageBtn = createBtn('garage', 'Garage');
    const winnersBtn = createBtn('winners', 'Winners');
    menu.append(garageBtn, winnersBtn);
    return menu;
  }

  create() {
    const menu = document.createElement('nav');
    menu.classList.add('nav');
    return menu;
  }
}
