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
