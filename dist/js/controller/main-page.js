import { $ } from '../@shared/utils/utils.js';
import { clickCheckButtons } from './index.js';
export const mainPageController = () => {
    var _a;
    (_a = $('#main-videos')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', clickCheckButtons);
};
