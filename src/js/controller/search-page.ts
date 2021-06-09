import { $, $$, removeChildNodes, wait } from '../@shared/utils/utils.js';
import { renderSearchPage, getRecentSearchItem,getVideoWrapper, renderSavedVideoLength } from '../view/search-page.js';
import { ENV } from '../@shared/constants/env.js';
import { VideoModel, model } from '../model/index.js';
import { renderMainPage } from '../view/main-page.js';
import { DATA_JSON } from '../view/data.js';

const onModalShow = () => {
  renderSavedVideoLength(model.getLocalStorageItem('videos').length);
  $('.modal')?.classList.add('open');
};

const onModalClose = () => {
  $('.modal')?.classList.remove('open');
};

const clickModalSearchButton = (e: Event) => {
  let modalSearchInput: string;

  modalSearchInput =
    (<HTMLElement>e?.target).tagName === 'BUTTON'
      ? (<HTMLInputElement>$('#modal-search-input'))?.value
      : (<HTMLElement>e?.target).innerText;

  console.log(modalSearchInput);

  if (modalSearchInput) {
    model.addRecentSearch(modalSearchInput);
    removeChildNodes($('#modal-recent-search-items'));
    // init
    (<HTMLInputElement>$('#modal-search-input')).value = '';
    renderSearchPage({ q: modalSearchInput, maxResults: '10', type: 'video' });
  } else {
    alert('검색어를 입력하세요.');
    // modalSearchInput.value = "";
    // modalSearchInput.focus();
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
      console.log(videoWrapper);
      let newVideo: VideoModel = new VideoModel();
      model.addSaveVideos(newVideo.setVideoModelFromVideoWrapper(videoWrapper));
      renderSavedVideoLength(model.getLocalStorageItem('videos').length);
      disableSaveButton(modalSaveButton);
      renderMainPage();
    }
  }
};

const doSomething = async (scrollPos: number) => {
  const modalInner: HTMLDivElement = $('.modal-inner') as HTMLDivElement;

  if ( 0.7 < scrollPos/(modalInner.scrollHeight - modalInner.offsetHeight)) {
    // 10개 또 불러와서 뿌려주기
    await wait(1200);
    const data = DATA_JSON;
    let result: string;
    const saveVideoLinks = model.getLocalStorageItem('videos').map(x => x.videoLink);
    result = data.items
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
    modalInner.scroll(0, scrollPos/(modalInner.scrollHeight - modalInner.offsetHeight) * 100) //올려주기
  }
}

const scrollThrottling = (lastKnownScrollPosition: number , ticking: boolean) => {
  lastKnownScrollPosition = $('.modal-inner')?.scrollTop as number;
  console.log(lastKnownScrollPosition)
  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(lastKnownScrollPosition);
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

export const modalController = () => {
  $('#search-button')?.addEventListener('click', onModalShow);
  $('.modal-close')?.addEventListener('click', onModalClose);
  $('#modal-search-button')?.addEventListener('click', clickModalSearchButton);
  $('#modal-recent-search-items')?.addEventListener('click', clickModalSearchButton);
  $('#modal-videos')?.addEventListener('click', clickModalVideosSaveButton);
  $('.modal-inner')?.addEventListener('scroll', scrollModalInner);
};
