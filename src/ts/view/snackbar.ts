import { $ } from '../util.js';

export const snackbarRenderer = ($snackbar: HTMLDivElement): void => {
  ($('#app') as HTMLDivElement).insertAdjacentElement('beforeend', $snackbar);
};
