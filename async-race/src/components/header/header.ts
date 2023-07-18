import { createBtn } from '../buttons/button';

export class HeaderMenu {
  draw() {
    const menu = this.createMenu();
    const garageBtn = createBtn('garage', 'Garage');
    const winnersBtn = createBtn('winners', 'Winners');
    menu.append(garageBtn);
    menu.append(winnersBtn);
    return menu;
  }

  createMenu() {
    const menu = document.createElement('nav');
    menu.classList.add('menu');
    return menu;
  }
}
