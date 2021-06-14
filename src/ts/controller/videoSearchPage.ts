import { $, $$ } from '../util.js';
import { IVideoInfo } from '../model/IVideoInfo.js';
import { getRecentKeywords, saveRecentKeywordList } from '../model/handleLocalStorage/recentKeywordManager.js';
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
  removeSkeletons,
} from '../view/videoSearchPage.js';
import { saveVideo, unsaveVideo, isSavedVideo, getSavedVideos } from '../model/handleLocalStorage/articleManager.js';
import { uriParameter } from './uriParameter.js';
import { IYoutubeJSON } from '../model/IYoutubeJSON.js';
import { renderVideo } from '../view/savedVideoPage.js';

const onModalClose = ($modal: HTMLDivElement): void => {
  $modal.classList.remove('open');
  $('#saved-video-button')!.click();
};

const searchOnYoutube = (): void => {
  const inputValue: string = ($('#search-input') as HTMLInputElement).value;
  if (inputValue.trim() === '') {
    ($('#search-input') as HTMLInputElement).value = '';
    $('#search-input')?.focus();
    alert('검색어를 입력해주세요.');
    return;
  }
  $('#search-input')!.dataset.nextPageToken = '';
  $('#search-input')!.dataset.isFirstSearch = 'true';
  renderArticles(inputValue);
};

const searchInfiniteScroll = (): void => {
  if ($('.modal-inner')!.offsetHeight + $('.modal-inner')!.scrollTop >= $('.modal-inner')!.scrollHeight) {
    if ($('#search-input')!.dataset.nextPageToken === 'undefined') {
      addRecentKeyword(($('#search-input') as HTMLInputElement).value);
      return;
    }
    $('#search-input')!.dataset.isFirstSearch = 'false';
    renderArticles(($('#search-input') as HTMLInputElement).value);
  }
};

const addRecentKeyword = (searchValue: string): void => {
  removeDuplicateRecentKeyword(searchValue);
  renderRecentKeyword(searchValue);
  removeOldSearchKeyword();
  saveRecentKeywordListToLocalStorage();
  addClickEventToRecentKeyword($('#recent-keyword > span')?.nextSibling as HTMLAnchorElement, searchValue);
};

const saveRecentKeywordListToLocalStorage = (): void => {
  let recentKeywordList: string[] = [];
  $$('a.chip')?.forEach((keyword) => {
    recentKeywordList.push(keyword.innerText);
  });
  saveRecentKeywordList(recentKeywordList);
};

const addClickEventToRecentKeyword = ($keywordElement: HTMLAnchorElement, searchValue: string): void => {
  $keywordElement.addEventListener('click', () => {
    removeModalArticles();
    $('#search-input')!.dataset.nextPageToken = '';
    $('#search-input')!.dataset.isFirstSearch = 'true';
    ($('#search-input') as HTMLInputElement).value = searchValue;
    renderArticles(searchValue);
  });
};

const renderArticles = (searchValue: string): void => {
  // when first search, delete articles
  if ($('#search-input')?.dataset.isFirstSearch === 'true') {
    $('#searched-article-wrapper')!.innerHTML = '';
  }
  renderSkeleton();
  const searchResult: Promise<string> = getSearchResult(searchValue);
  searchResult
    .then((result) => {
      removeSkeletons();
      const resultJSON: any = JSON.parse(result);
      if (resultJSON.pageInfo.totalResults === 0) {
        renderNotFoundImage();
        return;
      }
      // search result exist
      resultJSON.items.forEach((video: IYoutubeJSON) => {
        const videoInfo: IVideoInfo = {
          videoId: video.id.videoId,
          videoTitle: video.snippet.title,
          publishedAt: convertDateFormat(video.snippet.publishedAt),
          channelId: video.snippet.channelId,
          channelTitle: video.snippet.channelTitle,
          saved: isSavedVideo(video.id.videoId) ? 'yes' : 'no',
          isWatched: false,
        };
        renderSearchedArticle(videoInfo);
        addClickEventToSaveButton(videoInfo);
      });
      addRecentKeyword(searchValue);
    })
    .catch((error) => {
      console.error(`ERROR: ${error}`);
    });
};

