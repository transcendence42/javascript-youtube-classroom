import { ENV } from '../constants/env.js'

export const getQueryString = async ({ q, maxResults, type }: { q: string, maxResults: string, type: string }) => {
	const data = await fetch(
		`${ENV.YOUTUBE_SEARCH_URL}key=${ENV.API_KEY}&part=snippet&q=${q}&maxResults=${maxResults}&type=${type}&videoEmbeddable=true`,
	).then((resp) => resp.json())
		.then((items) => items)
	return data.items;
}
