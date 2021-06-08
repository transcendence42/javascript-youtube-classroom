import { VideoModel } from '../index';

export const searchPageModel = {
  getLocalStorageItem(str: string): never | Array<any> {
    const rawItem = localStorage.getItem(str);
    if (!rawItem) {
      return [];
    } else {
      return JSON.parse(rawItem);
    }
  },
  addRecentSearch(str: string) {
    let recentSearchItems = this.getLocalStorageItem('recent-search');
    if (recentSearchItems.length > 2) {
      recentSearchItems.shift();
    }
    recentSearchItems.push(str);
    localStorage.setItem('recent-search', JSON.stringify(recentSearchItems));
  },
  addSaveVideos(video: VideoModel) {
    let videoItems = this.getLocalStorageItem('videos');
    videoItems.push(video);
    localStorage.setItem('videos', JSON.stringify(videoItems));
  },
};
