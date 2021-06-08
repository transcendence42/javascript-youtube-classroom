import { $, $$ } from '../util.js';
// import {titleSection, articleSection, article, modal} from './mainPage/index.js';
import { modalArticle } from './modalPage/index.js';
import { IVideoInfo } from '../model/IVideoInfo.js';

export const renderSearchedArticle = (videoInfo: IVideoInfo) => {
  const $articleSection: HTMLElement = $("div.modal-inner section.video-wrapper") as HTMLElement;
  $articleSection.insertAdjacentHTML("beforeend", modalArticle(videoInfo));
}

export const renderRecentKeyword = (searchValue: string) => {
  const $recentKeywordSpan: HTMLSpanElement = $("#recent-keyword > span") as HTMLSpanElement;
  $recentKeywordSpan.insertAdjacentHTML("afterend", `<a class="chip">${searchValue}</a>`);
}