const getSearchResult = async (searchTarget: string): Promise<string> => {
  // const URI: string = `https://www.googleapis.com/youtube/v3/search?part=${uriParameter.part}&key=${
  //   uriParameter.key
  // }&q=${searchTarget}&maxResults=${uriParameter.maxResults}&type=${uriParameter.type}&pageToken=${
  //   $('#search-input')!.dataset.nextPageToken
  // }`;
  // const response = await fetch(URI);
  // const body = JSON.stringify(await response.json());
  // $('#search-input')!.dataset.nextPageToken = JSON.parse(body).nextPageToken;
  // return body;

  const body = `{
    "kind": "youtube#searchListResponse",
    "etag": "z9Tmw3kDxbW2Z15S2lUxJ6rDPpc",
    "nextPageToken": "CAoQAA",
    "regionCode": "KR",
    "pageInfo": {
      "totalResults": 1000000,
      "resultsPerPage": 10
    },
    "items": [
      {
        "kind": "youtube#searchResult",
        "etag": "iiDpvjRkpuPbhlQG71AxxZ6f5xc",
        "id": {
          "kind": "youtube#video",
          "videoId": "JoR9u44dNjI"
        },
        "snippet": {
          "publishedAt": "2021-06-05T15:15:01Z",
          "channelId": "UCpjOmwiy88a9EV3Rv8ukJgw",
          "title": "대한민국 VS 투르크메니스탄 : FIFA 카타르 월드컵 2차 예선 하이라이트 - 2021.06.05",
          "description": "벤투호 #대한민국 #투르크메니스탄 #대한축구협회 공식 채널 대한민국 축구 국가대표팀 https://www.facebook.com/KoreaFootballTeam 페이스북 ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/JoR9u44dNjI/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/JoR9u44dNjI/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/JoR9u44dNjI/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "KFATV_한국 축구 국가대표팀",
          "liveBroadcastContent": "none",
          "publishTime": "2021-06-05T15:15:01Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "59-Lt0d9_m7M2mtWxHijPiyNvxs",
        "id": {
          "kind": "youtube#video",
          "videoId": "nSSP5mXGPV4"
        },
        "snippet": {
          "publishedAt": "2021-06-06T10:35:59Z",
          "channelId": "UC4E2H4oEIbwRRWvIcOJQtBg",
          "title": "축구의 감동적인 이별의 순간들....",
          "description": "축구의 감동적인 이별의 순간들.... 해축 입문때부터 함께한 스타들이 점점 은퇴하네요 그럼 즐감하시길... ㅠㅅㅠ.",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/nSSP5mXGPV4/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/nSSP5mXGPV4/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/nSSP5mXGPV4/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "ArtSoccer",
          "liveBroadcastContent": "none",
          "publishTime": "2021-06-06T10:35:59Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "tQLR_D_txObjlXugcB6etf9mVEc",
        "id": {
          "kind": "youtube#video",
          "videoId": "zOme8eCMRII"
        },
        "snippet": {
          "publishedAt": "2021-06-08T01:34:05Z",
          "channelId": "UCk_Ymtay-8Epn0mB_37Htdg",
          "title": "축구 한국인 감독 더비. 박항서 대 신태용 맞대결 경기 영상. 베트남 vs 인도네시아 월드컵 축구 아시아 지역 예선 결과. 동남아의 한국감독에게 거는 기대. 자존심 대결 하이라이트",
          "description": "베트남 (박항서 감독) vs 인도네시아 (신태용 감독) 월드컵 예선전 경기 하이라이트 영상. 오래전부터 관심이 모아졌던 박항서 감독과 신태용 감독의 대결. 베트남 대 ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/zOme8eCMRII/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/zOme8eCMRII/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/zOme8eCMRII/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "스포츠몽땅",
          "liveBroadcastContent": "none",
          "publishTime": "2021-06-08T01:34:05Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "tskZOotJK09ZjMHLns6-qg7Na14",
        "id": {
          "kind": "youtube#video",
          "videoId": "9UzQXHspKAM"
        },
        "snippet": {
          "publishedAt": "2021-06-05T14:01:25Z",
          "channelId": "UC2qVOOz13xLXHaw9yW-aMXQ",
          "title": "대한민국에서 축구를 제일 잘하면 흔히 생기는 일ㅋㅋㅋ",
          "description": "끝나자마자 손흥민에게 인사하러오는 선수들..나도.. 다음 영상을 위해 구독해주세요 ! Please subscribe for the next video 인스타그램 문의 ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/9UzQXHspKAM/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/9UzQXHspKAM/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/9UzQXHspKAM/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "동현kldh",
          "liveBroadcastContent": "none",
          "publishTime": "2021-06-05T14:01:25Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "yWawt83Kymo9PUBrq7AHAawyWQw",
        "id": {
          "kind": "youtube#video",
          "videoId": "ap5ZhZjMkBs"
        },
        "snippet": {
          "publishedAt": "2021-06-05T13:08:22Z",
          "channelId": "UC1M_CV71TGFZdI5bW46nYzQ",
          "title": "대한민국VS투르크메니스탄 골모음 아시아 월드컵2차 예선 대한민국5:0투르크메니스탄",
          "description": "축구국가대표#대한민국VS투르크메니스탄#월드컵2차예선.",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/ap5ZhZjMkBs/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/ap5ZhZjMkBs/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/ap5ZhZjMkBs/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "축다ChookDa",
          "liveBroadcastContent": "none",
          "publishTime": "2021-06-05T13:08:22Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "PEBtE0QGDYSu_P5ajq9FFssSgeU",
        "id": {
          "kind": "youtube#video",
          "videoId": "Qli4W0gdefE"
        },
        "snippet": {
          "publishedAt": "2021-06-06T12:15:01Z",
          "channelId": "UCn9mJ4htO64-1osMWYu9k5Q",
          "title": "[축구잡학사전] 벵거에 대해 알려지지 않은 11가지 사실",
          "description": "#축구잡학사전 #벵거 #아스날.",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/Qli4W0gdefE/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/Qli4W0gdefE/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/Qli4W0gdefE/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "이스타TV",
          "liveBroadcastContent": "none",
          "publishTime": "2021-06-06T12:15:01Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "trHlp8ksLd_UV8IxtCTokVhrFNk",
        "id": {
          "kind": "youtube#video",
          "videoId": "SIYzFP8cwJM"
        },
        "snippet": {
          "publishedAt": "2021-06-06T10:00:10Z",
          "channelId": "UCpjOmwiy88a9EV3Rv8ukJgw",
          "title": "국대vs올대, 권창훈x정우영 파워킥 대결! 그 결과는??",
          "description": "다시 돌아온 파워에이드 배틀챌린지!! 국가대표팀 vs 올림픽대표팀이 붙었다! 권창훈x정우영 선수의 파워킥 대결 그 결과는?? ✓ 하나은행 후원 월드컵 아시아예선 ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/SIYzFP8cwJM/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/SIYzFP8cwJM/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/SIYzFP8cwJM/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "KFATV_한국 축구 국가대표팀",
          "liveBroadcastContent": "none",
          "publishTime": "2021-06-06T10:00:10Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "9Xt7CKB-HlIdEhnkzAHteU2EZ9A",
        "id": {
          "kind": "youtube#video",
          "videoId": "f57KR74kkpk"
        },
        "snippet": {
          "publishedAt": "2021-06-07T13:59:55Z",
          "channelId": "UCt60X7NyTbWUUvNQv3nQJxw",
          "title": "한국축구의 전설 故유상철 삼가 고인의 명복을 빕니다.",
          "description": "유상철 가슴속에 밝았던 유상철 선수의 모습을 잊지 않겠습니다. 삼가 고인의 명복을 빕니다.",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/f57KR74kkpk/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/f57KR74kkpk/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/f57KR74kkpk/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "지기원정대:: JIGI Football Expedition",
          "liveBroadcastContent": "none",
          "publishTime": "2021-06-07T13:59:55Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "J7S6f9U-zYZ3CQInkCHgvpvnGQc",
        "id": {
          "kind": "youtube#video",
          "videoId": "wy9mePzdEQE"
        },
        "snippet": {
          "publishedAt": "2021-01-21T09:00:33Z",
          "channelId": "UC4E2H4oEIbwRRWvIcOJQtBg",
          "title": "축구 역사의 전설적인 순간들...",
          "description": "축구 역사의 전설적인 순간들... 축구에서 영원히 기억될만한 순간들입니다. 가슴이 웅장해지네요..... 그러면 즐감하시길! ㅋㅅㅋ.",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/wy9mePzdEQE/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/wy9mePzdEQE/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/wy9mePzdEQE/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "ArtSoccer",
          "liveBroadcastContent": "none",
          "publishTime": "2021-01-21T09:00:33Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "MtID-ZnctvQCKAcnj_f7F_JnzwI",
        "id": {
          "kind": "youtube#video",
          "videoId": "fI4s3zguTjA"
        },
        "snippet": {
          "publishedAt": "2021-06-07T03:09:32Z",
          "channelId": "UCcOYEm78CpaZQvPE6LtoSeA",
          "title": "[골 때리는 그녀들] &#39;2002 축구 레전드가 한자리에 모였다!_6월 16일 골 때리러 갑니다!&#39; / &#39;Shooting Stars&#39;｜SBSNOW",
          "description": "SBS '골 때리는 그녀들' ☞ 6월 16일 수요일 밤 9시 첫 방송⚽ #골때리는그녀들 #여자축구 #골때녀 ▷ Subscribe NOW! SBS NOW! https://bit.ly/2YRf9Kn ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/fI4s3zguTjA/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/fI4s3zguTjA/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/fI4s3zguTjA/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "SBS NOW / SBS 공식 채널",
          "liveBroadcastContent": "none",
          "publishTime": "2021-06-07T03:09:32Z"
        }
      }
    ]
  }`;
  $('#search-input')!.dataset.nextPageToken = JSON.parse(body).nextPageToken;
  return body;
};

