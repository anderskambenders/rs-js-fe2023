export function clearLevel() {
  (document.querySelector('.table__main') as HTMLElement).innerHTML = '';
  (document.querySelector('.html__field') as HTMLElement).innerHTML = '';
  (document.querySelector('input') as HTMLInputElement).value = '';
}
