import { $ } from "../util.js";
import { videoSearchPageRenderer } from "../view/videoSearchPage.js";
import { videoSearchPageController } from "./videoSearchPageController.js";
export const navigatorController = () => {
    videoSearchPageRenderer();
    videoSearchPageController();
    const $modal = $(".modal");
    $("#search-button").addEventListener("click", () => onModalShow($modal));
};
const onModalShow = ($modal) => {
    var _a;
    $modal.classList.add("open");
    (_a = $("#search-input")) === null || _a === void 0 ? void 0 : _a.focus();
};
