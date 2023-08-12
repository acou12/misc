const getDataFromItunesId = async (id: number) => {
	const data = (await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`).then((it) =>
		it.json()
	)) as { results: ItunesEntity[] };
	return data;
};

const getDataFromTrackUrl = async (trackViewUrl: string) => {
	const data = (await fetch(
		`https://api.song.link/v1-alpha.1/links?url=${encodeURI(
			trackViewUrl
		)}&userCountry=US&songIfSingle=true`
	).then((it) => it.json())) as {
		pageUrl: string;
		linksByPlatform: {
			youtube?: { entityUniqueId: string };
			itunes?: { entityUniqueId: string };
		};
	};
	return data;
};

const getYoutubeIdFromTrackUrl = async (trackViewUrl: string): Promise<string | undefined> => {
	const data = await getDataFromTrackUrl(trackViewUrl);
	if (data.linksByPlatform.youtube === undefined) return undefined;
	const id: string = data.linksByPlatform.youtube.entityUniqueId.split('::')[1];
	return id;
};
