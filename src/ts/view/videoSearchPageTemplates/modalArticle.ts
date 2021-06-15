import { IVideoInfo } from '../../model/IVideoInfo.js';

export const modalArticle = (obj: IVideoInfo): string => {
  const buttonText: string = obj.isSaved ? '❌ 저장 취소' : '⬇️ 저장';
  return `
  <article class="clip">
    <div class="preview-container">
      <iframe loading="lazy" width="100%" height="118" src="https://www.youtube.com/embed/${obj.videoId}" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    <div class="content-container pt-2 px-1">
      <h3>${obj.videoTitle}</h3>
      <div>
        <a href="https://www.youtube.com/channel/${obj.channelId}" target="_blank"
          class="channel-name mt-1">
          ${obj.channelTitle}
        </a>
        <div class="meta">
          <p>${obj.publishedAt}</p>
        </div>
        <div class="d-flex justify-end">
          <button class="btn" data-video-id="${obj.videoId}" data-saved="${obj.isSaved}">${buttonText}</button>
        </div>
      </div>
    </div>
  </article>`;
};
