import { CallbackFn } from '../types/types';

export function createBtn(id: string, text: string, style?: string, listener?: CallbackFn) {
  const btn: HTMLButtonElement = document.createElement('button');
  btn.classList.add(style as string);
  btn.id = id;
  btn.innerText = text;
  if (listener) {
    btn.addEventListener('click', listener);
  }
  return btn;
}
