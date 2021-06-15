import { snackbarRenderer } from '../view/snackbar.js';

export const showSnackbar = (text: string) => {
  const $snackbar: HTMLDivElement = document.createElement('div');
  $snackbar.classList.add('snackbar');
  $snackbar.textContent = text;
  snackbarRenderer($snackbar);
  $snackbar.classList.add('show');
  setTimeout(() => {
    $snackbar.remove();
  }, 2900);
};
