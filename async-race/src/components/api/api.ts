import { WinnerCar, Winner, CarModel, Car, Body } from '../types/types';

const base = 'http://localhost:3000';
const garage = `${base}/garage`;
const winners = `${base}/winners`;
const engine = `${base}/engine`;

export const getCars = async () => {
  const response = await fetch(`${garage}`);
  const items = await response.json();

  return {
    items: await Promise.all(items),
  };
};

export const getCar = async (id: number) => (await fetch(`${garage}/${id}`)).json();

export const getWinners = async () => {
  const response = await fetch(`${winners}`);
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

export const requestCarDelete = async (id: number): Promise<void> =>
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const controlEngineApi = async (id: number, status: string) =>
  (
    await fetch(`${engine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    })
  ).json();

export const driveApi = async (id: number) => {
  const res: Response = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

const createWinnerApi = async (body: Winner) =>
  (
    await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

const updateWinnerApi = async (body: Winner) =>
  (
    await fetch(`${winners}/${body.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const saveWinnerApi = async (id: number, time: number) => {
  const winnerStatus: number = (await fetch(`${winners}/${id}`)).status;
  if (winnerStatus === 404) {
    await createWinnerApi({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner: Winner = (await fetch(`${winners}/${id}`)).json() as unknown as Winner;
    await updateWinnerApi({ id, wins: winner.wins + 1, time: time < winner.time ? time : winner.time });
  }
};

export const deleteWinnerApi = async (id: number): Promise<void> =>
  (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();
