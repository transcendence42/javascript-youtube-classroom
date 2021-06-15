import { $$ } from '../util.js';
import { changeWatchedState, unsaveVideo, getSavedVideos } from '../model/handleLocalStorage/articleManager.js';
import { IVideoInfo } from '../model/IVideoInfo.js';
import { removeArticle, renderEmptyVideoMessage } from '../view/watchedVideoPage.js';
import { reRenderSavedButtonText, reRenderNumOfSavedVideos } from '../view/videoSearchPage.js';

const checkEmptyWatchedVideo = (): boolean => {
  let watchedVideoList: IVideoInfo[] = getSavedVideos().filter((video) => video.isWatched === true);
  if (watchedVideoList.length === 0) {
    return true;
  }
  return false;
};

const addEventToWatchedButton = (): void => {
  ($$('span.video-watched-button') as NodeListOf<HTMLSpanElement>).forEach((elem) => {
    elem.addEventListener('click', () => {
      const article: HTMLDivElement = elem.closest('article') as HTMLDivElement;
      changeWatchedState(article.dataset.videoId!);
      removeArticle(article);
      if (checkEmptyWatchedVideo()) {
        renderEmptyVideoMessage();
      }
    });
  });
};

const addEventToRemoveButton = (): void => {
  ($$('span.video-remove-button') as NodeListOf<HTMLSpanElement>).forEach((elem) => {
    elem.addEventListener('click', () => {
      const article: HTMLDivElement = elem.closest('article') as HTMLDivElement;
      if (confirm('정말 삭제하시겠습니까?')) {
        unsaveVideo(article.dataset.videoId!);
        removeArticle(article);
        changeButtonInSearchPage(article);
        reRenderNumOfSavedVideos();
      }
      if (checkEmptyWatchedVideo()) {
        renderEmptyVideoMessage();
      }
    });
  });
};

const changeButtonInSearchPage = (article: HTMLDivElement): void => {
  ($$('#searched-article-wrapper button') as NodeListOf<HTMLButtonElement>).forEach((elem) => {
    if (elem.dataset.videoId === article.dataset.videoId) {
      elem.dataset.saved = 'false';
      reRenderSavedButtonText(elem);
    }
  });
};

export const watchedVideoPageController = (): void => {
  addEventToWatchedButton();
  addEventToRemoveButton();
};
