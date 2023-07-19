import { createBtn } from '../buttons/button';

export class Garage {
  draw() {
    const garage = this.createElement('section', 'garage', 'garage');
    const menu = this.generateMenu();
    garage.append(menu);
    return garage;
  }

  generateMenu() {
    const menu = this.createElement('div', 'menu');
    const createCar = this.createElement('div', 'create_car');
    const inputTextCreation = this.createElement('input', 'create_text', 'create_text', 'text');
    const inputColorCreation = this.createElement('input', 'create_color', 'create_color', 'color', '#FFF');
    createCar.append(inputTextCreation, inputColorCreation, createBtn('create-btn', 'CREATE'));
    const updateCar = this.createElement('div', 'update_car');
    const inputTextUpdate = this.createElement('input', 'update_text', 'update_text', 'text');
    const inputColorUpdate = this.createElement('input', 'update_color', 'update_color', 'color', '#FFF');
    updateCar.append(inputTextUpdate, inputColorUpdate, createBtn('update-btn', 'UPDATE'));
    const raceControls = this.createElement('div', 'race_control');
    raceControls.append(
      createBtn('race', 'RACE'),
      createBtn('reset', 'RESET'),
      createBtn('genererate-cars', 'GENERATE CARS')
    );
    menu.append(createCar, updateCar, raceControls);
    return menu;
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
}
