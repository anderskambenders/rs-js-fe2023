import { Garage } from './view/garage';
import { Navigation } from './navigation/navigation';
import { Winners } from './view/winners';

export class App {
  private navigation: Navigation;

  private garage: Garage;

  private winners: Winners;

  private body: HTMLBodyElement | null;

  constructor() {
    this.navigation = new Navigation();
    this.garage = new Garage();
    this.winners = new Winners();
    this.body = document.querySelector('body');
  }

  start() {
    this.body?.append(this.navigation.draw(), this.garage.draw(), this.winners.draw());
  }
}
