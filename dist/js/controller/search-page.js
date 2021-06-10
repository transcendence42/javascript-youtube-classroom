var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { $, removeChildNodes, setDataKey } from '../@shared/utils/utils.js';
import { renderSearchPage, getVideoWrapper, renderSavedVideoLength } from '../view/search-page.js';
import { ENV } from '../@shared/constants/env.js';
import { VideoModel, model } from '../model/index.js';
import { renderMainPage } from '../view/main-page.js';
import { DATA_JSON } from '../view/data.js';
const onModalShow = () => {
    var _a;
    renderSavedVideoLength(model.getLocalStorageItem('videos').length);
    (_a = $('.modal')) === null || _a === void 0 ? void 0 : _a.classList.add('open');
};
const onModalClose = () => {
    var _a, _b;
    (_a = $('.modal')) === null || _a === void 0 ? void 0 : _a.classList.remove('open');
    (_b = $('#main-page-button')) === null || _b === void 0 ? void 0 : _b.click();
};
const clickModalSearchButton = (e) => {
    var _a;
    console.log(e.keyCode);
    if (e.keyCode && e.keyCode !== 13) {
        return;
    }
    let modalSearchInput;
    modalSearchInput =
        (e === null || e === void 0 ? void 0 : e.target).tagName === 'BUTTON' || (e === null || e === void 0 ? void 0 : e.target).tagName === 'INPUT'
            ? (_a = $('#modal-search-input')) === null || _a === void 0 ? void 0 : _a.value
            : (e === null || e === void 0 ? void 0 : e.target).innerText;
    if (modalSearchInput) {
        setDataKey($('#modal-search-input'), 'value', modalSearchInput);
        model.addRecentSearch(modalSearchInput);
        removeChildNodes($('#modal-recent-search-items'));
        $('#modal-search-input').value = '';
        renderSearchPage({ q: modalSearchInput, maxResults: '10', type: 'video' });
    }
    else {
        alert('검색어를 입력하세요.');
        $('#modal-search-input').value = "";
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
            model.addSaveVideos(newVideo.setVideoModelFromVideoWrapper(videoWrapper));
            renderSavedVideoLength(model.getLocalStorageItem('videos').length);
            disableSaveButton(modalSaveButton);
            renderMainPage();
        }
    }
};
const scrollDownEvent = (scrollPos) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const modalInner = $('.modal-inner');
    if (0.9 < scrollPos / (modalInner.scrollHeight - modalInner.offsetHeight)) {
        const data = DATA_JSON;
        const saveVideoLinks = model.getLocalStorageItem('videos').map((x) => x.videoLink);
        let result = data.items
            .map((x) => {
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
        (_a = $('#modal-videos')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('afterbegin', result);
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
    (_a = $('#search-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', onModalShow);
    (_b = $('.modal-close')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', onModalClose);
    (_c = $('#modal-search-button')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', clickModalSearchButton);
    (_d = $('#modal-search-input')) === null || _d === void 0 ? void 0 : _d.addEventListener('keyup', clickModalSearchButton);
    (_e = $('#modal-search-form')) === null || _e === void 0 ? void 0 : _e.addEventListener('submit', submitPreventDefault);
    (_f = $('#modal-recent-search-items')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', clickModalSearchButton);
    (_g = $('#modal-videos')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', clickModalVideosSaveButton);
    (_h = $('.modal-inner')) === null || _h === void 0 ? void 0 : _h.addEventListener('scroll', scrollModalInner);
};
