import { carModel, carName } from './carData';
import { createCarApi } from '../api/api';

function generateRandomCarName() {
  const randomCarName = carName[Math.round(Math.random() * carName.length)];
  const randomCarModel = carModel[Math.round(Math.random() * carModel.length)];
  return `${randomCarName} ${randomCarModel}`;
}

function generateRandomColor() {
  const hexArr = '01234567890ABCDEF'.split('');
  const getRandomHexPart = (arr: string[]) => arr.sort(() => Math.random() - 0.5).slice(0, 2);
  let color = '';
  for (let i = 0; i < 3; i += 1) {
    color += getRandomHexPart(hexArr).join('');
  }
  return `#${color}`;
}

export async function generateCars(carsCount: number) {
  const carsArr = [];
  for (let i = 0; i < carsCount; i += 1) {
    carsArr.push(createCarApi({ name: generateRandomCarName(), color: generateRandomColor() }));
  }
  return Promise.all(carsArr);
}
