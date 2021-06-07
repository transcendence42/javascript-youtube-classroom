import { ENV } from './env.js';
const $searchButton = document.querySelector('#search-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const onModalShow = () => {
    $modal === null || $modal === void 0 ? void 0 : $modal.classList.add('open');
};
const onModalClose = () => {
    $modal === null || $modal === void 0 ? void 0 : $modal.classList.remove('open');
};
$searchButton === null || $searchButton === void 0 ? void 0 : $searchButton.addEventListener('click', onModalShow);
$modalClose === null || $modalClose === void 0 ? void 0 : $modalClose.addEventListener('click', onModalClose);
fetch(`https://www.googleapis.com/youtube/v3/search?key=${ENV.API_KEY}&part=snippet&q=bts&maxResults=10&type=video&videoEmbeddable=true`).then((resp) => resp.json())
    .then((items) => console.log(items));
