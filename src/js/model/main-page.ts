import { VideoModel } from './index';

export const mainPageModel = {
  getLocalStorageItem(str: string): never | Array<any> {
    const rawItem = localStorage.getItem(str);
    if (!rawItem) {
      return [];
    } else {
      return JSON.parse(rawItem);
    }
  },
  deleteSaveVideos(videoLink: string | undefined): void {
    if (!videoLink) {
      return;
    }
    let videoItems = this.getLocalStorageItem('videos');
    localStorage.setItem('videos', JSON.stringify(videoItems.filter((x) => x.videoLink !== videoLink)));
  },
  toggleCheckLike(videoLink: string | undefined): void {
    if (!videoLink) {
      return;
    }
    let videoItems = this.getLocalStorageItem('videos').map((x) => {
      if (x.videoLink === videoLink) {
        x.checkLike = !x.checkLike;
      }
      return x;
    });
    localStorage.setItem('videos', JSON.stringify(videoItems));
  },
  toggleCheckView(videoLink: string | undefined): void {
    if (!videoLink) {
      return;
    }
    let videoItems = this.getLocalStorageItem('videos').map((x) => {
      if (x.videoLink === videoLink) {
        x.checkView = !x.checkView;
      }
      return x;
    });
    localStorage.setItem('videos', JSON.stringify(videoItems));
  },
};
