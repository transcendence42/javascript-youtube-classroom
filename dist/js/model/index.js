import { searchPageModel } from './search-page.js';
import { mainPageModel } from './main-page.js';
class VideoModel {
    constructor() {
        this.videoLink = '';
        this.videoTitle = '';
        this.channelLink = '';
        this.channelTitle = '';
        this.publishedAt = '';
        this.checkLike = false;
        this.checkView = false;
    }
    // get _videoLink(): string {
    //   return this.videoLink;
    // }
    setVideoModel({ videoLink, videoTitle, channelLink, channelTitle, publishedAt, checkLike, checkView, }) {
        this.videoLink = videoLink;
        this.videoTitle = videoTitle;
        this.channelLink = channelLink;
        this.channelTitle = channelTitle;
        this.publishedAt = publishedAt;
        this.checkLike = checkLike;
        this.checkView = checkView;
    }
    setVideoModelFromVideoWrapper(videoWrapper) {
        var _a, _b, _c, _d, _e;
        this.videoLink = (_a = videoWrapper === null || videoWrapper === void 0 ? void 0 : videoWrapper.querySelector('iframe')) === null || _a === void 0 ? void 0 : _a.src;
        this.videoTitle = (_b = videoWrapper === null || videoWrapper === void 0 ? void 0 : videoWrapper.querySelector('h3')) === null || _b === void 0 ? void 0 : _b.innerText;
        this.channelLink = (_c = videoWrapper === null || videoWrapper === void 0 ? void 0 : videoWrapper.querySelector('.content-container a')) === null || _c === void 0 ? void 0 : _c.href;
        this.channelTitle = (_d = videoWrapper === null || videoWrapper === void 0 ? void 0 : videoWrapper.querySelector('.content-container a')) === null || _d === void 0 ? void 0 : _d.innerText;
        (this.publishedAt = (_e = videoWrapper === null || videoWrapper === void 0 ? void 0 : videoWrapper.querySelector('.meta p')) === null || _e === void 0 ? void 0 : _e.innerHTML),
            (this.checkLike = false),
            (this.checkView = false);
        return this;
    }
    getVideoModel() {
        return {
            videoLink: this.videoLink,
            videoTitle: this.videoTitle,
            channelLink: this.channelLink,
            channelTitle: this.channelTitle,
            publishedAt: this.publishedAt,
            checkLike: this.checkLike,
            checkView: this.checkView,
        };
    }
}
const model = Object.assign(Object.assign({}, searchPageModel), mainPageModel);
export { VideoModel, model };
