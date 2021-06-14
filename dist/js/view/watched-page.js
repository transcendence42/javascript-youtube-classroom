import { $, removeInnerHTML } from '../@shared/utils/utils.js';
import { model } from '../model/index.js';
import { getVideoHTML } from './index.js';
import { getToWatchVideoWrapper } from './main-page.js';
export const renderWatchedPage = () => {
    const videosWatched = model.getLocalStorageItem('videos').filter((x) => x.checkView === true);
    const result = videosWatched.map((x) => getToWatchVideoWrapper(x)).join('');
    const mainVideoSection = $('#main-videos');
    removeInnerHTML(mainVideoSection);
    mainVideoSection === null || mainVideoSection === void 0 ? void 0 : mainVideoSection.insertAdjacentHTML('beforeend', getVideoHTML(videosWatched, getToWatchVideoWrapper));
};
