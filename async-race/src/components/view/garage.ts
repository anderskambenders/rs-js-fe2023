import { createBtn } from '../buttons/button';
import { EventEmitter } from '../event-emitter';
import { Car, Results } from '../types/types';
import { createCarSVG } from '../utils/carSVG';
import {
  createCarApi,
  getCars,
  getCar,
  updateCarApi,
  requestCarDelete,
  controlEngineApi,
  driveApi,
  saveWinnerApi,
  deleteWinnerApi,
} from '../api/api';
import { Animation } from './animation';
import { generateCars } from '../utils/generateCars';
import { createElement } from '../utils/createElement';

export class Garage {
  private emitter: EventEmitter;

  private rootElem: HTMLElement;

  private animation: Animation;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.rootElem = createElement({ tag: 'section', style: ['garage'], id: 'garage' });
    this.animation = new Animation();
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
    const trackContainer = createElement({ tag: 'div', style: ['track__container'], id: 'track_container' });
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
    const menu = createElement({ tag: 'div', style: ['menu'] });
    const createCar = this.createCar();
    const updateCar = this.updateCar();
    const raceControls = createElement({ tag: 'div', style: ['race_control'] });
    const raceBtn = createElement({ tag: 'button', style: ['race', 'button'], id: 'race' });
    raceBtn.innerText = 'RACE';
    raceBtn.addEventListener('click', (e) => {
      this.race(e);
    });
    const generateCarsBtn = createElement({
      tag: 'button',
      style: ['generate-cars', 'button'],
      id: 'generate-cars',
    });
    generateCarsBtn.innerText = 'GENERATE CARS';
    generateCarsBtn.addEventListener('click', () => {
      this.generateCars();
    });
    raceControls.append(raceBtn, createBtn('reset', 'RESET', 'button'), generateCarsBtn);
    menu.append(createCar, updateCar, raceControls);
    return menu;
  }

  createCar() {
    const createCar = createElement({ tag: 'div', style: ['create_car'] });
    const inputTextCreation = createElement({
      tag: 'input',
      style: ['create_text'],
      id: 'create_text',
      type: 'text',
    });
    const inputColorCreation = createElement({
      tag: 'input',
      style: ['create_color'],
      id: 'create_color',
      type: 'color',
      value: '#FFF',
    });
    const createButton = createElement({
      tag: 'button',
      style: ['create_btn', 'button'],
      id: 'create_btn',
      listener: this.setCreateCarListener.bind(this),
    });
    createButton.innerText = 'CREATE';
    createCar.append(inputTextCreation, inputColorCreation, createButton);
    return createCar;
  }

  updateCar() {
    const updateCar = createElement({ tag: 'div', style: ['update_car'] });
    const inputTextUpdate = createElement({
      tag: 'input',
      style: ['update_text'],
      id: 'update_text',
      type: 'text',
    });
    const inputColorUpdate = createElement({
      tag: 'input',
      style: ['update_color'],
      id: 'update_color',
      type: 'color',
      value: '#FFF',
    });
    const updateButton = createElement({
      tag: 'button',
      style: ['update_btn', 'button'],
      id: 'update_btn',
      listener: this.updateCarListener.bind(this),
    });
    updateButton.innerText = 'UPDATE';
    updateCar.append(inputTextUpdate, inputColorUpdate, updateButton);
    return updateCar;
  }

  createPageTitle(value = 1) {
    let pageTitle = document.getElementById('page__title_garage');
    if (!pageTitle) {
      pageTitle = document.createElement('h2');
      pageTitle.classList.add('page__title_garage');
      pageTitle.id = `page__title_garage`;
    }
    pageTitle.innerText = `Garage [page ${value}]`;
    return pageTitle;
  }

  generateTrack(car: Car) {
    const track = createElement({ tag: 'div', style: ['track'] });
    const controlsContainer = createElement({ tag: 'div', style: ['controls_container'] });
    const carManipulation = createElement({ tag: 'div', style: ['car_manipulation'] });
    carManipulation.append(...this.generateCarManipulations(car));
    const engineControl = createElement({ tag: 'div', style: ['engine_control'] });
    const btnStart = createElement({
      tag: 'button',
      style: ['button', 'start'],
      id: 'start',
      listener: (e) => {
        this.drive((e as Event).target as HTMLButtonElement);
      },
    });
    (btnStart as HTMLButtonElement).value = car.id.toString();
    btnStart.innerText = 'Start';
    const btnStop = createElement({
      tag: 'button',
      style: ['button', 'stop'],
      listener: (e) => {
        this.drive((e as Event).target as HTMLButtonElement);
      },
    });
    (btnStop as HTMLButtonElement).value = car.id.toString();
    btnStop.innerText = 'Stop';
    btnStop.addEventListener('click', (e) => {
      this.drive(e.target as HTMLButtonElement);
    });
    engineControl.append(btnStart, btnStop);
    const carName = createElement({ tag: 'p', style: ['car_name'] });
    carName.innerText = car.name;
    controlsContainer.append(carManipulation, engineControl, carName);
    const trackLayout = createElement({ tag: 'div', style: ['track_layout'] });
    const svg: SVGSVGElement = createCarSVG(car, { width: `${150}px`, height: `${60}px` });
    const finish = this.createFinish(car);
    trackLayout.append(svg, finish);
    track.append(controlsContainer, trackLayout);
    return track;
  }

  generateCarManipulations(car: Car) {
    const btnSelect = createElement({
      tag: 'button',
      style: ['button', 'select'],
      value: car.id.toString(),
      listener: (e) => {
        const carId = ((e as Event).target as HTMLButtonElement).value;
        this.selectListener(+carId);
      },
    });

    btnSelect.innerText = 'Select';
    const btnRemove = createElement({
      tag: 'button',
      style: ['button', 'remove'],
      value: car.id.toString(),
      listener: (e) => {
        const carId = ((e as Event).target as HTMLButtonElement).value;
        this.removeListener(+carId);
      },
    });
    btnRemove.innerText = 'Remove';
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
    await requestCarDelete(carId);
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
      this.animation.animate(carId, responseEngine);
      this.animation.stoppedAnimations.delete(carId);
      const { success } = await driveApi(carId);
      if (!success && !this.animation.stoppedAnimations.has(carId)) {
        window.cancelAnimationFrame(this.animation.requestId.get(carId) as number);
      }
      if (success) {
        successStatus = success;
      }
    } else {
      this.animation.animate(carId, responseEngine);
      this.animation.stoppedAnimations.set(carId, carId);
    }
    return { successStatus, carId, time } as Results;
  }

  async race(event: Event) {
    const container = document.getElementById('track_container');
    const target: HTMLButtonElement = event.target as HTMLButtonElement;
    (container as HTMLElement).innerHTML = '';
    await this.generateTracks(container as HTMLElement);
    const members = document.querySelectorAll('.start');
    const promises = Array.from(members).map((member) => {
      return this.drive(member as HTMLButtonElement);
    });
    Promise.any(promises).then(async (data: Results | undefined) => {
      target.nextElementSibling?.classList.toggle('disabled');
      const { carId, time } = data as Results;
      await saveWinnerApi(carId, time);
      this.emitter.emit('event:update-winners');
    });
  }

  async generateCars() {
    const carsCount = 100;
    const container = document.getElementById('track_container');
    await generateCars(carsCount);
    (container as HTMLElement).innerHTML = '';
    await this.generateTracks(container as HTMLElement);
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
