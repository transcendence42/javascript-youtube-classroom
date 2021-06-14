var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { $, removeChildNodes, setDataKey, removeInnerHTML } from '../@shared/utils/utils.js';
import { getQueryString } from '../@shared/utils/getQueryString.js';
import { renderSearchPage, getRecentSearchItem, getSearchVideoWrapper, renderSavedVideoLength, } from '../view/search-page.js';
import { ENV } from '../@shared/constants/env.js';
import { VideoModel, model } from '../model/index.js';
import { renderMainPage } from '../view/main-page.js';
import { getVideoHTMLWithRawData } from '../view/index.js';
const onModalShow = () => {
    var _a, _b;
    renderSavedVideoLength(model.getLocalStorageItem('videos').length);
    removeInnerHTML($('#modal-recent-search-items'));
    (_a = $('#modal-recent-search-items')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('afterbegin', getRecentSearchItem());
    (_b = $('.modal')) === null || _b === void 0 ? void 0 : _b.classList.add('open');
};
const onModalClose = () => {
    var _a, _b;
    (_a = $('.modal')) === null || _a === void 0 ? void 0 : _a.classList.remove('open');
    (_b = $('#main-page-button')) === null || _b === void 0 ? void 0 : _b.click();
};
const clickModalSearchButton = (e) => {
    var _a;
    let modalSearchInput;
    if (e.keyCode && e.keyCode !== 13) {
        return;
    }
    modalSearchInput =
        (e === null || e === void 0 ? void 0 : e.target).tagName === 'BUTTON' || (e === null || e === void 0 ? void 0 : e.target).tagName === 'INPUT'
            ? (_a = $('#modal-search-input')) === null || _a === void 0 ? void 0 : _a.value
            : (e === null || e === void 0 ? void 0 : e.target).innerText;
    if (modalSearchInput) {
        setDataKey($('#modal-search-input'), 'value', modalSearchInput);
        model.addRecentSearch(modalSearchInput);
        removeChildNodes($('#modal-recent-search-items'));
        $('#modal-search-input').value = '';
        renderSearchPage({ q: modalSearchInput });
    }
    else {
        alert('검색어를 입력하세요.');
        $('#modal-search-input').value = '';
        $('#modal-search-input').focus();
    }
};
const disableSaveButton = (modalSaveButton) => {
    modalSaveButton.innerText = '✅ 저장 완료';
    modalSaveButton.disabled = true;
};
const clickModalVideosSaveButton = (e) => {
    if ((e === null || e === void 0 ? void 0 : e.target).classList.contains('modal-save-button')) {
        const modalSaveButton = e === null || e === void 0 ? void 0 : e.target;
        if (modalSaveButton) {
            const videoWrapper = modalSaveButton.closest('.clip');
            let newVideo = new VideoModel();
            if (model.addSaveVideos(newVideo.setVideoModelFromVideoWrapper(videoWrapper))) {
                renderSavedVideoLength(model.getLocalStorageItem('videos').length);
                disableSaveButton(modalSaveButton);
                renderMainPage();
            }
        }
    }
};
const scrollDownEvent = (scrollPos) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const modalInner = $('.modal-inner');
    if (0.9 < scrollPos / (modalInner.scrollHeight - modalInner.offsetHeight)) {
        const data = yield getQueryString({
            q: (_a = $('#modal-search-input')) === null || _a === void 0 ? void 0 : _a.dataset.value,
            maxResults: ENV.YOUTUBE_MAX_RESULTS,
            type: ENV.YOUTUBE_TYPE,
            nextPageToken: (_b = $('#modal-search-input')) === null || _b === void 0 ? void 0 : _b.dataset.token,
        });
        $('#modal-search-input').dataset.token = data.nextPageToken;
        (_c = $('#modal-videos')) === null || _c === void 0 ? void 0 : _c.insertAdjacentHTML('beforeend', getVideoHTMLWithRawData(data, getSearchVideoWrapper));
        modalInner.scroll(0, scrollPos);
    }
});
const scrollThrottling = (lastKnownScrollPosition, ticking) => {
    var _a;
    lastKnownScrollPosition = (_a = $('.modal-inner')) === null || _a === void 0 ? void 0 : _a.scrollTop;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            scrollDownEvent(lastKnownScrollPosition);
            ticking = false;
        });
        ticking = true;
    }
};
const scrollModalInner = (e) => {
    let lastKnownScrollPosition = 0;
    let ticking = false;
    scrollThrottling(lastKnownScrollPosition, ticking);
};
const submitPreventDefault = (e) => {
    e === null || e === void 0 ? void 0 : e.preventDefault();
};
export const modalController = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    setDataKey($('#modal-search-input'), 'value', '');
    setDataKey($('#modal-search-input'), 'token', '');
    (_a = $('#search-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', onModalShow);
    (_b = $('.modal-close')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', onModalClose);
    (_c = $('#modal-search-button')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', clickModalSearchButton);
    (_d = $('#modal-search-form')) === null || _d === void 0 ? void 0 : _d.addEventListener('submit', submitPreventDefault);
    (_e = $('#modal-search-input')) === null || _e === void 0 ? void 0 : _e.addEventListener('keypress', clickModalSearchButton);
    (_f = $('#modal-recent-search-items')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', clickModalSearchButton);
    (_g = $('#modal-videos')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', clickModalVideosSaveButton);
    (_h = $('.modal-inner')) === null || _h === void 0 ? void 0 : _h.addEventListener('scroll', scrollModalInner);
};
