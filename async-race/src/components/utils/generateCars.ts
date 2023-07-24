import { carModel, carName } from './carData';
import { createCarApi } from '../api/api';

function generateRandomCarName() {
  const randomCarName = carName[Math.round(Math.random() * carName.length)];
  const randomCarModel = carModel[Math.round(Math.random() * carModel.length)];
  return `${randomCarName} ${randomCarModel}`;
}

function generateRandomColor() {
  const hexArr = '01234567890ABCDEF'.split('');
  const red = hexArr.sort(() => Math.random() - 0.5).slice(0, 2);
  const green = hexArr.sort(() => Math.random() - 0.5).slice(0, 2);
  const blue = hexArr.sort(() => Math.random() - 0.5).slice(0, 2);
  const color = red.join('') + green.join('') + blue.join('');
  return `#${color}`;
}

export async function generateCars() {
  const carsArr = [];
  for (let i = 0; i < 100; i += 1) {
    carsArr.push(createCarApi({ name: generateRandomCarName(), color: generateRandomColor() }));
  }
  return Promise.all(carsArr);
}
