import { createBtn } from '../buttons/button';
import { EventEmitter } from '../event-emitter';
import { CarsResponse, Car } from '../types/types';
import { createCarSVG } from '../utils/carSVG';

export class Garage {
  private emitter: EventEmitter;

  private rootElem: HTMLElement;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.rootElem = this.createElement('section', ['garage'], 'garage');
    this.emitter.subscribe('event:to-garage', () => {
      this.goToGaragePage();
    });
    this.emitter.subscribe('event:to-winners', () => {
      this.goOutOfGaragePage();
    });
  }

  draw(cars: CarsResponse) {
    const garage = this.rootElem;
    const menu = this.generateMenu();
    const pageTitle = this.createPageTitle();
    const trackContainer = this.createElement('div', ['track__container']);
    cars.items.forEach((item: Car): void => {
      trackContainer.append(this.generateTrack(item));
    });
    garage.append(menu, pageTitle, trackContainer);
    return garage;
  }

  generateMenu() {
    const menu = this.createElement('div', ['menu']);
    const createCar = this.createElement('div', ['create_car']);
    const inputTextCreation = this.createElement('input', ['create_text'], 'create_text', 'text');
    const inputColorCreation = this.createElement('input', ['create_color'], 'create_color', 'color', '#FFF');
    createCar.append(inputTextCreation, inputColorCreation, createBtn('create-btn', 'CREATE'));
    const updateCar = this.createElement('div', ['update_car']);
    const inputTextUpdate = this.createElement('input', ['update_text'], 'update_text', 'text');
    const inputColorUpdate = this.createElement('input', ['update_color'], 'update_color', 'color', '#FFF');
    updateCar.append(inputTextUpdate, inputColorUpdate, createBtn('update-btn', 'UPDATE'));
    const raceControls = this.createElement('div', ['race_control']);
    raceControls.append(
      createBtn('race', 'RACE'),
      createBtn('reset', 'RESET'),
      createBtn('genererate-cars', 'GENERATE CARS')
    );
    menu.append(createCar, updateCar, raceControls);
    return menu;
  }

  createPageTitle(value = 1) {
    let pageTitle = document.getElementById('page__title_garage');
    if (!pageTitle) {
      pageTitle = document.createElement('h2');
      pageTitle.classList.add('page__title_garage');
      pageTitle.id = `page__title_garage`;
      pageTitle.innerText = `Garage [page ${value}]`;
    } else {
      pageTitle.innerText = `Garage [page ${value}]`;
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

  generateTrack(car: Car) {
    const track = this.createElement('div', ['track']);
    const controlsContainer = this.createElement('div', ['controls_container']);
    const carManipulation = this.createElement('div', ['car_manipulation']);
    const btnSelect = this.createElement('button', ['button', 'select']);
    (btnSelect as HTMLButtonElement).value = car.id.toString();
    btnSelect.innerText = 'Select';
    const btnRemove = this.createElement('button', ['button', 'remove']);
    (btnRemove as HTMLButtonElement).value = car.id.toString();
    btnRemove.innerText = 'Remove';
    carManipulation.append(btnSelect, btnRemove);
    const engineControl = this.createElement('div', ['engine_control']);
    const btnStart = this.createElement('button', ['button', 'start']);
    (btnStart as HTMLButtonElement).value = car.id.toString();
    btnStart.innerText = 'Start';
    const btnStop = this.createElement('button', ['button', 'stop']);
    (btnStop as HTMLButtonElement).value = car.id.toString();
    btnStop.innerText = 'Stop';
    engineControl.append(btnStart, btnStop);
    const carName = this.createElement('p', ['car_name']);
    carName.innerText = car.name;
    controlsContainer.append(carManipulation, engineControl, carName);
    const trackLayout = this.createElement('div', ['track_layout']);
    const svg: SVGSVGElement = createCarSVG(car, { width: `${150}px`, height: `${60}px` });
    const finish = this.createFinish(car);
    trackLayout.append(svg, finish);
    track.append(controlsContainer, trackLayout);
    return track;
  }

  createFinish(value: Car) {
    const finish: HTMLImageElement = document.createElement('img');
    finish.classList.add('finish');
    finish.src = './assets/finish.jpg';
    finish.alt = 'checkered flag';
    finish.id = `finish-${value.id}`;
    return finish;
  }

  goToGaragePage() {
    this.rootElem.classList.remove('hidden');
    this.rootElem.classList.add('visible');
  }

  goOutOfGaragePage() {
    this.rootElem.classList.remove('visible');
    this.rootElem.classList.add('hidden');
  }
}
