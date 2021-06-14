import { $ } from '../@shared/utils/utils.js';
import { renderLikedPage } from '../view/liked-page.js';
import { clickCheckButtons } from './index.js';

const clickLikedPageButton = () => {
  renderLikedPage();
};

export const likedPageController = () => {
  $('#liked-page-button')?.addEventListener('click', clickLikedPageButton);
  $('#main-videos')?.addEventListener('click', clickCheckButtons);
};
