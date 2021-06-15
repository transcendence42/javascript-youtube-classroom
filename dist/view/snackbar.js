import { $ } from '../util.js';
export const snackbarRenderer = ($snackbar) => {
    $('#app').insertAdjacentElement('beforeend', $snackbar);
};
