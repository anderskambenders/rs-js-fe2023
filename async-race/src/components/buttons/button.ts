type CallbackFn<T = unknown> = (data: T) => void;

export function createBtn(id: string, text: string, style = 'button', listener?: CallbackFn) {
  const btn: HTMLButtonElement = document.createElement('button');
  btn.classList.add(style);
  btn.id = id;
  btn.innerText = text;
  if (listener) {
    btn.addEventListener('click', listener);
  }
  return btn;
}
