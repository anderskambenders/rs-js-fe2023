import { createBtn } from '../buttons/button';
import { EventEmitter } from '../event-emitter';

export class Navigation {
  private emitter: EventEmitter;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
  }

  draw() {
    const menu = this.create();
    const garageBtn = createBtn('nav_garage', 'Garage', 'button', () => {
      this.emitter.emit('event:to-garage');
    });
    const winnersBtn = createBtn('nav_winners', 'Winners', 'button', () => {
      this.emitter.emit('event:to-winners');
    });
    menu.append(garageBtn, winnersBtn);
    return menu;
  }

  create() {
    const menu = document.createElement('nav');
    menu.classList.add('nav');
    return menu;
  }
}
