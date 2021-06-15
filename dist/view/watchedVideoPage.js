import { $, $$ } from '../util.js';
import { getSavedVideos } from '../model/handleLocalStorage/articleManager.js';
import { savedVideoArticle, savedVideoSection } from './videoPageTemplates/index.js';
export const renderEmptyVideoMessage = () => {
    $('#saved-video-section').insertAdjacentHTML('beforeend', '<p>본 영상이 없습니다.</p>');
};
export const renderArticle = (video) => {
    $('#saved-video-section').insertAdjacentHTML('beforeend', savedVideoArticle(video));
};
export const watchedVideoPageRenderer = () => {
    var _a, _b;
    (_a = $('#video-list')) === null || _a === void 0 ? void 0 : _a.remove();
    (_b = $('header')) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML('afterend', savedVideoSection());
    const savedVideoList = getSavedVideos();
    let watchedVideoList = savedVideoList.filter((video) => video.isWatched === true);
    if (watchedVideoList.length === 0) {
        renderEmptyVideoMessage();
    }
    watchedVideoList.forEach((video) => {
        renderArticle(video);
    });
    $$('span.video-watched-button').forEach((elem) => {
        elem.classList.remove('opacity-hover');
    });
};
export const removeArticle = (article) => {
    article.remove();
};
