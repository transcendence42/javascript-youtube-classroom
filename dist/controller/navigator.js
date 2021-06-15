import { $ } from '../util.js';
import { videoSearchPageRenderer } from '../view/videoSearchPage.js';
import { videoSearchPageController } from './videoSearchPage.js';
import { savedVideoPageRenderer } from '../view/savedVideoPage.js';
import { savedVideoPageController } from './savedVideoPage.js';
import { watchedVideoPageRenderer } from '../view/watchedVideoPage.js';
import { watchedVideoPageController } from './watchedVideoPage.js';
const onModalShow = ($modal) => {
    var _a;
    $modal.classList.add('open');
    (_a = $('#search-input')) === null || _a === void 0 ? void 0 : _a.focus();
};
const addClickEventToSavedVideoButton = () => {
    $('#watched-video-button').classList.remove('bg-cyan-100');
    $('#saved-video-button').classList.add('bg-cyan-100');
    savedVideoPageRenderer();
    savedVideoPageController();
};
const addClickEventToWatchedVideoButton = () => {
    $('#saved-video-button').classList.remove('bg-cyan-100');
    $('#watched-video-button').classList.add('bg-cyan-100');
    watchedVideoPageRenderer();
    watchedVideoPageController();
};
export const navigatorController = () => {
    videoSearchPageRenderer();
    videoSearchPageController();
    const $modal = $('.modal');
    $('#search-button').addEventListener('click', () => onModalShow($modal));
    $('#saved-video-button').addEventListener('click', () => addClickEventToSavedVideoButton());
    $('#watched-video-button').addEventListener('click', () => addClickEventToWatchedVideoButton());
    $('#saved-video-button').click();
};
