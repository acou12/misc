import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function GET({ url }) {
	const search = url.searchParams.get('search')!;
	const data = (
		await axios.get(
			`https://itunes.apple.com/search?term=${encodeURI(
				search
			)}&country=US&entity=song,album,podcast`
		)
	).data.results[0];
	const data2 = (
		await axios.get(
			`https://api.song.link/v1-alpha.1/links?url=${encodeURI(
				data.trackViewUrl
			)}&userCountry=US&songIfSingle=true`
		)
	).data;
	for (let key in data2.entitiesByUniqueId) {
		if (key.startsWith('YOUTUBE')) {
			return json(key);
		}
	}
	return json(data2);
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
