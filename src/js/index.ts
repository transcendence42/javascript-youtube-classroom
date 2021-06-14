import { initController } from './controller/index.js';
import { renderView } from './view/index.js';

const app = () => {
  renderView();
  initController();
};

app();
