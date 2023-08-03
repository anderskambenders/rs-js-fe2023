import { CallbackFn } from '../types/types';

export function createElement(params: {
  tag: string;
  style: string[];
  id?: string;
  type?: string;
  value?: string;
  listener?: CallbackFn;
}) {
  const elem = document.createElement(params.tag);
  elem.classList.add(...params.style);
  if (params.id) {
    elem.id = params.id;
  }
  if (params.type) {
    (elem as HTMLInputElement).type = params.type;
  }
  if (params.value) {
    (elem as HTMLInputElement).value = params.value;
  }
  if (params.listener) {
    elem.addEventListener('click', params.listener);
  }
  return elem;
}
