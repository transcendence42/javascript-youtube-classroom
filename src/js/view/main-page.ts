import { $ } from '../@shared/utils/utils.js';
import { VideoModel, model } from '../model/index.js';

const getToWatchVideoClip = (video: VideoModel): string => {
    return `<article class="clip">
    <div class="preview-container">
      <iframe
        width="100%"
        height="118"
        src="${video.videoLink}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
        <div>
          <span class="opacity-hover">✅</span>
          <span class="opacity-hover">👍</span>
          <span class="opacity-hover">💬</span>
          <span class="opacity-hover">🗑️</span>
        </div>
      </div>
    </div>
  </article>`
}

export const renderMainPage = () => {
  const videosToWatch = model.getLocalStorageItem('videos').filter((x) => x.checkView === false);
  const result = videosToWatch.map(x => getToWatchVideoClip(x)).join('');
  const mainVideoSection: HTMLElement | null = $('#main-videos');
  if (mainVideoSection){
      mainVideoSection.innerHTML = '';
  }
  mainVideoSection?.insertAdjacentHTML('beforeend', result);
};
