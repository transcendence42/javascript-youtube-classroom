import { renderWatchedPage } from '../view/watched-page.js';
import { clickCheckButtons } from './index.js';
import { $ } from '../@shared/utils.js';
const clickWatchedPageButton = () => {
    renderWatchedPage();
};
const watchedPageController = () => {
    var _a, _b;
    (_a = $('#watched-page-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', clickWatchedPageButton);
    (_b = $('#main-videos')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', clickCheckButtons);
};
export { watchedPageController };
