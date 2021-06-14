import { $, removeChildNodes, setDataKey, removeInnerHTML } from '../@shared/utils/utils.js';
import { YoutubeResponse, getQueryString } from '../model/get-query-string.js';
import {
  renderSearchPage,
  getRecentSearchItem,
  getSearchVideoWrapper,
  renderSavedVideoLength,
} from '../view/search-page.js';
import { getVideoHTMLWithRawData } from '../view/index.js';
import { VideoModel, model } from '../model/index.js';
import { renderMainPage } from '../view/main-page.js';
import { ENV } from '../@shared/constants/env.js';

const onModalShow = (): void => {
  renderSavedVideoLength(model.getLocalStorageItem('videos').length);
  removeInnerHTML($('#modal-recent-search-items'));
  $('#modal-recent-search-items')?.insertAdjacentHTML('afterbegin', getRecentSearchItem());
  $('.modal')?.classList.add('open');
};

const onModalClose = (): void => {
  $('.modal')?.classList.remove('open');
  $('#main-page-button')?.click();
};

const clickModalSearchButton = (e: Event | KeyboardEvent): void => {
  let modalSearchInput: string;
  if ((<KeyboardEvent>e).keyCode && (<KeyboardEvent>e).keyCode !== 13) {
    return;
  }
  modalSearchInput =
    (<HTMLElement>e?.target).tagName === 'BUTTON' || (<HTMLElement>e?.target).tagName === 'INPUT'
      ? (<HTMLInputElement>$('#modal-search-input'))?.value
      : (<HTMLElement>e?.target).innerText;

  if (modalSearchInput) {
    setDataKey($('#modal-search-input'), 'value', modalSearchInput);
    model.addRecentSearch(modalSearchInput);
    removeChildNodes($('#modal-recent-search-items'));
    (<HTMLInputElement>$('#modal-search-input')).value = '';
    renderSearchPage({ q: modalSearchInput });
  } else {
    alert('검색어를 입력하세요.');
    (<HTMLInputElement>$('#modal-search-input')).value = '';
    (<HTMLInputElement>$('#modal-search-input')).focus();
  }
};

const disableSaveButton = (modalSaveButton: HTMLButtonElement): void => {
  modalSaveButton.innerText = '✅ 저장 완료';
  modalSaveButton.disabled = true;
};

const clickModalVideosSaveButton = (e: Event | null): void => {
  if ((<HTMLElement>e?.target).classList.contains('modal-save-button')) {
    const modalSaveButton: HTMLButtonElement | null = e?.target as HTMLButtonElement;
    if (modalSaveButton) {
      const videoWrapper: HTMLElement | null = modalSaveButton.closest('.clip');
      let newVideo: VideoModel = new VideoModel();
      if (model.addSaveVideos(newVideo.setVideoModelFromVideoWrapper(videoWrapper))) {
        renderSavedVideoLength(model.getLocalStorageItem('videos').length);
        disableSaveButton(modalSaveButton);
        renderMainPage();
      }
    }
  }
};

const scrollDownEvent = async (scrollPos: number): Promise<void> => {
  const modalInner: HTMLDivElement = $('.modal-inner') as HTMLDivElement;

  if (0.9 < scrollPos / (modalInner.scrollHeight - modalInner.offsetHeight)) {
    const data: YoutubeResponse = await getQueryString({
      q: $('#modal-search-input')?.dataset.value as string,
      maxResults: ENV.YOUTUBE_MAX_RESULTS,
      type: ENV.YOUTUBE_TYPE,
      nextPageToken: $('#modal-search-input')?.dataset.token as string,
    });

    $('#modal-search-input')!.dataset.token = data.nextPageToken;
    $('#modal-videos')?.insertAdjacentHTML('beforeend', getVideoHTMLWithRawData(data, getSearchVideoWrapper));
    modalInner.scroll(0, scrollPos);
  }
};

const scrollThrottling = (lastKnownScrollPosition: number, ticking: boolean): void => {
  lastKnownScrollPosition = $('.modal-inner')?.scrollTop as number;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      scrollDownEvent(lastKnownScrollPosition);
      ticking = false;
    });
    ticking = true;
  }
};

const scrollModalInner = (): void => {
  let lastKnownScrollPosition: number = 0;
  let ticking: boolean = false;

  scrollThrottling(lastKnownScrollPosition, ticking);
};

const submitPreventDefault = (e: Event | null) => {
  e?.preventDefault();
};

export const modalController = (): void => {
  setDataKey($('#modal-search-input'), 'value', '');
  setDataKey($('#modal-search-input'), 'token', '');
  $('#search-button')?.addEventListener('click', onModalShow);
  $('.modal-close')?.addEventListener('click', onModalClose);
  $('#modal-search-button')?.addEventListener('click', clickModalSearchButton);
  $('#modal-search-form')?.addEventListener('submit', submitPreventDefault);
  $('#modal-search-input')?.addEventListener('keypress', clickModalSearchButton);
  $('#modal-recent-search-items')?.addEventListener('click', clickModalSearchButton);
  $('#modal-videos')?.addEventListener('click', clickModalVideosSaveButton);
  $('.modal-inner')?.addEventListener('scroll', scrollModalInner);
};
