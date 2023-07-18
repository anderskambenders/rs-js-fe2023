export function createBtn(id: string, text: string, style = 'button') {
  const btn: HTMLButtonElement = document.createElement('button');
  btn.classList.add(style);
  btn.id = id;
  btn.innerText = text;
  return btn;
}
