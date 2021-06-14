import { renderWatchedPage } from '../view/watched-page.js';
import { clickCheckButtons } from './index.js';
import { $ } from '../@shared/utils/utils.js';

const clickWatchedPageButton = (): void => {
  renderWatchedPage();
};

const watchedPageController = (): void => {
  $('#watched-page-button')?.addEventListener('click', clickWatchedPageButton);
  $('#main-videos')?.addEventListener('click', clickCheckButtons);
};

export { watchedPageController };
