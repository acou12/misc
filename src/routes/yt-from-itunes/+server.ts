import { json } from '@sveltejs/kit';
import axios from 'axios';

export type YtFromItunes =
	| {
			status: 'success';
			id: string;
	  }
	| {
			status: 'failure';
	  };

export async function GET({ url }) {
	const itunesUrl = url.searchParams.get('url')!;
	// const data = (
	// 	await axios.get(
	// 		`https://itunes.apple.com/search?term=${encodeURI(
	// 			search
	// 		)}&country=US&entity=song,album,podcast`
	// 	)
	// ).data.results[0];

	// https://music.apple.com/us/album/blue-feat-blue-ivy/780330041?i=780330419&uo=4
	const data = (
		await axios.get(
			`https://api.song.link/v1-alpha.1/links?url=${encodeURI(
				itunesUrl
			)}&userCountry=US&songIfSingle=true`
		)
	).data;

	for (let key in data.entitiesByUniqueId) {
		if (key.startsWith('YOUTUBE')) {
			const id = key.split('::')[1];
			return json({
				status: 'success',
				id
			} as YtFromItunes);
		}
	}

	return json({
		status: 'failure'
	} as YtFromItunes);
}

// export async function GET({ url }) {
// 	const search = url.searchParams.get('search')!;
// 	const data = (
// 		await axios.get(
// 			`https://itunes.apple.com/search?term=testaaaaa&country=US&entity=song,album,podcast&callback=__jp52`
// 		)
// 	).data;
// 	// const data2 = (
// 	// 	await axios.get(
// 	// 		`https://api.song.link/v1-alpha.1/links?url=${encodeURI(
// 	// 			data.trackViewUrl
// 	// 		)}&userCountry=US&songIfSingle=true`
// 	// 	)
// 	// ).data;
// 	// for (let key in data2.entitiesByUniqueId) {
// 	// 	if (key.startsWith('YOUTUBE')) {
// 	// 		return json(key);
// 	// 	}
// 	// }
// 	return json(data);
// }
