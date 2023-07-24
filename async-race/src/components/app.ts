import { Garage } from './view/garage';
import { Navigation } from './navigation/navigation';
import { Winners } from './view/winners';
import { EventEmitter } from './event-emitter';
import { getWinners } from './api/api';

const sort = 'id';
const order = 'ASC';

export class App {
  private emitter: EventEmitter;

  private navigation: Navigation;

  private garage: Garage;

  private winners: Winners;

  private body: HTMLBodyElement | null;

  constructor() {
    this.emitter = new EventEmitter();
    this.navigation = new Navigation(this.emitter);
    this.garage = new Garage(this.emitter);
    this.winners = new Winners(this.emitter);
    this.body = document.querySelector('body');
  }

  async start() {
    const winnersResponse = await getWinners(1, sort, order);
    this.body?.append(this.navigation.draw(), this.garage.draw(), this.winners.draw(winnersResponse));
  }
}
