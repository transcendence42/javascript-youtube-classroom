import { $ } from '../@shared/utils/utils.js';
import { getModalWrapper } from './search-page.js';
import { renderMainPage } from './main-page.js';

export const renderView = () => {
  renderMainPage();
  $('#app')?.insertAdjacentHTML('beforeend', getModalWrapper());
};
