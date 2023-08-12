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
