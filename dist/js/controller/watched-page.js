import { $ } from '../@shared/utils/utils.js';
import { renderWatchedPage } from '../view/watched-page.js';
const clickWatchedPageButton = () => {
    renderWatchedPage();
};
const watchedPageController = () => {
    var _a;
    (_a = $('#watched-page-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', clickWatchedPageButton);
};
export { watchedPageController };
