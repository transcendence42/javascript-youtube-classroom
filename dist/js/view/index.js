import { $ } from '../@shared/utils/utils.js';
import { getModalWrapper } from './search-page.js';
import { renderMainPage } from './main-page.js';
export const renderView = () => {
    var _a;
    renderMainPage();
    (_a = $('#app')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', getModalWrapper());
};
