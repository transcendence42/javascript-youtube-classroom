import { $, removeInnerHTML } from '../@shared/utils.js';
import { VideoModel, model } from '../model/index.js';
import { getVideoHTML } from './index.js';

const getToWatchVideoWrapper = (video: VideoModel): string => {
  return `<article class="clip">
    <div class="preview-container">
      <iframe
        width="100%"
        height="118"
        src="${video.videoLink}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        allowfullscreen
      ></iframe>
    </div>
    <div class="content-container pt-2 px-1">
      <h3>${video.videoTitle}</h3>
      <div>
        <a
          href="${video.channelLink}"
          target="_blank"
          class="channel-name mt-1"
        >
          ${video.channelTitle}
        </a>
        <div class="meta">
          <p>${video.publishedAt}</p>
        </div>
        <div class="check-buttons">
          <span class="checkView ${video.checkView ? '' : 'opacity-hover'}">✅</span>
          <span class="checkLike ${video.checkLike ? '' : 'opacity-hover'}">👍</span>
          <span class="checkDelete opacity-hover">🗑️</span>
        </div>
      </div>
    </div>
  </article>`;
};

const renderMainPage = (): void => {
  const videosToWatch: VideoModel[] = (<VideoModel[]>model.getLocalStorageItem('videos')).filter((x: VideoModel) => x.checkView === false);
  const mainVideoSection: HTMLElement | null = $('#main-videos') as HTMLElement;
  mainVideoSection.innerHTML = getVideoHTML(videosToWatch, getToWatchVideoWrapper);
};

export { getToWatchVideoWrapper, renderMainPage };
