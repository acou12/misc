import { YOUTUBE_KEY } from '$lib/secret';
import { json } from '@sveltejs/kit';
import axios from 'axios';

export type YoutubePlaylistResponse = {
	kind: string;
	etag: string;
	items: Item[];
	pageInfo: PageInfo;
};

export type Item = {
	kind: ItemKind;
	etag: string;
	id: string;
	snippet: Snippet;
};

export type ItemKind = 'youtube#playlistItem';

export type Snippet = {
	publishedAt: Date;
	channelId: string;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	channelTitle: string;
	playlistId: string;
	position: number;
	resourceId: ResourceID;
	videoOwnerChannelTitle: string;
	videoOwnerChannelId: string;
};

export type ResourceID = {
	kind: ResourceIDKind;
	videoId: string;
};

export type ResourceIDKind = 'youtube#video';

export type Thumbnails = {
	default: Default;
	medium: Default;
	high: Default;
	standard: Default;
	maxres: Default;
};

export type Default = {
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
			`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${url.searchParams.get(
				'list'
			)}&key=${YOUTUBE_KEY}&maxResults=50`
		)
	).data as YoutubePlaylistResponse;

	return json(data);
}
