import { $ } from '../@shared/utils/utils.js';
import { model } from '../model/index.js';
import { ENV } from '../@shared/constants/env.js';
import { getModalWrapper } from './search-page.js';
import { renderMainPage } from './main-page.js';
export function getVideoHTML(data, wrapper) {
    if (!data.length) {
        return `<img src="${ENV.PAGE_NOT_FOUND_IMG}"/>`;
    }
    else {
        return data
            .map((x) => {
            return wrapper(x);
        })
            .join('');
    }
}
;
export function getVideoHTMLWithRawData(data, wrapper) {
    if (!data.items.length) {
        return `<img src="${ENV.PAGE_NOT_FOUND_IMG}"/>`;
    }
    else {
        const saveVideoLinks = model.getLocalStorageItem('videos').map((x) => x.videoLink);
        return data.items
            .map((x) => {
            return wrapper({
                videoLink: ENV.YOUTUBE_WATCH_URL + x.id.videoId,
                videoTitle: x.snippet.title,
                channelLink: x.channelLink,
                channelTitle: x.snippet.channelTitle,
                publishedAt: x.snippet.publishedAt,
                checkView: saveVideoLinks.includes(ENV.YOUTUBE_WATCH_URL + x.id.videoId),
            });
        })
            .join('');
    }
}
;
export const renderView = () => {
    var _a;
    renderMainPage();
    (_a = $('#app')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', getModalWrapper());
};
