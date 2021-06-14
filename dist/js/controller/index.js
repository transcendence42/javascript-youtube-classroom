import { modalController } from './search-page.js';
import { mainPageController } from './main-page.js';
import { watchedPageController } from './watched-page.js';
import { likedPageController } from './liked-page.js';
import { model } from '../model/index.js';
import { $ } from '../@shared/utils/utils.js';
import { showSnackBar } from '../@shared/utils/utils.js';
import { MESSAGE } from '../@shared/constants/message.js';
const clickCheckView = (clip) => {
    var _a, _b, _c;
    const checkViewClassList = (_a = clip === null || clip === void 0 ? void 0 : clip.querySelector('.checkView')) === null || _a === void 0 ? void 0 : _a.classList;
    model.toggleCheckView((_b = clip === null || clip === void 0 ? void 0 : clip.querySelector('iframe')) === null || _b === void 0 ? void 0 : _b.src);
    if (checkViewClassList.contains('opacity-hover')) {
        checkViewClassList.remove('opacity-hover');
        showSnackBar(MESSAGE.VIEW_TRUE);
    }
    else {
        checkViewClassList.add('opacity-hover');
        showSnackBar(MESSAGE.VIEW_FALSE);
    }
    if (!((_c = $('#liked-page-button')) === null || _c === void 0 ? void 0 : _c.classList.contains('bg-cyan-100'))) {
        clip === null || clip === void 0 ? void 0 : clip.remove();
    }
};
const clickCheckLike = (clip) => {
    var _a, _b, _c;
    const checkLikeClassList = (_a = clip === null || clip === void 0 ? void 0 : clip.querySelector('.checkLike')) === null || _a === void 0 ? void 0 : _a.classList;
    model.toggleCheckLike((_b = clip === null || clip === void 0 ? void 0 : clip.querySelector('iframe')) === null || _b === void 0 ? void 0 : _b.src);
    if (checkLikeClassList.contains('opacity-hover')) {
        checkLikeClassList.remove('opacity-hover');
        showSnackBar(MESSAGE.LIKE_TRUE);
    }
    else {
        checkLikeClassList.add('opacity-hover');
        showSnackBar(MESSAGE.LIKE_FALSE);
        if ((_c = $('#liked-page-button')) === null || _c === void 0 ? void 0 : _c.classList.contains('bg-cyan-100')) {
            clip === null || clip === void 0 ? void 0 : clip.remove();
        }
    }
};
const clickCheckDelete = (clip) => {
    var _a;
    if (!confirm('정말로 지우시겠습니까!!?!')) {
        return;
    }
    model.deleteSaveVideos((_a = clip === null || clip === void 0 ? void 0 : clip.querySelector('iframe')) === null || _a === void 0 ? void 0 : _a.src);
    clip === null || clip === void 0 ? void 0 : clip.remove();
    showSnackBar(MESSAGE.VIDEO_DELETE);
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
    var _a, _b, _c, _d;
    (_a = $('#main-page-button')) === null || _a === void 0 ? void 0 : _a.classList.remove('bg-cyan-100');
    (_b = $('#watched-page-button')) === null || _b === void 0 ? void 0 : _b.classList.remove('bg-cyan-100');
    (_c = $('#liked-page-button')) === null || _c === void 0 ? void 0 : _c.classList.remove('bg-cyan-100');
    (_d = $('#search-button')) === null || _d === void 0 ? void 0 : _d.classList.remove('bg-cyan-100');
    (e === null || e === void 0 ? void 0 : e.target).classList.add('bg-cyan-100');
};
const clickDarkModeButton = (e) => {
    var _a, _b;
    const checkbox = e === null || e === void 0 ? void 0 : e.target;
    if (checkbox.checked) {
        (_a = $('body')) === null || _a === void 0 ? void 0 : _a.classList.add('dark');
    }
    else {
        (_b = $('body')) === null || _b === void 0 ? void 0 : _b.classList.remove('dark');
    }
};
function initController() {
    var _a, _b;
    mainPageController();
    modalController();
    watchedPageController();
    likedPageController();
    (_a = $('#nav-buttons')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', clickNavButtons);
    (_b = $('#dark-mode-toggle')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', clickDarkModeButton);
}
export { clickCheckButtons, initController };
