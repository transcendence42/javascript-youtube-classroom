import { $, $$ } from '../util.js';
import { getSavedVideos } from '../model/handleLocalStorage/articleManager.js';
import { savedVideoArticle, savedVideoSection } from './videoPage/index.js';
import { IVideoInfo } from '../model/IVideoInfo.js';

export const renderEmptyVideo = () => {
  ($('#saved-video-section') as HTMLDivElement).insertAdjacentHTML('beforeend', '<p>본 영상이 없습니다.</p>');
};

export const watchedVideoPageRenderer = () => {
  $('#video-list')?.remove();
  $('header')?.insertAdjacentHTML('afterend', savedVideoSection());
  const savedVideoList = getSavedVideos();
  let watchedVideoList: IVideoInfo[] = savedVideoList.filter((video) => video.isWatched === true);
  if (watchedVideoList.length === 0) {
    ($('#saved-video-section') as HTMLDivElement).insertAdjacentHTML('beforeend', '<p>본 영상이 없습니다.</p>');
  }
  watchedVideoList.forEach((video) => {
    ($('#saved-video-section') as HTMLDivElement).insertAdjacentHTML('beforeend', savedVideoArticle(video));
  });
  ($$('span.video-watched-button') as NodeListOf<HTMLSpanElement>).forEach((elem) => {
    elem.classList.remove('opacity-hover');
  });
};

export const removeArticle = (article: HTMLDivElement) => {
  article.remove();
};
