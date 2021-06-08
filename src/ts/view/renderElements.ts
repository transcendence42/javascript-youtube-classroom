import { $, $$ } from '../util.js';
// import {titleSection, articleSection, article, modal} from './mainPage/index.js';
import { modalArticle } from './modalPage/index.js';
import { IVideoInfo } from '../model/IVideoInfo.js';
import { removeModalArticles, removeNotFoundImage } from './removeElements.js';
import { skeleton } from './modalPage/skeleton.js';

export const renderSearchedArticle = (videoInfo: IVideoInfo) => {
  removeNotFoundImage();
  const $articleSection: HTMLElement = $("div.modal-inner section.video-wrapper") as HTMLElement;
  $articleSection.insertAdjacentHTML("beforeend", modalArticle(videoInfo));
}

export const renderRecentKeyword = (searchValue: string) => {
  const $recentKeywordSpan: HTMLSpanElement = $("#recent-keyword > span") as HTMLSpanElement;
  $recentKeywordSpan.insertAdjacentHTML("afterend", `<a class="chip">${searchValue}</a>`);
}

export const renderNotFoundImage = () => {
  $("div.modal-inner section.video-wrapper")?.insertAdjacentHTML("beforebegin", "<img src='./src/images/status/not_found.png' />");
  removeModalArticles();
}

export const renderSkeleton = () => {
  $("div.modal-inner section.video-wrapper")?.insertAdjacentHTML("beforeend", skeleton().repeat(10));
}