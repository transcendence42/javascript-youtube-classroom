import { renderLikedPage } from '../view/liked-page.js';
import { clickCheckButtons } from './index.js';
import { $ } from '../@shared/utils/utils.js';
const clickLikedPageButton = () => {
    renderLikedPage();
};
export const likedPageController = () => {
    var _a, _b;
    (_a = $('#liked-page-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', clickLikedPageButton);
    (_b = $('#main-videos')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', clickCheckButtons);
};
