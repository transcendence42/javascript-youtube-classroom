import { modalController } from './search-page.js';
import { mainPageController } from './main-page.js';

export function initController() {
  mainPageController();
  modalController();
}
