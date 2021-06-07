import { ENV } from '../../@shared/constants/env.js';
import { $ } from '../../@shared/utils/utils.js';
import { getQueryString } from '../../@shared/utils/getQueryString.js';

const getModalWrapper = ({ videos }: { videos: string }): string => {
  return `      <div class="modal">
    <div class="modal-inner p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <header>
        <h2 class="text-center">🔎 유튜브 검색</h2>
      </header>
      <form class="d-flex">
        <input type="text" class="w-100 mr-2 pl-2" placeholder="검색" />
        <button type="button" class="btn bg-cyan-500">검색</button>
      </form>
      <section class="mt-2">
        <span class="text-gray-700">최근 검색어: </span>
        <a class="chip">메이커준</a>
        <a class="chip">우아한테크코스</a>
        <a class="chip">우아한형제들</a>
      </section>
      <section>
        <div class="d-flex justify-end text-gray-700">
          저장된 영상 갯수: 50개
        </div>
      </section>
      ${videos}
    </div>
  </div>`;
};

const getVideoWrapper = ({
  videoLink,
  videoTitle,
  channelLink,
  channelTitle,
  publishedAt,
}: {
  videoLink: string;
  videoTitle: string;
  channelLink: string;
  channelTitle: string;
  publishedAt: string;
}): string => {
  return `<section class="video-wrapper">
<article class="clip">
  <div class="preview-container">
    <iframe
      width="100%"
      height="118"
      src="${videoLink}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
        <button class="btn">⬇️ 저장</button>
      </div>
    </div>
  </div>
</article>
</section>`;
};

const skeletonUI = `<section class="video-wrapper">
              <article class="clip skeleton">
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


// const videoWrapperTMP = `<section class="video-wrapper">
//               <article class="clip">
//                 <div class="preview-container">
//                   <iframe
//                     width="100%"
//                     height="118"
//                     src="https://www.youtube.com/embed/Ngj3498Tm_0"
//                     frameborder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowfullscreen
//                   ></iframe>
//                 </div>
//                 <div class="content-container pt-2 px-1">
//                   <h3>아두이노 무드등</h3>
//                   <div>
//                     <a
//                       href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
//                       target="_blank"
//                       class="channel-name mt-1"
//                     >
//                       메이커준
//                     </a>
//                     <div class="meta">
//                       <p>2021년 3월 2일</p>
//                     </div>
//                     <div>
//                       <span class="opacity-hover">✅</span>
//                       <span class="opacity-hover">👍</span>
//                       <span class="opacity-hover">💬</span>
//                       <span class="opacity-hover">🗑️</span>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             </section>`;

export const renderSearchPage = async () => {
  // const data = await getQueryString({ q: 'bts', maxResults: '10', type: 'video' });
  let result = '';

  // result = data.map((x: any) =>
  //   getVideoWrapper({
  //     videoLink: ENV.YOUTUBE_WATCH_URL + x.id.videoId,
  //     videoTitle: x.snippet.title,
  //     channelLink: ENV.YOUTUBE_CHANNEL_URL + x.snippet.channelId,
  //     channelTitle: x.snippet.channelTitle,
  //     publishedAt: x.snippet.publishedAt,
  //   })
  // ).join('');
  result = skeletonUI.repeat(10);
  $('#app')?.insertAdjacentHTML('beforeend', getModalWrapper({ videos: result }));
};
