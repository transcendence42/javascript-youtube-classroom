import { $$ } from '../util.js';
import { unsaveVideo, changeWatchedState, getSavedVideos } from '../model/handleLocalStorage/articleManager.js';
import { removeArticle, renderEmptyVideoMessage } from '../view/savedVideoPage.js';
import { reRenderSavedButtonText, reRenderNumOfSavedVideos } from '../view/videoSearchPage.js';
const checkEmptyUnwatchedVideo = () => {
    let unwatchedVideoList = getSavedVideos().filter((video) => video.isWatched === false);
    if (unwatchedVideoList.length === 0) {
        return true;
    }
    return false;
};
const addEventToWatchedButton = () => {
    $$('span.video-watched-button').forEach((elem) => {
        elem.addEventListener('click', () => {
            const article = elem.closest('article');
            changeWatchedState(article.dataset.videoId);
            removeArticle(article);
            if (checkEmptyUnwatchedVideo()) {
                renderEmptyVideoMessage();
            }
        });
    });
};
const addEventToRemoveButton = () => {
    $$('span.video-remove-button').forEach((elem) => {
        elem.addEventListener('click', () => {
            const article = elem.closest('article');
            if (confirm('정말 삭제하시겠습니까?')) {
                unsaveVideo(article.dataset.videoId);
                removeArticle(article);
                changeButtonInSearchPage(article);
                reRenderNumOfSavedVideos();
            }
            if (checkEmptyUnwatchedVideo()) {
                renderEmptyVideoMessage();
            }
        });
    });
};
const changeButtonInSearchPage = (article) => {
    $$('#searched-article-wrapper button').forEach((elem) => {
        if (elem.dataset.videoId === article.dataset.videoId) {
            elem.dataset.saved = 'false';
            reRenderSavedButtonText(elem);
        }
    });
};
export const savedVideoPageController = () => {
    addEventToWatchedButton();
    addEventToRemoveButton();
};
