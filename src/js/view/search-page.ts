import { ENV } from '../@shared/constants/env.js';
import { $, setDataKey, wait } from '../@shared/utils/utils.js';
import { getQueryString } from '../@shared/utils/getQueryString.js';
import { model } from '../model/index.js';
import { DATA_JSON } from './data.js';

const getModalWrapper = (): string => {
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
                  저장된 영상 갯수: 50개
                </div>
              </section>
              <section id="modal-videos" class="video-wrapper">
              </section>
            </div>
          </div>`;
};

const getRecentSearchItemWrapper = (items: string[]): string => {
  return items
    .map((x) => `<a class="chip">${x}</a>`)
    .reverse()
    .join('');
};

const getVideoWrapper = ({
  videoLink,
  videoTitle,
  channelLink,
  channelTitle,
  publishedAt,
  checkView,
}: {
  videoLink: string;
  videoTitle: string;
  channelLink: string;
  channelTitle: string;
  publishedAt: string;
  checkView: boolean;
}): string => {
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
        <button class="btn modal-save-button" ${checkView ? 'disabled': ''}>${checkView ? '✅ 저장 완료' : '⬇️ 저장'}</button>
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
                      <button class="btn modal-save-button">⬇️ 저장</button>
                    </div>
                  </div>
                </div>
              </article>`;

const videoWrapperTMP = `<section class="video-wrapper">
              <article class="clip">
                <div class="preview-container">
                  <iframe
                    width="100%"
                    height="118"
                    src="https://www.youtube.com/embed/Ngj3498Tm_0"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="content-container pt-2 px-1">
                  <h3>아두이노 무드등</h3>
                  <div>
                    <a
                      href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
                      target="_blank"
                      class="channel-name mt-1"
                    >
                      메이커준
                    </a>
                    <div class="meta">
                      <p>2021년 3월 2일</p>
                    </div>
                    <div>
                      <span class="opacity-hover">✅</span>
                      <span class="opacity-hover">👍</span>
                      <span class="opacity-hover">💬</span>
                      <span class="opacity-hover">🗑️</span>
                    </div>
                  </div>
                </div>
              </article>
            </section>`;

const renderSavedVideoLength = (videoLength: number) => {
  $('#modal-saved-video-length')!.innerText = `저장된 영상 갯수: ${videoLength}개`;
};

const getRecentSearchItem = (): string => {
  console.log('getRecentSearchItem()', model.getLocalStorageItem('recent-search'));
  return getRecentSearchItemWrapper(model.getLocalStorageItem('recent-search'));
};

const getSkeletonUIWrapper = (): string => {
  return skeletonUI.repeat(10);
};

const renderSkeletonUI = (modalVideos: HTMLDivElement): void => {
  modalVideos.innerHTML = ''
  modalVideos.insertAdjacentHTML('afterbegin', getSkeletonUIWrapper());
}

const renderSearchPage = async ({ q }: { q: string; }) => {
  const modalVideos: HTMLDivElement | null = $('#modal-videos') as HTMLDivElement;

  if (!modalVideos) {
    return;
  }

  $('#modal-recent-search-items')?.insertAdjacentHTML('afterbegin', getRecentSearchItem());
  renderSkeletonUI(modalVideos);

  let result = '';

  /* temp code */
  // await wait(1000);
  // const data = DATA_JSON;

  /* real code */
  const data = await getQueryString({ q, maxResults: ENV.YOUTUBE_MAX_RESULTS, type: ENV.YOUTUBE_TYPE, nextPageToken: '""' });

  modalVideos.innerHTML = '';
  console.log('data.nextPageToken1', data);
  console.log('data.nextPageToken2', data.nextPageToken);
  console.log('data.nextPageToken3', data['nextPageToken']);
  setDataKey($('#modal-search-input'), 'nextPageToken', data.nextPageToken)
  const saveVideoLinks = model.getLocalStorageItem('videos').map(x => x.videoLink);
  result = data.items
    .map((x: any) => {
      return getVideoWrapper({
        videoLink: ENV.YOUTUBE_WATCH_URL + x.id.videoId,
        videoTitle: x.snippet.title,
        channelLink: ENV.YOUTUBE_CHANNEL_URL + x.snippet.channelId,
        channelTitle: x.snippet.channelTitle,
        publishedAt: x.snippet.publishedAt,
        checkView: saveVideoLinks.includes(ENV.YOUTUBE_WATCH_URL + x.id.videoId),
      });
    })
    .join('');
  $('#modal-videos')?.insertAdjacentHTML('afterbegin', result);
};

export { getModalWrapper, getRecentSearchItem, getVideoWrapper, renderSearchPage, renderSavedVideoLength };
