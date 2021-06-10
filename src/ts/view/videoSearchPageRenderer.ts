import { $, $$ } from '../util.js';
import { getSavedVideos } from "../model/handleLocalStorage/articleManager.js";

const modalDiv = (): string => {
  return `
  <div class="modal">
    <div class="modal-inner p-8">
    </div>
  </div>`;
};

const modalCloseButton = (): string => {
  return `
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>`
};

const modalHeader = (): string => {
  return `
  <header>
    <h2 class="text-center">🔎 유튜브 검색</h2>
  </header>`;
};

const modalSearchForm = (): string => {
  return `
  <form class="d-flex" onsubmit="return false;">
    <input type="text" id="search-input" class="w-100 mr-2 pl-2" placeholder="검색" data-is-first-search="true" data-next-token=""/>
    <button type="submit" id="search-submit-button" class="btn bg-cyan-500">검색</button>
  </form>`;
};

const modalRecentKeywordSection = (): string => {
  return `<section class="mt-2" id="recent-keyword">
  <span class="text-gray-700">최근 검색어: </span>
</section>`;
};

const modalArticleSection = (): string => {
  return `
  <section>
    <div class="d-flex justify-end text-gray-700">
      저장된 영상 갯수: <span id="num-of-videos">${getSavedVideos().length}</span>개
    </div>
    <section class="video-wrapper">
    <!-- article begin -->
    </section>
  </section>`;
};

export const videoSearchPageRenderer = () => {
  $('#app')?.insertAdjacentHTML('beforeend', modalDiv());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalCloseButton());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalHeader());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalSearchForm());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalRecentKeywordSection());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalArticleSection());
}