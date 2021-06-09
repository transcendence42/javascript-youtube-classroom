import { $ } from '../@shared/utils/utils.js';
import { clickCheckButtons } from './index.js';
import { renderMainPage } from '../view/main-page.js';

const clickMainPageButton = () => {
  renderMainPage();
};

export const mainPageController = () => {
  $('#main-videos')?.addEventListener('click', clickCheckButtons);
  $('#main-page-button')?.addEventListener('click', clickMainPageButton);
};
