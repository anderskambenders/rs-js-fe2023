import { createBtn } from '../buttons/button';
import { EventEmitter } from '../event-emitter';
import { Car, Results } from '../types/types';
import { createCarSVG } from '../utils/carSVG';
import {
  createCarApi,
  getCars,
  getCar,
  updateCarApi,
  deleteCarApi,
  controlEngineApi,
  driveApi,
  saveWinnerApi,
  deleteWinnerApi,
} from '../api/api';
import { Animation } from './animation';

export class Garage {
  private emitter: EventEmitter;

  private rootElem: HTMLElement;

  private Animation: Animation;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.rootElem = this.createElement('section', ['garage'], 'garage');
    this.Animation = new Animation();
    this.emitter.subscribe('event:to-garage', () => {
      this.goToGaragePage();
    });
    this.emitter.subscribe('event:to-winners', () => {
      this.goOutOfGaragePage();
    });
  }

  draw() {
    const garage = this.rootElem;
    const menu = this.generateMenu();
    const pageTitle = this.createPageTitle();
    const trackContainer = this.createElement('div', ['track__container'], 'track_container');
    this.generateTracks(trackContainer);
    garage.append(menu, pageTitle, trackContainer);
    return garage;
  }

  async generateTracks(container: HTMLElement) {
    const cars = await getCars();
    cars.items.forEach((item: Car): void => {
      container.append(this.generateTrack(item));
    });
  }

  generateMenu() {
    const menu = this.createElement('div', ['menu']);
    const createCar = this.createElement('div', ['create_car']);
    const inputTextCreation = this.createElement('input', ['create_text'], 'create_text', 'text');
    const inputColorCreation = this.createElement('input', ['create_color'], 'create_color', 'color', '#FFF');
    const createButton = this.createElement('button', ['create_btn', 'button'], 'create_btn');
    createButton.innerText = 'CREATE';
    createButton.addEventListener('click', () => {
      this.setCreateCarListener();
    });
    createCar.append(inputTextCreation, inputColorCreation, createButton);
    const updateCar = this.createElement('div', ['update_car']);
    const inputTextUpdate = this.createElement('input', ['update_text'], 'update_text', 'text');
    const inputColorUpdate = this.createElement('input', ['update_color'], 'update_color', 'color', '#FFF');
    const updateButton = this.createElement('button', ['update_btn', 'button'], 'update_btn');
    updateButton.innerText = 'UPDATE';
    updateButton.addEventListener('click', () => {
      this.updateCarListener();
      console.log('update');
    });
    updateCar.append(inputTextUpdate, inputColorUpdate, updateButton);
    const raceControls = this.createElement('div', ['race_control']);
    const raceBtn = this.createElement('button', ['race', 'button'], 'race');
    raceBtn.innerText = 'RACE';
    raceBtn.addEventListener('click', (e) => {
      this.race(e);
    });
    raceControls.append(raceBtn, createBtn('reset', 'RESET'), createBtn('generate-cars', 'GENERATE CARS'));
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
    carManipulation.append(...this.generateCarManipulations(car));
    const engineControl = this.createElement('div', ['engine_control']);
    const btnStart = this.createElement('button', ['button', 'start'], 'start');
    (btnStart as HTMLButtonElement).value = car.id.toString();
    btnStart.innerText = 'Start';
    btnStart.addEventListener('click', (e) => {
      this.drive(e.target as HTMLButtonElement);
    });
    const btnStop = this.createElement('button', ['button', 'stop']);
    (btnStop as HTMLButtonElement).value = car.id.toString();
    btnStop.innerText = 'Stop';
    btnStop.addEventListener('click', (e) => {
      this.drive(e.target as HTMLButtonElement);
    });
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

  generateCarManipulations(car: Car) {
    const btnSelect = this.createElement('button', ['button', 'select']);
    (btnSelect as HTMLButtonElement).value = car.id.toString();
    btnSelect.innerText = 'Select';
    btnSelect.addEventListener('click', (e) => {
      const carId = (e.target as HTMLButtonElement).value;
      this.selectListener(+carId);
    });
    const btnRemove = this.createElement('button', ['button', 'remove']);
    (btnRemove as HTMLButtonElement).value = car.id.toString();
    btnRemove.innerText = 'Remove';
    btnRemove.addEventListener('click', (e) => {
      const carId = (e.target as HTMLButtonElement).value;
      this.removeListener(+carId);
    });
    return [btnSelect, btnRemove];
  }

  createFinish(value: Car) {
    const finish: HTMLImageElement = document.createElement('img');
    finish.classList.add('finish');
    finish.src = './assets/finish.jpg';
    finish.id = `finish-${value.id}`;
    return finish;
  }

  async setCreateCarListener() {
    const carName: HTMLInputElement | null = document.querySelector('#create_text');
    const carColor: HTMLInputElement | null = document.querySelector('#create_color');
    const container = document.getElementById('track_container');
    if (carName && carColor) {
      if (carName.value === '') return;
      await createCarApi({ name: carName.value, color: carColor.value });
      (container as HTMLElement).innerHTML = '';
      this.generateTracks(container as HTMLElement);
    }
  }

  async selectListener(carId: number) {
    const car: Car = await getCar(carId);
    const textInput: HTMLInputElement | null = document.getElementById('update_text') as HTMLInputElement | null;
    const colorInput: HTMLInputElement | null = document.getElementById('update_color') as HTMLInputElement | null;
    const updateBtn: HTMLButtonElement | null = document.getElementById('update_btn') as HTMLButtonElement | null;
    (textInput as HTMLInputElement).value = car.name;
    (colorInput as HTMLInputElement).value = car.color;
    (updateBtn as HTMLButtonElement).value = `${carId}`;
    window.scrollTo(0, 0);
  }

  async updateCarListener() {
    const textInput = document.getElementById('update_text') as HTMLInputElement | null;
    const colorInput = document.getElementById('update_color') as HTMLInputElement | null;
    const updateBtn = document.getElementById('update_btn') as HTMLButtonElement | null;
    const container = document.getElementById('track_container');
    await updateCarApi(Number((updateBtn as HTMLButtonElement).value), {
      name: textInput?.value as string,
      color: colorInput?.value as string,
    });
    (textInput as HTMLInputElement).value = '';
    (colorInput as HTMLInputElement).value = '#FFFFFF';
    (updateBtn as HTMLButtonElement).value = ``;
    (container as HTMLElement).innerHTML = '';
    this.generateTracks(container as HTMLElement);
  }

  async removeListener(carId: number) {
    const container = document.getElementById('track_container');
    await deleteCarApi(carId);
    await deleteWinnerApi(carId);
    (container as HTMLElement).innerHTML = '';
    await this.generateTracks(container as HTMLElement);
    this.emitter.emit('event:update-winners');
  }

  async drive(targetEvent: HTMLButtonElement) {
    const carId = +(targetEvent as HTMLButtonElement).value;
    let successStatus;
    let status: string;
    if ((targetEvent as HTMLButtonElement).classList.contains('start')) {
      status = 'started';
      (targetEvent as HTMLButtonElement).classList.toggle('disabled');
      (targetEvent as HTMLButtonElement).nextElementSibling?.classList.toggle('disabled');
    } else {
      status = 'stopped';
      (targetEvent as HTMLButtonElement).classList.toggle('disabled');
      (targetEvent as HTMLButtonElement).previousElementSibling?.classList.toggle('disabled');
    }
    const responseEngine = await controlEngineApi(carId, status);
    const time: number = Math.round(responseEngine.distance / responseEngine.velocity) / 1000;
    if (status === 'started') {
      this.Animation.animate(carId, responseEngine);
      this.Animation.stoppedAnimations.delete(carId);
      const { success } = await driveApi(carId);
      if (!success && !this.Animation.stoppedAnimations.has(carId)) {
        window.cancelAnimationFrame(this.Animation.requestId.get(carId) as number);
      }
      if (success) {
        successStatus = success;
      }
    } else {
      this.Animation.animate(carId, responseEngine);
      this.Animation.stoppedAnimations.set(carId, carId);
    }
    return { successStatus, carId, time } as Results;
  }

  async race(event: Event) {
    const container = document.getElementById('track_container');
    const target: HTMLButtonElement = event.target as HTMLButtonElement;
    (container as HTMLElement).innerHTML = '';
    await this.generateTracks(container as HTMLElement);
    const members = document.querySelectorAll('.start');
    const promises = Array.from(members).map(async (member) => {
      return this.drive(member as HTMLButtonElement);
    });
    Promise.any(promises).then(async (data: Results | undefined) => {
      target.nextElementSibling?.classList.toggle('disabled');
      const { carId, time } = data as Results;
      await saveWinnerApi(carId, time);
      this.emitter.emit('event:update-winners');
    });
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
