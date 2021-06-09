import { $, removeChildNodes } from '../@shared/utils/utils.js';
import { renderSearchPage, renderSavedVideoLength } from '../view/search-page.js';
import { VideoModel, model } from '../model/index.js';
const onModalShow = () => {
    var _a;
    renderSavedVideoLength(model.getLocalStorageItem('videos').length);
    (_a = $('.modal')) === null || _a === void 0 ? void 0 : _a.classList.add('open');
};
const onModalClose = () => {
    var _a;
    (_a = $('.modal')) === null || _a === void 0 ? void 0 : _a.classList.remove('open');
};
const clickModalSearchButton = (e) => {
    var _a;
    let modalSearchInput;
    modalSearchInput =
        (e === null || e === void 0 ? void 0 : e.target).tagName === 'BUTTON'
            ? (_a = $('#modal-search-input')) === null || _a === void 0 ? void 0 : _a.value
            : (e === null || e === void 0 ? void 0 : e.target).innerText;
    console.log(modalSearchInput);
    if (modalSearchInput) {
        model.addRecentSearch(modalSearchInput);
        removeChildNodes($('#modal-recent-search-items'));
        // init
        $('#modal-search-input').value = '';
        renderSearchPage({ q: modalSearchInput, maxResults: '10', type: 'video' });
    }
    else {
        alert('검색어를 입력하세요.');
        // modalSearchInput.value = "";
        // modalSearchInput.focus();
    }
};
const clickModalVideosSaveButton = (e) => {
    if ((e === null || e === void 0 ? void 0 : e.target).classList.contains('modal-save-button')) {
        const modalSaveButton = e === null || e === void 0 ? void 0 : e.target;
        if (modalSaveButton) {
            const videoWrapper = modalSaveButton.closest('.clip');
            console.log(videoWrapper);
            let newVideo = new VideoModel();
            model.addSaveVideos(newVideo.setVideoModelFromVideoWrapper(videoWrapper));
            renderSavedVideoLength(model.getLocalStorageItem('videos').length);
        }
    }
};
export const modalController = () => {
    var _a, _b, _c, _d, _e;
    (_a = $('#search-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', onModalShow);
    (_b = $('.modal-close')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', onModalClose);
    (_c = $('#modal-search-button')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', clickModalSearchButton);
    (_d = $('#modal-recent-search-items')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', clickModalSearchButton);
    (_e = $('#modal-videos')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', clickModalVideosSaveButton);
};
