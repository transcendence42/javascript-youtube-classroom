import { modalController } from './search-page.js';
import { mainPageController } from './main-page.js';
import { watchedPageController } from './watched-page.js';
import { likedPageController } from './liked-page.js';
import { model } from '../model/index.js';
import { $ } from '../@shared/utils/utils.js';

const clickCheckView = (clip: HTMLElement | null) => {
  const checkViewClassList: DOMTokenList = clip?.querySelector('.checkView')?.classList as DOMTokenList;
  model.toggleCheckView(clip?.querySelector('iframe')?.src);
  if (checkViewClassList.contains('opacity-hover')) {
    checkViewClassList.remove('opacity-hover');
  } else {
    checkViewClassList.add('opacity-hover');
  }
  if (!$('#liked-page-button')?.classList.contains('bg-cyan-100')) {
    clip?.remove();
  }
};

const clickCheckLike = (clip: HTMLElement | null) => {
  const checkLikeClassList: DOMTokenList = clip?.querySelector('.checkLike')?.classList as DOMTokenList;
  model.toggleCheckLike(clip?.querySelector('iframe')?.src);
  if (checkLikeClassList.contains('opacity-hover')) {
    checkLikeClassList.remove('opacity-hover');
  } else {
    checkLikeClassList.add('opacity-hover');
    if ($('#liked-page-button')?.classList.contains('bg-cyan-100')) {
      clip?.remove();
    }
  }
};

const clickCheckDelete = (clip: HTMLElement | null) => {
  if (!confirm('정말로 지우시겠습니까!!?!')) {
    return;
  }
  model.deleteSaveVideos(clip?.querySelector('iframe')?.src);
  clip?.remove();
};

const clickCheckButtons = (e: Event) => {
  const eventTarget: HTMLSpanElement | null = <HTMLSpanElement>e.target;
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

const clickNavButtons = (e: Event | null): void => {
  $('#main-page-button')?.classList.remove('bg-cyan-100');
  $('#watched-page-button')?.classList.remove('bg-cyan-100');
  $('#liked-page-button')?.classList.remove('bg-cyan-100');
  $('#search-button')?.classList.remove('bg-cyan-100');
  (<HTMLButtonElement>e?.target).classList.add('bg-cyan-100');
};

function initController() {
  mainPageController();
  modalController();
  watchedPageController();
  likedPageController();
  $('#nav-buttons')?.addEventListener('click', clickNavButtons);
}

export { clickCheckButtons, initController };
