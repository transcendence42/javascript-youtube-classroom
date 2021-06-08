import { ENV } from '../@shared/constants/env.js';

export class VideoModel {
  videoLink: string;
  videoTitle: string;
  channelLink: string;
  channelTitle: string;
  publishedAt: string;
  checkLike: boolean;
  checkView: boolean;

  constructor() {
    this.videoLink = '';
    this.videoTitle = '';
    this.channelLink = '';
    this.channelTitle = '';
    this.publishedAt = '';
    this.checkLike = false;
    this.checkView = false;
  }

  setVideoModel({
    videoLink,
    videoTitle,
    channelLink,
    channelTitle,
    publishedAt,
    checkLike,
    checkView,
  }: {
    videoLink: string;
    videoTitle: string;
    channelLink: string;
    channelTitle: string;
    publishedAt: string;
    checkLike: boolean;
    checkView: boolean;
  }): void {
    this.videoLink = videoLink;
    this.videoTitle = videoTitle;
    this.channelLink = channelLink;
    this.channelTitle = channelTitle;
    this.publishedAt = publishedAt;
    this.checkLike = checkLike;
    this.checkView = checkView;
  }

  setVideoModelFromVideoWrapper(videoWrapper: HTMLElement | null): VideoModel {
    this.videoLink = <string>videoWrapper?.querySelector('iframe')?.src;
    this.videoTitle = <string>videoWrapper?.querySelector('h3')?.innerText;
    this.channelLink = (<HTMLLinkElement>videoWrapper?.querySelector('.content-container a'))?.href;
    this.channelTitle = (<HTMLLinkElement>videoWrapper?.querySelector('.content-container a'))?.innerText;
    (this.publishedAt = <string>videoWrapper?.querySelector('.meta p')?.innerHTML),
      (this.checkLike = false),
      (this.checkView = true);
    return this;
  }

  getVideoModel(): any {
    return {
      videoLink: this.videoLink,
      videoTitle: this.videoTitle,
      channelLink: this.channelLink,
      channelTitle: this.channelTitle,
      publishedAt: this.publishedAt,
      checkLike: this.checkLike,
      checkView: this.checkView,
    };
  }
}
