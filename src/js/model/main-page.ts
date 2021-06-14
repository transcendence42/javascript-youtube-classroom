import { VideoModel } from './index';

export const mainPageModel = {
  getLocalStorageItem(str: string): VideoModel[] | string[] {
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
    let videoItems: VideoModel[] = this.getLocalStorageItem('videos') as VideoModel[];
    localStorage.setItem('videos', JSON.stringify(videoItems.filter((x: VideoModel) => x.videoLink !== videoLink)));
  },
  toggleCheckLike(videoLink: string | undefined): void {
    if (!videoLink) {
      return;
    }
    let videoItems: VideoModel[] = (<VideoModel[]>this.getLocalStorageItem('videos')).map((x: VideoModel) => {
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
    let videoItems: VideoModel[] = (<VideoModel[]>this.getLocalStorageItem('videos')).map((x: VideoModel) => {
      if (x.videoLink === videoLink) {
        x.checkView = !x.checkView;
      }
      return x;
    });
    localStorage.setItem('videos', JSON.stringify(videoItems));
  },
};
