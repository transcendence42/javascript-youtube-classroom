import { $ } from '../util.js';
import { getSavedVideos } from '../model/handleLocalStorage/articleManager.js';
import { savedVideoArticle, savedVideoSection } from './videoPageTemplates/index.js';
export const renderEmptyVideoMessage = () => {
    $('#saved-video-section').insertAdjacentHTML('beforeend', '<p>볼 영상이 없습니다.</p>');
};
export const renderArticle = (video) => {
    $('#saved-video-section').insertAdjacentHTML('beforeend', savedVideoArticle(video));
};
export const savedVideoPageRenderer = () => {
    var _a, _b;
    (_a = $('#video-list')) === null || _a === void 0 ? void 0 : _a.remove();
    (_b = $('header')) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML('afterend', savedVideoSection());
    const savedVideoList = getSavedVideos();
    let unwatchedVideoList = savedVideoList.filter((video) => video.isWatched === false);
    if (unwatchedVideoList.length === 0) {
        renderEmptyVideoMessage();
    }
    unwatchedVideoList.forEach((video) => {
        renderArticle(video);
    });
};
export const removeArticle = (article) => {
    article.remove();
};
