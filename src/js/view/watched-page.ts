import { $, removeInnerHTML } from '../@shared/utils/utils.js';
import { model } from '../model/index.js';
import { getToWatchVideoClip } from './main-page.js'

export const renderWatchedPage = () => {
    const videosWatched = model.getLocalStorageItem('videos').filter((x) => x.checkView === true);
    const result = videosWatched.map((x) => getToWatchVideoClip(x)).join('');
    const mainVideoSection: HTMLElement | null = $('#main-videos');
    removeInnerHTML(mainVideoSection);
    mainVideoSection?.insertAdjacentHTML('beforeend', result);
}