var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ENV } from '../constants/env.js';
export const getQueryString = ({ q, maxResults, type, nextPageToken, }) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetch(`${ENV.YOUTUBE_SEARCH_URL}key=${ENV.API_KEY}&part=snippet&q=${q}&maxResults=${maxResults}&type=${type}&videoEmbeddable=true&pageToken=${nextPageToken}`)
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
});
