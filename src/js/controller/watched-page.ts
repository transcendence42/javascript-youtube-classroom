import { $ } from '../@shared/utils/utils.js';
import { renderWatchedPage } from '../view/watched-page.js';
import { clickCheckButtons } from './index.js';

const clickWatchedPageButton = () => {
  renderWatchedPage();
};

const watchedPageController = () => {
  $('#watched-page-button')?.addEventListener('click', clickWatchedPageButton);
  $('#main-videos')?.addEventListener('click', clickCheckButtons);
};

export { watchedPageController };
