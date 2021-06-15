import { IVideoInfo } from '../IVideoInfo.js';
import { showSnackbar } from '../../controller/snackbar.js';

export const getSavedVideos = (): IVideoInfo[] => {
  const savedVideosStr: string | null = localStorage.getItem('savedVideos');
  if (!savedVideosStr) {
    return [];
  }
  const savedVideosList: IVideoInfo[] = JSON.parse(savedVideosStr);
  return savedVideosList;
};

export const saveVideo = (video: IVideoInfo): void => {
  const savedVideosList: IVideoInfo[] = getSavedVideos();
  video.isSaved = true;
  savedVideosList.push(video);
  localStorage.setItem('savedVideos', JSON.stringify(savedVideosList));
  showSnackbar('동영상이 저장되었습니다.');
};

export const unsaveVideo = (videoId: string): void => {
  let savedVideosList: IVideoInfo[] = getSavedVideos();
  savedVideosList = savedVideosList.filter((video) => video.videoId !== videoId);
  localStorage.setItem('savedVideos', JSON.stringify(savedVideosList));
  showSnackbar('동영상이 삭제되었습니다.');
};

export const isSavedVideo = (videoId: string): boolean => {
  const savedVideosList: IVideoInfo[] = getSavedVideos();
  let ret: boolean = false;
  savedVideosList.forEach((video) => {
    if (video.videoId === videoId) {
      ret = true;
    }
  });
  return ret;
};

export const changeWatchedState = (videoId: string): void => {
  let savedVideosList: IVideoInfo[] = getSavedVideos();
  for (const video of savedVideosList) {
    if (video.videoId !== videoId) {
      continue;
    }
    video.isWatched = !video.isWatched;
    if (video.isWatched) {
      showSnackbar('본 영상 목록으로 이동되었습니다.');
    } else {
      showSnackbar('볼 영상 목록으로 이동되었습니다.');
    }
  }
  localStorage.setItem('savedVideos', JSON.stringify(savedVideosList));
};
