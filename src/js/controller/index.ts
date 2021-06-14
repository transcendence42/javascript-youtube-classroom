import { watchedPageController } from './watched-page.js';
import { MESSAGE } from '../@shared/constants/message.js';
import { showSnackBar } from '../@shared/utils/utils.js';
import { likedPageController } from './liked-page.js';
import { mainPageController } from './main-page.js';
import { modalController } from './search-page.js';
import { $ } from '../@shared/utils/utils.js';
import { model } from '../model/index.js';

const clickCheckView = (clip: HTMLElement | null): void => {
  const checkViewClassList: DOMTokenList = clip?.querySelector('.checkView')?.classList as DOMTokenList;
  model.toggleCheckView(clip?.querySelector('iframe')?.src);
  if (checkViewClassList.contains('opacity-hover')) {
    checkViewClassList.remove('opacity-hover');
    showSnackBar(MESSAGE.VIEW_TRUE);
  } else {
    checkViewClassList.add('opacity-hover');
    showSnackBar(MESSAGE.VIEW_FALSE);
  }
  if (!$('#liked-page-button')?.classList.contains('bg-cyan-100')) {
    clip?.remove();
  }
};

const clickCheckLike = (clip: HTMLElement | null): void => {
  const checkLikeClassList: DOMTokenList = clip?.querySelector('.checkLike')?.classList as DOMTokenList;
  model.toggleCheckLike(clip?.querySelector('iframe')?.src);
  if (checkLikeClassList.contains('opacity-hover')) {
    checkLikeClassList.remove('opacity-hover');
    showSnackBar(MESSAGE.LIKE_TRUE);
  } else {
    checkLikeClassList.add('opacity-hover');
    showSnackBar(MESSAGE.LIKE_FALSE);
    if ($('#liked-page-button')?.classList.contains('bg-cyan-100')) {
      clip?.remove();
    }
  }
};

const clickCheckDelete = (clip: HTMLElement | null): void => {
  if (!confirm('정말로 지우시겠습니까!!?!')) {
    return;
  }
  model.deleteSaveVideos(clip?.querySelector('iframe')?.src);
  clip?.remove();
  showSnackBar(MESSAGE.VIDEO_DELETE);
};

const clickCheckButtons = (e: Event): void => {
  const eventTarget: HTMLSpanElement | null = <HTMLSpanElement>e.target;
  if (eventTarget.tagName !== 'SPAN' || !eventTarget) {
    return;
  }
  const checkedValue: string = eventTarget.innerText;
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

const clickNavButtons = (e: Event | null): void => {
  $('#main-page-button')?.classList.remove('bg-cyan-100');
  $('#watched-page-button')?.classList.remove('bg-cyan-100');
  $('#liked-page-button')?.classList.remove('bg-cyan-100');
  $('#search-button')?.classList.remove('bg-cyan-100');
  (<HTMLButtonElement>e?.target).classList.add('bg-cyan-100');
};

const clickDarkModeButton = (e: Event | null): void => {
  const checkbox: HTMLInputElement = e?.target as HTMLInputElement;
  if (checkbox.checked) {
    $('body')?.classList.add('dark');
  } else {
    $('body')?.classList.remove('dark');
  }
};

function initController() {
  mainPageController();
  modalController();
  watchedPageController();
  likedPageController();
  $('#nav-buttons')?.addEventListener('click', clickNavButtons);
  $('#dark-mode-toggle')?.addEventListener('click', clickDarkModeButton);
}

export { clickCheckButtons, initController };
