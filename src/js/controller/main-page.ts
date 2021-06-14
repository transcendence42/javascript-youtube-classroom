import { renderMainPage } from '../view/main-page.js';
import { clickCheckButtons } from './index.js';
import { $ } from '../@shared/utils.js';

const clickMainPageButton = (): void => {
  renderMainPage();
};

export const mainPageController = (): void => {
  $('#main-videos')?.addEventListener('click', clickCheckButtons);
  $('#main-page-button')?.addEventListener('click', clickMainPageButton);
};
