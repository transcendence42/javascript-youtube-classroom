import { VideoModel } from './index';

export const searchPageModel = {
  getLocalStorageItem(str: string): never | Array<any> {
    const rawItem = localStorage.getItem(str);
    if (!rawItem) {
      return [];
    } else {
      return JSON.parse(rawItem);
    }
  },
  addRecentSearch(keyword: string): void {
    let recentSearchItems = this.getLocalStorageItem('recent-search');
    const str = keyword.trim();
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
  addSaveVideos(video: VideoModel): void {
    let videoItems = this.getLocalStorageItem('videos');
    if (videoItems.some((x) => x.videoLink === video.videoLink)) {
      return;
    }
    videoItems.push(video);
    localStorage.setItem('videos', JSON.stringify(videoItems));
  },
};
