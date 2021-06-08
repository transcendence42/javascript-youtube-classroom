import { $, removeChildNodes } from '../../@shared/utils/utils.js';
import { searchPageModel } from '../../model/search-page/index.js';
import { renderSearchPage, getRecentSearchItem } from '../../view/search-page/index.js';

const onModalShow = () => {
  renderSearchPage();
  $('.modal')?.classList.add('open');
};

const onModalClose = () => {
  $('.modal')?.classList.remove('open');
};

const clickModalRecentSearch = () => {};

const clickModalSearchButton = () => {
  const modalSearchInput: HTMLInputElement | null = <HTMLInputElement>$('#modal-search-input');
  if (modalSearchInput) {
    searchPageModel.addRecentSearch(modalSearchInput.value);
    removeChildNodes($('#modal-recent-search-items'));
    $('#modal-recent-search-items')?.insertAdjacentHTML('afterbegin', getRecentSearchItem());
    modalSearchInput.value = "";
  } else {
    alert('검색어를 입력하세요.');
    // modalSearchInput.value = "";
    // modalSearchInput.focus();
  }
};

export const initModalController = () => {
  $('#search-button')?.addEventListener('click', onModalShow);
  $('.modal-close')?.addEventListener('click', onModalClose);
  $('#modal-search-button')?.addEventListener('click', clickModalSearchButton);
  $('#modal-recent-search-items')?.addEventListener('click', clickModalRecentSearch);
};
