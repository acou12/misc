import { YOUTUBE_KEY } from '$lib/secret';
import { json } from '@sveltejs/kit';
import axios from 'axios';

export type YoutubePlaylistInfoResponse = {
	kind: string;
	etag: string;
	pageInfo: PageInfo;
	items: Item[];
};

export type Item = {
	kind: string;
	etag: string;
	id: string;
	snippet: Snippet;
};

export type Snippet = {
	publishedAt: Date;
	channelId: string;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	channelTitle: string;
	localized: Localized;
};

export type Localized = {
	title: string;
	description: string;
};

export type Thumbnails = {
	medium: Maxres;
	standard: Maxres;
	maxres: Maxres;
};

export type Maxres = {
	url: string;
	width: number;
	height: number;
};

export type PageInfo = {
	totalResults: number;
	resultsPerPage: number;
};

export async function GET({ url }) {
	const data = (
		await axios.get(
			`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${url.searchParams.get(
				'id'
			)}&key=${YOUTUBE_KEY}&maxResults=50`
		)
	).data as YoutubePlaylistInfoResponse;

	return json(data);
}
