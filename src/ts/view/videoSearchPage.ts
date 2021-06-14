import { $, $$ } from '../util.js';
import {
  modalDiv,
  modalCloseButton,
  modalHeader,
  modalSearchForm,
  modalRecentKeywordSection,
  modalArticleSection,
  modalArticle,
  skeleton,
} from './modalPage/index.js';
import { IVideoInfo } from '../model/IVideoInfo.js';
import { getSavedVideos } from '../model/handleLocalStorage/articleManager.js';

export const renderSearchedArticle = (videoInfo: IVideoInfo): void => {
  const $articleSection: HTMLElement = $('div.modal-inner section.video-wrapper') as HTMLElement;
  $articleSection.insertAdjacentHTML('beforeend', modalArticle(videoInfo));
};

export const renderRecentKeyword = (searchValue: string): void => {
  const $recentKeywordSpan: HTMLSpanElement = $('#recent-keyword > span') as HTMLSpanElement;
  $recentKeywordSpan.insertAdjacentHTML('afterend', `<a class='chip'>${searchValue}</a>`);
};

export const removeModalArticles = (): void => {
  $('div.modal-inner section.video-wrapper')!.innerHTML = '';
};

export const renderNotFoundImage = (): void => {
  removeModalArticles();
  $('div.modal-inner section.video-wrapper')?.insertAdjacentHTML(
    'beforeend',
    '<img src="./src/images/status/not_found.png" />',
  );
};

export const renderSkeleton = (): void => {
  $('div.modal-inner section.video-wrapper')?.insertAdjacentHTML('beforeend', skeleton().repeat(10));
};

export const reRenderSavedButtonText = ($button: HTMLButtonElement): void => {
  $button.innerText = $button.innerText === '❌ 저장 취소' ? '⬇️ 저장' : '❌ 저장 취소';
};

export const reRenderNumOfSavedVideos = (): void => {
  ($('#num-of-videos') as HTMLSpanElement).innerText = String(getSavedVideos().length);
};

export const removeDuplicateRecentKeyword = (searchValue: string): void => {
  ($$('.chip') as NodeListOf<HTMLAnchorElement>).forEach((elem) => {
    if (elem.innerText === searchValue) {
      elem.remove();
    }
  });
};

export const removeOldSearchKeyword = (): void => {
  if (($$('.chip') as NodeList).length === 4) {
    $('a.chip:last-child')?.remove();
  }
};

export const removeSkeletons = (): void => {
  $$('div.modal-inner section.video-wrapper .skeleton')?.forEach((elem) => {
    elem.parentElement?.remove();
  });
};

export const videoSearchPageRenderer = (): void => {
  $('#app')?.insertAdjacentHTML('beforeend', modalDiv());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalCloseButton());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalHeader());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalSearchForm());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalRecentKeywordSection());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalArticleSection());
};
