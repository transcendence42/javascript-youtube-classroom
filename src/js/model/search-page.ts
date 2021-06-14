import { MESSAGE } from '../@shared/message.js';
import { showSnackBar } from '../@shared/utils.js';
import { VideoModel } from './index';

export const searchPageModel = {
  getLocalStorageItem(str: string): VideoModel[] | string[] {
    const rawItem: string | null = localStorage.getItem(str);
    if (!rawItem) {
      return [];
    } else {
      return JSON.parse(rawItem);
    }
  },
  addRecentSearch(keyword: string): void {
    let recentSearchItems: string[] = this.getLocalStorageItem('recent-search') as string[];
    const str: string = keyword.trim();
    if (recentSearchItems.includes(str)) {
      if (str === recentSearchItems[recentSearchItems.length - 1]) {
        return;
      }
      recentSearchItems.splice(recentSearchItems.indexOf(str), 1);
    }
    if (recentSearchItems.length > 2) {
      recentSearchItems.shift();
    }
    recentSearchItems.push(str);
    localStorage.setItem('recent-search', JSON.stringify(recentSearchItems));
  },
  addSaveVideos(video: VideoModel): boolean {
    let videoItems: VideoModel[] = this.getLocalStorageItem('videos') as VideoModel[];
    if (videoItems.length >= 100) {
      showSnackBar(MESSAGE.MAX_VIDEO_ERROR);
      return false;
    }
    if (videoItems.some((x) => x.videoLink === video.videoLink)) {
      return false;
    }
    videoItems.push(video);
    localStorage.setItem('videos', JSON.stringify(videoItems));
    return true;
  },
};
