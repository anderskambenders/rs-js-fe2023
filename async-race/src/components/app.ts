import { Garage } from './view/garage';
import { Navigation } from './navigation/navigation';

export class App {
  private navigation: Navigation;

  private garage: Garage;

  private body: HTMLBodyElement | null;

  constructor() {
    this.navigation = new Navigation();
    this.garage = new Garage();
    this.body = document.querySelector('body');
  }

  start() {
    this.body?.append(this.navigation.draw(), this.garage.draw());
  }
}
