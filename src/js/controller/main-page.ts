import { $ } from '../@shared/utils/utils.js';
import { clickCheckButtons } from './index.js';

export const mainPageController = () => {
  $('#main-videos')?.addEventListener('click', clickCheckButtons);
};
