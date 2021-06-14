import { $, $$, removeChildNodes, setDataKey, removeInnerHTML } from '../@shared/utils/utils.js';
import { getQueryString } from '../@shared/utils/getQueryString.js';
import { renderSearchPage, getRecentSearchItem, getVideoWrapper, renderSavedVideoLength } from '../view/search-page.js';
import { ENV } from '../@shared/constants/env.js';
import { VideoModel, model } from '../model/index.js';
import { renderMainPage } from '../view/main-page.js';

const onModalShow = () => {
  renderSavedVideoLength(model.getLocalStorageItem('videos').length);
  removeInnerHTML($('#modal-recent-search-items'));
  $('#modal-recent-search-items')?.insertAdjacentHTML('afterbegin', getRecentSearchItem());
  $('.modal')?.classList.add('open');
};

const onModalClose = () => {
  $('.modal')?.classList.remove('open');
  $('#main-page-button')?.click();
};

const clickModalSearchButton = (e: Event | KeyboardEvent) => {
  let modalSearchInput: string;
  if ((<KeyboardEvent>e).keyCode && (<KeyboardEvent>e).keyCode !== 13) {
    return;
  }
  if ((<KeyboardEvent>e).keyCode && (<KeyboardEvent>e).keyCode === 13) {
    console.log("hahahahaha", (<HTMLElement>e?.target).tagName)
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

const clickModalVideosSaveButton = (e: Event | null) => {
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
    // const data = DATA_JSON;

    const data = await getQueryString({
      q: $('#modal-search-input')?.dataset.value as string,
      maxResults: ENV.YOUTUBE_MAX_RESULTS,
      type: ENV.YOUTUBE_TYPE,
      nextPageToken: $('#modal-search-input')?.dataset.token as string,
    });

    $('#modal-search-input')!.dataset.token = data.nextPageToken;
    const saveVideoLinks = model.getLocalStorageItem('videos').map((x) => x.videoLink);
    let result: string = data.items
      .map((x: any) => {
        return getVideoWrapper({
          videoLink: ENV.YOUTUBE_WATCH_URL + x.id.videoId,
          videoTitle: x.snippet.title,
          channelLink: ENV.YOUTUBE_CHANNEL_URL + x.snippet.channelId,
          channelTitle: x.snippet.channelTitle,
          publishedAt: x.snippet.publishedAt,
          checkView: saveVideoLinks.includes(ENV.YOUTUBE_WATCH_URL + x.id.videoId),
        });
      })
      .join('');
    $('#modal-videos')?.insertAdjacentHTML('afterbegin', result);
    modalInner.scroll(0, scrollPos);
  }
};

const scrollThrottling = (lastKnownScrollPosition: number, ticking: boolean) => {
  lastKnownScrollPosition = $('.modal-inner')?.scrollTop as number;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      scrollDownEvent(lastKnownScrollPosition);
      ticking = false;
    });
    ticking = true;
  }
};

const scrollModalInner = (e: Event | null): void => {
  let lastKnownScrollPosition: number = 0;
  let ticking = false;

  scrollThrottling(lastKnownScrollPosition, ticking);
};

const submitPreventDefault = (e: Event | null) => {
  e?.preventDefault();
};

export const modalController = () => {
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
