import { $, $$ } from "../util.js";
import { videoSearchPageRenderer } from "../view/videoSearchPage.js";
import { videoSearchPageController } from "./videoSearchPageController.js";

export const navigatorController = () => {
  videoSearchPageRenderer();
  videoSearchPageController();
  const $modal: HTMLDivElement = $(".modal") as HTMLDivElement;
  $("#search-button")!.addEventListener("click", () => onModalShow($modal));
};

const onModalShow = ($modal: HTMLDivElement) => {
  $modal.classList.add("open");
  $("#search-input")?.focus();
};
