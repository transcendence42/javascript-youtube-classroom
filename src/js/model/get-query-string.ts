import { ENV } from '../@shared/constants/env.js';

interface YoutubeItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

interface YoutubeResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: string;
    resultsPerPage: string;
  };
  items: YoutubeItem[];
}

const getQueryString = async ({
  q,
  maxResults,
  type,
  nextPageToken,
}: {
  q: string;
  maxResults: string;
  type: string;
  nextPageToken: string;
}): Promise<YoutubeResponse> => {
  let data: YoutubeResponse = await fetch(
    encodeURI(
      `${ENV.YOUTUBE_SEARCH_URL}key=${ENV.API_KEY}&part=snippet&q=${q}&maxResults=${maxResults}&type=${type}&videoEmbeddable=true&pageToken=${nextPageToken}`,
    ),
  )
    .then((resp) => resp.json())
    .then((items) => items);
  return data;
};

export { YoutubeItem, YoutubeResponse, getQueryString };