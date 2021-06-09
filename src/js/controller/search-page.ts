import { $, $$, removeChildNodes } from '../@shared/utils/utils.js';
import { renderSearchPage, getRecentSearchItem, renderSavedVideoLength } from '../view/search-page.js';
import { VideoModel, model } from '../model/index.js';
import { renderMainPage } from '../view/main-page.js';

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
}

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

export const modalController = () => {
  $('#search-button')?.addEventListener('click', onModalShow);
  $('.modal-close')?.addEventListener('click', onModalClose);
  $('#modal-search-button')?.addEventListener('click', clickModalSearchButton);
  $('#modal-recent-search-items')?.addEventListener('click', clickModalSearchButton);
  $('#modal-videos')?.addEventListener('click', clickModalVideosSaveButton);
};
