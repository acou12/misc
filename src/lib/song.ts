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

export type Song = {
	id: number;
	youtubeId: string;
};

export type Album = {
	id: number;
	songs: Song[];
};

export type Entity =
	| ({
			type: 'song';
	  } & Song & { entity: ItunesEntity & { wrapperType: 'track' } })
	| ({
			type: 'album';
	  } & Album & { entity: ItunesEntity & { wrapperType: 'collection' } });

export type Position = {
	x: number;
	y: number;
};

export const getEntityName = (entity: Entity) =>
	entity.entity.wrapperType === 'track' ? entity.entity.trackName : entity.entity.collectionName;
