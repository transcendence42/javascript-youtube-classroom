import { navigatorController } from './controller/navigatorController.js';
import { navigatorRenderer } from './view/navigatorRenderer.js';
import { snackbarRenderer } from './view/snackbar.js';

export const app = (): void => {
  navigatorRenderer();
  navigatorController();
};

app();
