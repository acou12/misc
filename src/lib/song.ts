export type ItunesEntity =
	| {
			wrapperType: 'collection';
			artistName: string;
			collectionName: string;
			collectionId: number;
			artworkUrl100: string;
	  }
	| {
			wrapperType: 'track';
			trackName: string;
			trackId: number;
			trackViewUrl: string;
			artistName: string;
			collectionName: string;
			collectionId: number;
			artworkUrl100: string;
	  };

export type SongData = {
	id: number;
	youtubeId: string;
};

export type AlbumData = {
	id: number;
	songs: SongEntity[];
};

export type Entity =
	| ({
			type: 'song';
	  } & SongData & { entity: ItunesEntity & { wrapperType: 'track' } })
	| ({
			type: 'album';
	  } & AlbumData & { entity: ItunesEntity & { wrapperType: 'collection' } });

export type SongEntity = Entity & { type: 'song' };
export type AlbumEntity = Entity & { type: 'album' };

export type Position = {
	x: number;
	y: number;
};

export const getEntityName = (entity: Entity) =>
	entity.entity.wrapperType === 'track' ? entity.entity.trackName : entity.entity.collectionName;

export const entityFromYoutubeId = (entities: Entity[], id: string) =>
	entities.find((entity) =>
		entity.type === 'song'
			? entity.youtubeId === id
			: entity.songs.some((song) => song.youtubeId === id)
	)!;

export const entitySongs = (entity: Entity) => (entity.type === 'song' ? [entity] : entity.songs);
