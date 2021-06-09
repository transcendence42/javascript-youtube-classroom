import { modalController } from './search-page.js';
import { mainPageController } from './main-page.js';
import { watchedPageController } from './watched-page.js';
import { model } from '../model/index.js';
import { $ } from '../@shared/utils/utils.js';
const clickCheckView = (clip) => {
    var _a, _b;
    const checkViewClassList = (_a = clip === null || clip === void 0 ? void 0 : clip.querySelector('.checkView')) === null || _a === void 0 ? void 0 : _a.classList;
    model.toggleCheckView((_b = clip === null || clip === void 0 ? void 0 : clip.querySelector('iframe')) === null || _b === void 0 ? void 0 : _b.src);
    clip === null || clip === void 0 ? void 0 : clip.remove();
};
const clickCheckLike = (clip) => {
    var _a, _b;
    const checkLikeClassList = (_a = clip === null || clip === void 0 ? void 0 : clip.querySelector('.checkLike')) === null || _a === void 0 ? void 0 : _a.classList;
    model.toggleCheckLike((_b = clip === null || clip === void 0 ? void 0 : clip.querySelector('iframe')) === null || _b === void 0 ? void 0 : _b.src);
    if (checkLikeClassList.contains('opacity-hover')) {
        checkLikeClassList.remove('opacity-hover');
    }
    else {
        checkLikeClassList.add('opacity-hover');
    }
};
const clickCheckDelete = (clip) => {
    var _a;
    if (!confirm('정말로 지우시겠습니까!!?!')) {
        return;
    }
    model.deleteSaveVideos((_a = clip === null || clip === void 0 ? void 0 : clip.querySelector('iframe')) === null || _a === void 0 ? void 0 : _a.src);
    clip === null || clip === void 0 ? void 0 : clip.remove();
};
const clickCheckButtons = (e) => {
    const eventTarget = e.target;
    if (eventTarget.tagName !== 'SPAN' || !eventTarget) {
        return;
    }
    const checkedValue = eventTarget.innerText;
    switch (checkedValue) {
        case '✅':
            clickCheckView(eventTarget.closest('.clip'));
            break;
        case '👍':
            clickCheckLike(eventTarget.closest('.clip'));
            break;
        case '🗑️':
            clickCheckDelete(eventTarget.closest('.clip'));
            break;
        default:
            break;
    }
};
const clickNavButtons = (e) => {
    var _a, _b, _c;
    (_a = $('#main-page-button')) === null || _a === void 0 ? void 0 : _a.classList.remove('bg-cyan-100');
    (_b = $('#watched-page-button')) === null || _b === void 0 ? void 0 : _b.classList.remove('bg-cyan-100');
    (_c = $('#search-button')) === null || _c === void 0 ? void 0 : _c.classList.remove('bg-cyan-100');
    (e === null || e === void 0 ? void 0 : e.target).classList.add('bg-cyan-100');
};
function initController() {
    var _a;
    mainPageController();
    modalController();
    watchedPageController();
    (_a = $('#nav-buttons')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', clickNavButtons);
}
export { clickCheckButtons, initController };
