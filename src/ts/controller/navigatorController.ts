import { $ } from '../util.js';
import { videoSearchPageRenderer } from '../view/videoSearchPage.js';
import { videoSearchPageController } from './videoSearchPageController.js';

const onModalShow = ($modal: HTMLDivElement): void => {
  $modal.classList.add('open');
  $('#search-input')?.focus();
};

export const navigatorController = (): void => {
  videoSearchPageRenderer();
  videoSearchPageController();
  const $modal: HTMLDivElement = $('.modal') as HTMLDivElement;
  $('#search-button')!.addEventListener('click', () => onModalShow($modal));
};
