import { YoutubeItem, YoutubeResponse } from '../model/get-query-string.js';
import { model, VideoModel } from '../model/index.js';
import { getModalWrapper } from './search-page.js';
import { renderMainPage } from './main-page.js';
import { ENV } from '../@shared/env.js';
import { $ } from '../@shared/utils.js';

export function getVideoHTML(data: VideoModel[], wrapper: Function): string {
  if (!data.length) {
    return `<img src="${ENV.PAGE_NOT_FOUND_IMG}"/>`;
  } else {
    return data
      .map((x: any) => {
        return wrapper(x);
      })
      .join('');
  }
}

export function getVideoHTMLWithRawData(data: YoutubeResponse, wrapper: Function): string {
  if (!data.items.length) {
    return `<img src="${ENV.PAGE_NOT_FOUND_IMG}"/>`;
  } else {
    const saveVideoLinks: string[] = (<VideoModel[]>model.getLocalStorageItem('videos')).map(
      (x: VideoModel) => x.videoLink,
    );
    return data.items
      .map((x: YoutubeItem) => {
        return wrapper({
          videoLink: ENV.YOUTUBE_WATCH_URL + x.id.videoId,
          videoTitle: x.snippet.title,
          channelLink: ENV.YOUTUBE_CHANNEL_URL + x.snippet.channelId,
          channelTitle: x.snippet.channelTitle,
          publishedAt: x.snippet.publishedAt,
          checkView: saveVideoLinks.includes(ENV.YOUTUBE_WATCH_URL + x.id.videoId),
        });
      })
      .join('');
  }
}

export const renderView = (): void => {
  renderMainPage();
  $('#app')?.insertAdjacentHTML('beforeend', getModalWrapper());
};
