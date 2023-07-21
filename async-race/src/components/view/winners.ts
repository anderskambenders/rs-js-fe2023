import { EventEmitter } from '../event-emitter';

export class Winners {
  private emitter: EventEmitter;

  private rootElem: HTMLElement;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.rootElem = this.createElement('div', 'winners');
    this.emitter.subscribe('event:to-garage', () => {
      this.goOutOfWinnersPage();
    });
    this.emitter.subscribe('event:to-winners', () => {
      this.goToWinnersPage();
    });
  }

  draw() {
    const winners = this.rootElem;
    winners.classList.add('hidden');
    const pageTitle = this.createPageTitle();
    winners.append(pageTitle);
    return winners;
  }

  createPageTitle(value = 1) {
    let pageTitle = document.getElementById('page__title_winners');
    if (!pageTitle) {
      pageTitle = document.createElement('h2');
      pageTitle.classList.add('page__title_winners');
      pageTitle.id = `page__title_winners`;
      pageTitle.innerText = `Winners [page ${value}]`;
    } else {
      pageTitle.innerText = `Winners [page ${value}]`;
    }
    return pageTitle;
  }

  createElement(tag: string, style: string, id?: string, type?: string, value?: string) {
    const elem = document.createElement(tag);
    elem.classList.add(style);
    if (id) {
      elem.id = id;
    }
    if (type) {
      (elem as HTMLInputElement).type = type;
    }
    if (value) {
      (elem as HTMLInputElement).value = value;
    }
    return elem;
  }

  goToWinnersPage() {
    this.rootElem.classList.remove('hidden');
    this.rootElem.classList.add('visible');
  }

  goOutOfWinnersPage() {
    this.rootElem.classList.remove('visible');
    this.rootElem.classList.add('hidden');
  }
}
