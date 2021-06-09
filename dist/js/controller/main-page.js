import { $ } from '../@shared/utils/utils.js';
import { clickCheckButtons } from './index.js';
import { renderMainPage } from '../view/main-page.js';
const clickMainPageButton = () => {
    renderMainPage();
};
export const mainPageController = () => {
    var _a, _b;
    (_a = $('#main-videos')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', clickCheckButtons);
    (_b = $('#main-page-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', clickMainPageButton);
};
