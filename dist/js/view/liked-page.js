import { $, removeInnerHTML } from '../@shared/utils/utils.js';
import { model } from '../model/index.js';
import { getVideoHTML } from './index.js';
import { getToWatchVideoWrapper } from './main-page.js';
export const renderLikedPage = () => {
    const videosWatched = model.getLocalStorageItem('videos').filter((x) => x.checkLike === true);
    const mainVideoSection = $('#main-videos');
    removeInnerHTML(mainVideoSection);
    mainVideoSection === null || mainVideoSection === void 0 ? void 0 : mainVideoSection.insertAdjacentHTML('beforeend', getVideoHTML(videosWatched, getToWatchVideoWrapper));
};
