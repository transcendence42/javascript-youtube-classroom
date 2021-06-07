const $searchButton: HTMLDivElement | null  = document.querySelector("#search-button");
const $modalClose: HTMLButtonElement | null = document.querySelector(".modal-close");
const $modal: HTMLDivElement| null = document.querySelector(".modal");

const onModalShow = () => {
  $modal?.classList.add("open");
};

const onModalClose = () => {
  $modal?.classList.remove("open");
};

$searchButton?.addEventListener("click", onModalShow);
$modalClose?.addEventListener("click", onModalClose);
