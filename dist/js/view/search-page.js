var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ENV } from '../@shared/constants/env.js';
import { $ } from '../@shared/utils/utils.js';
import { getQueryString } from '../@shared/utils/getQueryString.js';
import { model } from '../model/index.js';
import { getVideoHTMLWithRawData } from './index.js';
const getModalWrapper = () => {
    return `<div class="modal">
            <div class="modal-inner p-8">
              <button class="modal-close">
                <svg viewbox="0 0 40 40">
                  <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg>
              </button>
              <header>
                <h2 class="text-center">🔎 유튜브 검색</h2>
              </header>
              <form id="modal-search-form" class="d-flex">
                <input type="text" id="modal-search-input" class="w-100 mr-2 pl-2" placeholder="검색" />
                <button type="button" id="modal-search-button" class="btn bg-cyan-500">검색</button>
              </form>
              <section class="mt-2">
                <span class="text-gray-700">최근 검색어: </span>
                <div id="modal-recent-search-items">
                </div>
              </section>
              <section>
                <div id="modal-saved-video-length" class="d-flex justify-end text-gray-700">
                  저장된 영상 갯수: 50개/100개
                </div>
              </section>
              <section id="modal-videos" class="video-wrapper">
              </section>
            </div>
          </div>`;
};
const getRecentSearchItemWrapper = (items) => {
    return items
        .map((x) => `<a class="chip">${x}</a>`)
        .reverse()
        .join('');
};
const getSearchVideoWrapper = ({ videoLink, videoTitle, channelLink, channelTitle, publishedAt, checkView, }) => {
    return `<article class="clip">
  <div class="preview-container">
    <iframe
      width="100%"
      height="118"
      src="${videoLink}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      loading="lazy"
      allowfullscreen
    ></iframe>
  </div>
  <div class="content-container pt-2 px-1">
    <h3>${videoTitle}</h3>
    <div>
      <a
        href="${channelLink}"
        target="_blank"
        class="channel-name mt-1"
      >
        ${channelTitle}
      </a>
      <div class="meta">
        <p>${publishedAt}</p>
      </div>
      <div class="d-flex justify-end">
        <button class="btn modal-save-button" ${checkView ? 'disabled' : ''}>${checkView ? '✅ 저장 완료' : '⬇️ 저장'}</button>
      </div>
    </div>
  </div>
</article>`;
};
const skeletonUI = `<article class="clip skeleton">
                <div class="preview-container image">
                  <iframe
                    width="100%"
                    height="118"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="content-container pt-2 px-1 line">
                  <h3></h3>
                  <div>
                    <a
                      href=""
                      target="_blank"
                      class="channel-name mt-1"
                    >
                    </a>
                    <div class="meta">
                      <p></p>
                    </div>
                    <div class="d-flex justify-end">
                      <button class="btn modal-save-button opacity-hover">⬇️ 저장</button>
                    </div>
                  </div>
                </div>
              </article>`;
const renderSavedVideoLength = (videoLength) => {
    $('#modal-saved-video-length').innerText = `저장된 영상 갯수: ${videoLength}개/100개`;
};
const getRecentSearchItem = () => {
    return getRecentSearchItemWrapper(model.getLocalStorageItem('recent-search'));
};
const renderSkeletonUI = (modalVideos) => {
    modalVideos.innerHTML = '';
    modalVideos.insertAdjacentHTML('afterbegin', skeletonUI.repeat(10));
};
const renderSearchPage = ({ q }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const modalVideos = $('#modal-videos');
    if (!modalVideos) {
        return;
    }
    (_a = $('#modal-recent-search-items')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('afterbegin', getRecentSearchItem());
    renderSkeletonUI(modalVideos);
    const data = yield getQueryString({
        q,
        maxResults: ENV.YOUTUBE_MAX_RESULTS,
        type: ENV.YOUTUBE_TYPE,
        nextPageToken: '',
    });
    $('#modal-search-input').dataset.token = data.nextPageToken;
    modalVideos.innerHTML = getVideoHTMLWithRawData(data, getSearchVideoWrapper);
});
export { getModalWrapper, getRecentSearchItem, getSearchVideoWrapper, renderSearchPage, renderSavedVideoLength };
