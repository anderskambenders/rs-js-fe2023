export interface CarsResponse {
  items: Car[];
}

export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface CarModel {
  name: string;
  color: string;
}

export interface WinnersResponse {
  items: WinnerCar[];
  count: string | null;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerCar extends Winner {
  car: Car;
}

export interface Body {
  name: string;
  color: string;
}
