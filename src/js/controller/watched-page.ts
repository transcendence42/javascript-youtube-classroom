import { $ } from '../@shared/utils/utils.js';
import { renderWatchedPage } from '../view/watched-page.js';

const clickWatchedPageButton = () => {
  renderWatchedPage();
};

const watchedPageController = () => {
  $('#watched-page-button')?.addEventListener('click', clickWatchedPageButton);
};

export { watchedPageController };
