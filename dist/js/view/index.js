import { $ } from '../@shared/utils/utils.js';
import { getModalWrapper } from './search-page.js';
export const renderView = () => {
    var _a;
    (_a = $('#app')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', getModalWrapper());
};