const addClickEventToSaveButton = (videoInfo: IVideoInfo): void => {
  const $saveButton: HTMLButtonElement = $('div.modal-inner article.clip:last-child button') as HTMLButtonElement;
  $saveButton.addEventListener('click', () => {
    if ($saveButton.dataset.saved === 'no') {
      if (getSavedVideos().length === 100) {
        alert('저장된 동영상의 갯수가 100개를 넘을 수 없습니다.');
        return;
      }
      saveVideo(videoInfo);
      $saveButton.dataset.saved = 'yes';
    } else {
      if (!confirm('정말 삭제하시겠습니까?')) {
        return;
      }
      unsaveVideo($saveButton.dataset.videoId!);
      $saveButton.dataset.saved = 'no';
    }
    reRenderSavedButtonText($saveButton);
    reRenderNumOfSavedVideos();
  });
};

const convertDateFormat = (originalFormat: string): string => {
  const temp: Date = new Date(originalFormat);
  return `${temp.getFullYear()}년 ${temp.getMonth() + 1}월 ${temp.getDate() + 1}일`;
};

const showRecentKeywords = (): void => {
  getRecentKeywords()
    .reverse()
    .forEach((keyword: string) => {
      renderRecentKeyword(keyword);
      addClickEventToRecentKeyword($('#recent-keyword > span')?.nextSibling as HTMLAnchorElement, keyword);
    });
};

export const videoSearchPageController = (): void => {
  // add event close button
  const $modal: HTMLDivElement = $('.modal') as HTMLDivElement;
  $('.modal-close')!.addEventListener('click', () => onModalClose($modal));
  $('#search-submit-button')!.addEventListener('click', () => searchOnYoutube());
  $('.modal-inner')?.addEventListener('scroll', () => searchInfiniteScroll());
  showRecentKeywords();
};
