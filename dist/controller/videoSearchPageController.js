var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { $, $$ } from "../util.js";
import { getRecentKeywords, saveRecentKeywordList } from "../model/handleLocalStorage/recentKeywordManager.js";
import { renderNotFoundImage, renderRecentKeyword, renderSearchedArticle, renderSkeleton, reRenderSavedButtonText, reRenderNumOfSavedVideos, removeModalArticles, removeDuplicateRecentKeyword, removeOldSearchKeyword, removeSkeletons } from "../view/videoSearchPage.js";
import { saveVideo, unsaveVideo, isSavedVideo, getSavedVideos } from "../model/handleLocalStorage/articleManager.js";
import { keys } from "./apiKey.js";
export const videoSearchPageController = () => {
    var _a;
    // add event close button
    const $modal = $(".modal");
    $(".modal-close").addEventListener("click", () => onModalClose($modal));
    $("#search-submit-button").addEventListener("click", () => searchOnYoutube());
    (_a = $(".modal-inner")) === null || _a === void 0 ? void 0 : _a.addEventListener("scroll", () => searchInfiniteScroll());
    showRecentKeywords();
};
const showRecentKeywords = () => {
    getRecentKeywords()
        .reverse()
        .forEach(keyword => {
        var _a;
        renderRecentKeyword(keyword);
        addClickEventToRecentKeyword((_a = $("#recent-keyword > span")) === null || _a === void 0 ? void 0 : _a.nextSibling, keyword);
    });
};
const searchInfiniteScroll = () => {
    if ($(".modal-inner").offsetHeight + $(".modal-inner").scrollTop >=
        $(".modal-inner").scrollHeight) {
        if ($("#search-input").dataset.nextPageToken === "undefined") {
            addRecentKeyword($("#search-input").value);
            return;
        }
        $("#search-input").dataset.isFirstSearch = "false";
        renderArticles($("#search-input").value);
    }
};
const onModalClose = ($modal) => {
    $modal.classList.remove("open");
};
const searchOnYoutube = () => {
    var _a;
    const inputValue = $("#search-input").value;
    if (!isValidSearchInput(inputValue)) {
        $("#search-input").value = "";
        (_a = $("#search-input")) === null || _a === void 0 ? void 0 : _a.focus();
        alert("검색어를 입력해주세요.");
        return;
    }
    $("#search-input").dataset.nextPageToken = "";
    $("#search-input").dataset.isFirstSearch = "true";
    renderArticles(inputValue);
};
const isValidSearchInput = (searchValue) => {
    if (searchValue.trim() === "") {
        return false;
    }
    return true;
};
const renderArticles = (searchValue) => {
    var _a;
    // when first search, delete articles
    if (((_a = $("#search-input")) === null || _a === void 0 ? void 0 : _a.dataset.isFirstSearch) === "true") {
        $("div.modal-inner section.video-wrapper").innerHTML = "";
    }
    renderSkeleton();
    const searchResult = getSearchResult(searchValue);
    searchResult
        .then(result => {
        removeSkeletons();
        const resultJSON = JSON.parse(result);
        if (resultJSON.pageInfo.totalResults === 0) {
            renderNotFoundImage();
            return;
        }
        // search result exist
        resultJSON.items.forEach((video) => {
            const videoInfo = {
                videoId: video.id.videoId,
                videoTitle: video.snippet.title,
                publishedAt: convertDateFormat(video.snippet.publishedAt),
                channelId: video.snippet.channelId,
                channelTitle: video.snippet.channelTitle,
                saved: isSavedVideo(video.id.videoId) ? "yes" : "no"
            };
            renderSearchedArticle(videoInfo);
            addClickEventToSaveButton(videoInfo);
        });
        addRecentKeyword(searchValue);
    })
        .catch(error => {
        console.error(`ERROR: ${error}`);
    });
};
const addClickEventToSaveButton = (videoInfo) => {
    const $saveButton = $("div.modal-inner article.clip:last-child button");
    $saveButton.addEventListener("click", () => {
        if ($saveButton.dataset.saved === "no") {
            if (getSavedVideos().length === 100) {
                alert("저장된 동영상의 갯수가 100개를 넘을 수 없습니다.");
                return;
            }
            saveVideo(videoInfo);
            $saveButton.dataset.saved = "yes";
        }
        else {
            unsaveVideo($saveButton.dataset.videoId);
            $saveButton.dataset.saved = "no";
        }
        reRenderSavedButtonText($saveButton);
        reRenderNumOfSavedVideos();
    });
};
const convertDateFormat = (originalFormat) => {
    const temp = new Date(originalFormat);
    return `${temp.getFullYear()}년 ${temp.getMonth() + 1}월 ${temp.getDate() + 1}일`;
};
const getSearchResult = (searchTarget) => __awaiter(void 0, void 0, void 0, function* () {
    const URI = `https://www.googleapis.com/youtube/v3/search?part=${keys.part}&key=${keys.apiKey}&q=${searchTarget}&maxResults=${keys.maxResults}&type=${keys.type}&pageToken=${$("#search-input").dataset.nextPageToken}`;
    const response = yield fetch(URI);
    const body = JSON.stringify(yield response.json());
    $("#search-input").dataset.nextPageToken = JSON.parse(body).nextPageToken;
    return body;
});
const addRecentKeyword = (searchValue) => {
    var _a;
    removeDuplicateRecentKeyword(searchValue);
    renderRecentKeyword(searchValue);
    removeOldSearchKeyword();
    saveRecentKeywordListToLocalStorage();
    addClickEventToRecentKeyword((_a = $("#recent-keyword > span")) === null || _a === void 0 ? void 0 : _a.nextSibling, searchValue);
};
const saveRecentKeywordListToLocalStorage = () => {
    var _a;
    let recentKeywordList = [];
    (_a = $$("a.chip")) === null || _a === void 0 ? void 0 : _a.forEach(keyword => {
        recentKeywordList.push(keyword.innerText);
    });
    saveRecentKeywordList(recentKeywordList);
};
const addClickEventToRecentKeyword = ($keywordElement, searchValue) => {
    $keywordElement.addEventListener("click", () => {
        removeModalArticles();
        $("#search-input").dataset.nextPageToken = "";
        $("#search-input").dataset.isFirstSearch = "true";
        $("#search-input").value = searchValue;
        renderArticles(searchValue);
    });
};
