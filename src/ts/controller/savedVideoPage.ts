import { $, $$ } from '../util.js';
import { unsaveVideo, changeWatchedState, getSavedVideos } from '../model/handleLocalStorage/articleManager.js';
import { IVideoInfo } from '../model/IVideoInfo.js';
import { removeArticle, renderEmptyVideoMessage } from '../view/savedVideoPage.js';
import { reRenderSavedButtonText, reRenderNumOfSavedVideos } from '../view/videoSearchPage.js';

const checkEmptyUnwatchedVideo = (): boolean => {
  let unwatchedVideoList: IVideoInfo[] = getSavedVideos().filter((video) => video.isWatched === false);
  if (unwatchedVideoList.length === 0) {
    return true;
  }
  return false;
};

const addEventToWatchedButton = () => {
  ($$('span.video-watched-button') as NodeListOf<HTMLSpanElement>).forEach((elem) => {
    elem.addEventListener('click', () => {
      const article: HTMLDivElement = elem.closest('article') as HTMLDivElement;
      changeWatchedState(article.dataset.videoId!);
      removeArticle(article);
      if (checkEmptyUnwatchedVideo()) {
        renderEmptyVideoMessage();
      }
    });
  });
};

const addEventToRemoveButton = () => {
  ($$('span.video-remove-button') as NodeListOf<HTMLSpanElement>).forEach((elem) => {
    elem.addEventListener('click', () => {
      const article: HTMLDivElement = elem.closest('article') as HTMLDivElement;
      if (confirm('정말 삭제하시겠습니까?')) {
        unsaveVideo(article.dataset.videoId!);
        removeArticle(article);
        changeButtonInSearchPage(article);
        reRenderNumOfSavedVideos();
      }
      if (checkEmptyUnwatchedVideo()) {
        renderEmptyVideoMessage();
      }
    });
  });
};

const changeButtonInSearchPage = (article: HTMLDivElement): void => {
  ($$('#searched-article-wrapper button') as NodeListOf<HTMLButtonElement>).forEach((elem) => {
    if (elem.dataset.videoId === article.dataset.videoId) {
      elem.dataset.saved = 'no';
      reRenderSavedButtonText(elem);
    }
  });
};

export const savedVideoPageController = () => {
  addEventToWatchedButton();
  addEventToRemoveButton();
};
