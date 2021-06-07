import { $ } from '../../@shared/utils/utils.js';
import { searchPageModel } from '../../model/search-page/index.js';
const onModalShow = () => {
    var _a;
    (_a = $('.modal')) === null || _a === void 0 ? void 0 : _a.classList.add('open');
};
const onModalClose = () => {
    var _a;
    (_a = $('.modal')) === null || _a === void 0 ? void 0 : _a.classList.remove('open');
};
export const initModalController = () => {
    var _a, _b;
    (_a = $('#search-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', onModalShow);
    (_b = $('.modal-close')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', onModalClose);
    searchPageModel.addRecentSearch('hi');
};
