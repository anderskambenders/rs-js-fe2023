import { Garage } from './view/garage';
import { HeaderMenu } from './header/header';

export class App {
  private menu: HeaderMenu;

  private garage: Garage;

  private body: HTMLBodyElement | null;

  constructor() {
    this.menu = new HeaderMenu();
    this.garage = new Garage();
    this.body = document.querySelector('body');
  }

  start() {
    this.body?.append(this.menu.draw());
  }
}
