import { EventEmitter } from '../event-emitter';
import { createCarSVG } from '../utils/carSVG';
import { WinnerCar, WinnersResponse } from '../types/types';

export class Winners {
  private emitter: EventEmitter;

  private rootElem: HTMLElement;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.rootElem = this.createElement('div', ['winners']);
    this.emitter.subscribe('event:to-garage', () => {
      this.goOutOfWinnersPage();
    });
    this.emitter.subscribe('event:to-winners', () => {
      this.goToWinnersPage();
    });
  }

  draw(data: WinnersResponse) {
    const winners = this.rootElem;
    winners.classList.add('hidden');
    const pageTitle = this.createPageTitle();
    winners.append(pageTitle);
    const table = this.generateTable(data);
    winners.append(table);
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

  createElement(tag: string, style: string[], id?: string, type?: string, value?: string) {
    const elem = document.createElement(tag);
    elem.classList.add(...style);
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

  generateTable(data: WinnersResponse) {
    const table = this.createTable();
    const tbody = this.createElement('tbody', ['t_body']);
    const tableHead = this.createTableHead();
    table.append(tbody);
    tbody.appendChild(tableHead);
    data.items.forEach((item: WinnerCar, index: number): void => tbody.append(this.generateTableRow(item, index + 1)));
    return table;
  }

  createTable() {
    let table = document.getElementById('table');
    if (!table) {
      table = document.createElement('table');
    } else {
      table.remove();
      table = document.createElement('table');
    }
    table.classList.add('table');
    table.id = 'table';
    return table;
  }

  createTableHead() {
    const number = this.createTH('Number');
    const car = this.createTH('Car');
    const name = this.createTH('Name');
    const wins = this.createTH('Wins', 'wins');
    const bestTime = this.createTH('Best time (s)', 'best-time');
    const tr = this.createTR('table-head');
    tr.append(number, car, name, wins, bestTime);
    return tr;
  }

  createTH(value: string, cssClass?: string) {
    const th = document.createElement('th');
    th.classList.add('th');
    if (cssClass !== undefined) {
      th.classList.add(cssClass);
      th.id = cssClass;
    }
    th.innerHTML = value;
    return th;
  }

  createTR(value: string) {
    const tr = document.createElement('tr');
    tr.classList.add('tr');
    tr.id = value;
    return tr;
  }

  generateTableRow(value: WinnerCar, position: number) {
    console.log(value);
    const number = this.createTD(`${position}`);
    const SVG = createCarSVG(value.car, { width: `${50}px`, height: `${30}px` });
    const car = this.createTD('');
    car.append(SVG);
    const name = this.createTD(`${value.car.name}`);
    const wins = this.createTD(`${value.wins}`);
    const bestTime = this.createTD(`${value.time}`);
    const tr = this.createTR(`table-row-${value.id}`);
    tr.append(number, car, name, wins, bestTime);
    return tr;
  }

  createTD(value: string) {
    const td = document.createElement('td');
    td.classList.add('td');
    td.innerText = value;
    return td;
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
