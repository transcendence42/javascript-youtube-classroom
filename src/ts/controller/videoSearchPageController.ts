import { $, $$ } from "../util.js";
import { IVideoInfo } from "../model/IVideoInfo.js";
import {
  getRecentKeywords,
  saveRecentKeywordList
} from "../model/handleLocalStorage/recentKeywordManager.js";
import {
  renderNotFoundImage,
  renderRecentKeyword,
  renderSearchedArticle,
  renderSkeleton,
  reRenderSavedButtonText,
  reRenderNumOfSavedVideos,
  removeModalArticles,
  removeDuplicateRecentKeyword,
  removeOldSearchKeyword,
  removeSkeletons
} from "../view/videoSearchPage.js";
import {
  saveVideo,
  unsaveVideo,
  isSavedVideo,
  getSavedVideos
} from "../model/handleLocalStorage/articleManager.js";
import { keys } from "./apiKey.js";

export const videoSearchPageController = (): void => {
  // add event close button
  const $modal: HTMLDivElement = $(".modal") as HTMLDivElement;
  $(".modal-close")!.addEventListener("click", () => onModalClose($modal));

  $("#search-submit-button")!.addEventListener("click", () =>
    searchOnYoutube()
  );

  $(".modal-inner")?.addEventListener("scroll", () => searchInfiniteScroll());

  showRecentKeywords();
};

const showRecentKeywords = (): void => {
  getRecentKeywords()
    .reverse()
    .forEach((keyword: string) => {
      renderRecentKeyword(keyword);
      addClickEventToRecentKeyword(
        $("#recent-keyword > span")?.nextSibling as HTMLAnchorElement,
        keyword
      );
    });
};

const searchInfiniteScroll = (): void => {
  if (
    $(".modal-inner")!.offsetHeight + $(".modal-inner")!.scrollTop >=
    $(".modal-inner")!.scrollHeight
  ) {
    if ($("#search-input")!.dataset.nextPageToken === "undefined") {
      addRecentKeyword(($("#search-input") as HTMLInputElement).value);
      return;
    }
    $("#search-input")!.dataset.isFirstSearch = "false";
    renderArticles(($("#search-input") as HTMLInputElement).value);
  }
};

const onModalClose = ($modal: HTMLDivElement): void => {
  $modal.classList.remove("open");
};

const searchOnYoutube = (): void => {
  const inputValue: string = ($("#search-input") as HTMLInputElement).value;
  if (!isValidSearchInput(inputValue)) {
    ($("#search-input") as HTMLInputElement).value = "";
    $("#search-input")?.focus();
    alert("검색어를 입력해주세요.");
    return;
  }
  $("#search-input")!.dataset.nextPageToken = "";
  $("#search-input")!.dataset.isFirstSearch = "true";
  renderArticles(inputValue);
};

const isValidSearchInput = (searchValue: string): boolean => {
  if (searchValue.trim() === "") {
    return false;
  }
  return true;
};

const renderArticles = (searchValue: string): void => {
  // when first search, delete articles
  if ($("#search-input")?.dataset.isFirstSearch === "true") {
    $("div.modal-inner section.video-wrapper")!.innerHTML = "";
  }

  renderSkeleton();

  const searchResult: Promise<string> = getSearchResult(searchValue);
  searchResult
    .then(result => {
      removeSkeletons();
      const resultJSON: any = JSON.parse(result);
      if (resultJSON.pageInfo.totalResults === 0) {
        renderNotFoundImage();
        return;
      }

      // search result exist
      resultJSON.items.forEach((video: any) => {
        const videoInfo: IVideoInfo = {
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

const addClickEventToSaveButton = (videoInfo: IVideoInfo): void => {
  const $saveButton: HTMLButtonElement = $(
    "div.modal-inner article.clip:last-child button"
  ) as HTMLButtonElement;
  $saveButton.addEventListener("click", () => {
    if ($saveButton.dataset.saved === "no") {
      if (getSavedVideos().length === 100) {
        alert("저장된 동영상의 갯수가 100개를 넘을 수 없습니다.");
        return;
      }
      saveVideo(videoInfo);
      $saveButton.dataset.saved = "yes";
    } else {
      unsaveVideo($saveButton.dataset.videoId!);
      $saveButton.dataset.saved = "no";
    }
    reRenderSavedButtonText($saveButton);
    reRenderNumOfSavedVideos();
  });
};

const convertDateFormat = (originalFormat: string): string => {
  const temp = new Date(originalFormat);
  return `${temp.getFullYear()}년 ${temp.getMonth() + 1}월 ${
    temp.getDate() + 1
  }일`;
};

const getSearchResult = async (searchTarget: string): Promise<string> => {
  const URI = `https://www.googleapis.com/youtube/v3/search?part=${
    keys.part
  }&key=${keys.apiKey}&q=${searchTarget}&maxResults=${keys.maxResults}&type=${
    keys.type
  }&pageToken=${$("#search-input")!.dataset.nextPageToken}`;
  const response = await fetch(URI);
  const body = JSON.stringify(await response.json());
  $("#search-input")!.dataset.nextPageToken = JSON.parse(body).nextPageToken;
  return body;
};

const addRecentKeyword = (searchValue: string): void => {
  removeDuplicateRecentKeyword(searchValue);
  renderRecentKeyword(searchValue);
  removeOldSearchKeyword();
  saveRecentKeywordListToLocalStorage();
  addClickEventToRecentKeyword(
    $("#recent-keyword > span")?.nextSibling as HTMLAnchorElement,
    searchValue
  );
};

const saveRecentKeywordListToLocalStorage = (): void => {
  let recentKeywordList: string[] = [];
  $$("a.chip")?.forEach(keyword => {
    recentKeywordList.push(keyword.innerText);
  });
  saveRecentKeywordList(recentKeywordList);
};

const addClickEventToRecentKeyword = (
  $keywordElement: HTMLAnchorElement,
  searchValue: string
): void => {
  $keywordElement.addEventListener("click", () => {
    removeModalArticles();
    $("#search-input")!.dataset.nextPageToken = "";
    $("#search-input")!.dataset.isFirstSearch = "true";
    ($("#search-input") as HTMLInputElement).value = searchValue;
    renderArticles(searchValue);
  });
};
