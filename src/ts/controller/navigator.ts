import { $ } from '../util.js';
import { videoSearchPageRenderer } from '../view/videoSearchPage.js';
import { videoSearchPageController } from './videoSearchPage.js';
import { savedVideoPageRenderer } from '../view/savedVideoPage.js';
import { savedVideoPageController } from './savedVideoPage.js';
import { watchedVideoPageRenderer } from '../view/watchedVideoPage.js';
import { watchedVideoPageController } from './watchedVideoPage.js';

const onModalShow = ($modal: HTMLDivElement): void => {
  $modal.classList.add('open');
  $('#search-input')?.focus();
};

const addClickEventToSavedVideoButton = (): void => {
  ($('#watched-video-button') as HTMLButtonElement).classList.remove('bg-cyan-100');
  ($('#saved-video-button') as HTMLButtonElement).classList.add('bg-cyan-100');
  savedVideoPageRenderer();
  savedVideoPageController();
};

const addClickEventToWatchedVideoButton = (): void => {
  ($('#saved-video-button') as HTMLButtonElement).classList.remove('bg-cyan-100');
  ($('#watched-video-button') as HTMLButtonElement).classList.add('bg-cyan-100');
  watchedVideoPageRenderer();
  watchedVideoPageController();
};

export const navigatorController = (): void => {
  videoSearchPageRenderer();
  videoSearchPageController();
  const $modal: HTMLDivElement = $('.modal') as HTMLDivElement;
  $('#search-button')!.addEventListener('click', () => onModalShow($modal));
  $('#saved-video-button')!.addEventListener('click', () => addClickEventToSavedVideoButton());
  $('#watched-video-button')!.addEventListener('click', () => addClickEventToWatchedVideoButton());
  ($('#saved-video-button') as HTMLButtonElement).click();
};
