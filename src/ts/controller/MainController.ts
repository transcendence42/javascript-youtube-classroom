import { $, $$ } from '../util.js'

export default class MainController {
  constructor() {
    // this.searchYouTube({key: "AIzaSyDePhAXMqghAgsST1Ms0C8TMNK5IVn8OAo", query: "축구", max: 10}, this.test);
    //this.getAPITest();
    const $modal: HTMLDivElement = $('.modal') as HTMLDivElement;
    $('#search-button')!.addEventListener('click', () => this.onModalShow($modal));
    $(".modal-close")!.addEventListener('click', () => this.onModalClose($modal));
  }

  async getAPITest() {  // 이름 변경 필요
    const URI = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDePhAXMqghAgsST1Ms0C8TMNK5IVn8OAo&q=축구&maxResults=10&type=video&pageToken=CAUQAA`;
    const response = await fetch(URI);
    const body = JSON.stringify(await response.json());
    console.log(body);
  }

  onModalShow($modal: HTMLDivElement) {
    $modal.classList.add("open");
  }

  onModalClose($modal: HTMLDivElement) {
    $modal.classList.remove("open");
  }


}