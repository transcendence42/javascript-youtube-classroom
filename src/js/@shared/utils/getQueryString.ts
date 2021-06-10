import { ENV } from '../constants/env.js';
import { $, setDataKey } from './utils.js';

export const getQueryString = async ({
  q,
  maxResults,
  type,
  nextPageToken,
}: {
  q: string;
  maxResults: string;
  type: string;
  nextPageToken: string;
}) => {
  let data = await fetch(
    `${ENV.YOUTUBE_SEARCH_URL}key=${ENV.API_KEY}&part=snippet&q=${q}&maxResults=${maxResults}&type=${type}&videoEmbeddable=true&pageToken=${nextPageToken}`,
  )
    .then((resp) => resp.json())
	.then((items) => items);
//   if (data.error && data.error.code === 400) {
//     data = await fetch(
//       `${ENV.YOUTUBE_SEARCH_URL}key=${ENV.API_KEY_2}&part=snippet&q=${q}&maxResults=${maxResults}&type=${type}&videoEmbeddable=true&pageToken=${nextPageToken}`,
//     )
//       .then((resp) => resp.json())
//       .then((items) => items);
//   }

  return data;
};
