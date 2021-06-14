import { renderLikedPage } from '../view/liked-page.js';
import { clickCheckButtons } from './index.js';
import { $ } from '../@shared/utils.js';

const clickLikedPageButton = (): void => {
  renderLikedPage();
};

export const likedPageController = (): void => {
  $('#liked-page-button')?.addEventListener('click', clickLikedPageButton);
  $('#main-videos')?.addEventListener('click', clickCheckButtons);
};
