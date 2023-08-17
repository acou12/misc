import type { Subscriber } from 'svelte/motion';
import { get, writable, type Writable } from 'svelte/store';

export type SongId = number;
export type EntityId = number;

export type Song = {
	id: SongId;
	name: string;
	artist: string;
	youtubeId: string;
};

export type Single = {
	id: EntityId;
	type: 'single';
	name: string;
	artist: string;
	songId: SongId;
	artworkUrl: string;
};

export type Collection = {
	id: EntityId;
	type: 'album';
	name: string;
	artist: string;
	songs: SongId[];
	artworkUrl: string;
};

export type Entity = Single | Collection;

export const songById = (songs: Song[], songId: SongId): Song =>
	songs.find((song) => song.id === songId)!;

export const entityById = (entities: Entity[], entityId: EntityId): Entity =>
	entities.find((entity) => entity.id === entityId)!;

export const allSongs = (entity: Entity, songs: Song[]): SongId[] => {
	if (entity.type === 'single') {
		return [entity.songId];
	} else {
		/* entity.type === 'album' */
		return entity.songs;
	}
};

export const arbitrarySong = (entity: Entity, songs: Song[]): SongId => {
	const entitySongs = allSongs(entity, songs);
	if (entitySongs.length > 0) {
		return entitySongs[0];
	} else {
		throw new Error('there is an entity that does not have a song.');
	}
};
