export type SVGSizes = { width: `${number}px`; height: `${number}px` };
export interface CarsResponse {
  items: Car[];
}

export interface Car {
  name: string;
  color: string;
  id: number;
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;

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
