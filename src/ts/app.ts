import { navigatorController } from './controller/navigator.js';
import { navigatorRenderer } from './view/navigator.js';

export const app = (): void => {
  navigatorRenderer();
  navigatorController();
};

app();
