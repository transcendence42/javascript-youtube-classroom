import { $, $$ } from "../util.js";
import { modalDiv, modalCloseButton, modalHeader, modalSearchForm, modalRecentKeywordSection, modalArticleSection, modalArticle, skeleton } from "./modalPage/index.js";
import { getSavedVideos } from "../model/handleLocalStorage/articleManager.js";
export const renderSearchedArticle = (videoInfo) => {
    const $articleSection = $("div.modal-inner section.video-wrapper");
    $articleSection.insertAdjacentHTML("beforeend", modalArticle(videoInfo));
};
export const renderRecentKeyword = (searchValue) => {
    const $recentKeywordSpan = $("#recent-keyword > span");
    $recentKeywordSpan.insertAdjacentHTML("afterend", `<a class="chip">${searchValue}</a>`);
};
export const removeModalArticles = () => {
    $("div.modal-inner section.video-wrapper").innerHTML = "";
};
export const renderNotFoundImage = () => {
    var _a;
    removeModalArticles();
    (_a = $("div.modal-inner section.video-wrapper")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", "<img src='./src/images/status/not_found.png' />");
};
export const renderSkeleton = () => {
    var _a;
    (_a = $("div.modal-inner section.video-wrapper")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", skeleton().repeat(10));
};
export const reRenderSavedButtonText = ($button) => {
    $button.innerText =
        $button.innerText === "❌ 저장 취소" ? "⬇️ 저장" : "❌ 저장 취소";
};
export const reRenderNumOfSavedVideos = () => {
    $("#num-of-videos").innerText = String(getSavedVideos().length);
};
export const removeDuplicateRecentKeyword = (searchValue) => {
    $$(".chip").forEach(elem => {
        if (elem.innerText === searchValue) {
            elem.remove();
        }
    });
};
export const removeOldSearchKeyword = () => {
    var _a;
    if ($$(".chip").length === 4) {
        (_a = $("a.chip:last-child")) === null || _a === void 0 ? void 0 : _a.remove();
    }
};
export const removeSkeletons = () => {
    var _a;
    (_a = $$("div.modal-inner section.video-wrapper .skeleton")) === null || _a === void 0 ? void 0 : _a.forEach(elem => {
        var _a;
        (_a = elem.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    });
};
export const videoSearchPageRenderer = () => {
    var _a, _b, _c, _d, _e, _f;
    (_a = $("#app")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", modalDiv());
    (_b = $("div.modal-inner")) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML("beforeend", modalCloseButton());
    (_c = $("div.modal-inner")) === null || _c === void 0 ? void 0 : _c.insertAdjacentHTML("beforeend", modalHeader());
    (_d = $("div.modal-inner")) === null || _d === void 0 ? void 0 : _d.insertAdjacentHTML("beforeend", modalSearchForm());
    (_e = $("div.modal-inner")) === null || _e === void 0 ? void 0 : _e.insertAdjacentHTML("beforeend", modalRecentKeywordSection());
    (_f = $("div.modal-inner")) === null || _f === void 0 ? void 0 : _f.insertAdjacentHTML("beforeend", modalArticleSection());
};
