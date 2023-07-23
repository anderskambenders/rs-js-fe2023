import { WinnerCar, Winner, CarModel, Car, Body } from '../types/types';

const base = 'http://localhost:3000';
const garage = `${base}/garage`;
const winners = `${base}/winners`;

export const getCars = async () => {
  const response = await fetch(`${garage}`);
  const items = await response.json();

  return {
    items: await Promise.all(items),
  };
};

const getSortOrder = (sort: string, order: string) => {
  if (sort && sort) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const getCar = async (id: number) => (await fetch(`${garage}/${id}`)).json();

export const getWinners = async (page: number, sort: string, order: string, limit = 10) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await response.json();

  return {
    items: await Promise.all(
      items.map(async (winner: Winner): Promise<WinnerCar> => ({ ...winner, car: await getCar(winner.id) }))
    ),
    count: response.headers.get('X-Total-Count'),
  };
};

export const createCarApi = async (body: CarModel): Promise<CarModel> => {
  const response = await fetch(`${garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const car: CarModel = await response.json();
  return car;
};

export const updateCarApi = async (id: number, body: Body): Promise<Car> =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const deleteCarAPI = async (id: number): Promise<void> =>
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
