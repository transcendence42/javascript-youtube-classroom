import { $, removeChildNodes } from '../../@shared/utils/utils.js';
import { searchPageModel } from '../../model/search-page/index.js';
import { renderSearchPage, getRecentSearchItem } from '../../view/search-page/index.js';
const onModalShow = () => {
    var _a;
    renderSearchPage();
    (_a = $('.modal')) === null || _a === void 0 ? void 0 : _a.classList.add('open');
};
const onModalClose = () => {
    var _a;
    (_a = $('.modal')) === null || _a === void 0 ? void 0 : _a.classList.remove('open');
};
const clickModalRecentSearch = () => { };
const clickModalSearchButton = () => {
    var _a;
    const modalSearchInput = $('#modal-search-input');
    if (modalSearchInput) {
        searchPageModel.addRecentSearch(modalSearchInput.value);
        removeChildNodes($('#modal-recent-search-items'));
        (_a = $('#modal-recent-search-items')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('afterbegin', getRecentSearchItem());
        modalSearchInput.value = "";
    }
    else {
        alert('검색어를 입력하세요.');
        // modalSearchInput.value = "";
        // modalSearchInput.focus();
    }
};
export const initModalController = () => {
    var _a, _b, _c, _d;
    (_a = $('#search-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', onModalShow);
    (_b = $('.modal-close')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', onModalClose);
    (_c = $('#modal-search-button')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', clickModalSearchButton);
    (_d = $('#modal-recent-search-items')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', clickModalRecentSearch);
};
