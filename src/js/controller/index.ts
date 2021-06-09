import { modalController } from './search-page.js';
import { mainPageController } from './main-page.js';
import { watchedPageController } from './watched-page.js';
import { model } from '../model/index.js';

const clickCheckView = (clip: HTMLElement | null) => {
  const checkViewClassList: DOMTokenList = clip?.querySelector('.checkView')?.classList as DOMTokenList;
  model.toggleCheckView(clip?.querySelector('iframe')?.src);
  clip?.remove();
};

const clickCheckLike = (clip: HTMLElement | null) => {
  const checkLikeClassList: DOMTokenList = clip?.querySelector('.checkLike')?.classList as DOMTokenList;
  model.toggleCheckLike(clip?.querySelector('iframe')?.src);
  if (checkLikeClassList.contains('opacity-hover')) {
    checkLikeClassList.remove('opacity-hover');
  } else {
    checkLikeClassList.add('opacity-hover');
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

function initController() {
  mainPageController();
  modalController();
  watchedPageController();
}

export { clickCheckButtons, initController };
