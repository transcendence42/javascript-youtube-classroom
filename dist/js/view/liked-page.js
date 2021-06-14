import { $ } from '../@shared/utils/utils.js';
import { getToWatchVideoWrapper } from './main-page.js';
import { model } from '../model/index.js';
import { getVideoHTML } from './index.js';
export const renderLikedPage = () => {
    const videosWatched = model.getLocalStorageItem('videos').filter((x) => x.checkLike === true);
    const mainVideoSection = $('#main-videos');
    if (mainVideoSection) {
        mainVideoSection.innerHTML = getVideoHTML(videosWatched, getToWatchVideoWrapper);
    }
};
