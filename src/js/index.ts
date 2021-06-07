import { ENV } from './env.js';

const $searchButton: HTMLDivElement | null = document.querySelector('#search-button');
const $modalClose: HTMLButtonElement | null = document.querySelector('.modal-close');
const $modal: HTMLDivElement | null = document.querySelector('.modal');

const onModalShow = () => {
  $modal?.classList.add('open');
};

const onModalClose = () => {
  $modal?.classList.remove('open');
};

$searchButton?.addEventListener('click', onModalShow);
$modalClose?.addEventListener('click', onModalClose);

fetch(
  `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${ENV.API_KEY}&part=snippet,contentDetails,statistics,status`,
).then((res) => console.log(res));
