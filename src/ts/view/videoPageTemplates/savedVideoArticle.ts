import { IVideoInfo } from '../../model/IVideoInfo';

export const savedVideoArticle = (video: IVideoInfo): string => {
  return `
  <article class="clip" data-video-id="${video.videoId}" data-watched="${video.isWatched}">
    <div class="preview-container">
      <iframe loading="lazy"
        width="100%"
        height="118"
        src="https://www.youtube.com/embed/${video.videoId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="content-container pt-2 px-1">
      <h3>${video.videoTitle}</h3>
      <div>
        <a
          href="https://www.youtube.com/channel/${video.channelId}"
          target="_blank"
          class="channel-name mt-1"
        >
          ${video.channelTitle}
        </a>
        <div class="meta">
          <p>${video.publishedAt}</p>
        </div>
        <div>
          <span class="opacity-hover video-watched-button">✅</span>
          <span class="opacity-hover video-like-button">👍</span>
          <span class="opacity-hover video-comment-button">💬</span>
          <span class="opacity-hover video-remove-button">🗑️</span>
        </div>
      </div>
    </div>
  </article>`;
};
