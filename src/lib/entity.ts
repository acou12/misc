import type { Subscriber } from 'svelte/motion';
import { get, writable, type Writable } from 'svelte/store';

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

type HandlerParams = {
	add: { entity: Entity };
	delete: { entity: Entity };
	update: { id: number };
};

export class EntityArray {
	private entities: Writable<Entity[]>;
	private eventHandlers: { [K in keyof HandlerParams]: ((params: HandlerParams[K]) => void)[] };

	constructor(entities: Entity[]) {
		this.entities = writable(entities);
		this.eventHandlers = {
			add: [],
			delete: [],
			update: []
		};
	}

	add(entity: Entity) {
		this.entities.update((oldEntities) => [...oldEntities, entity]);
		this.emit('add', { entity });
	}

	remove(id: number) {
		const entity = get(this.entities).find((entity) => entity.id === id)!;
		this.entities.update((oldEntities) => oldEntities.filter((e) => e.id !== id));
		this.emit('delete', { entity });
	}

	get(id: number) {
		return get(this.entities).find((entity) => entity.id === id)!;
	}

	subscribe(callback: Subscriber<Entity[]>) {
		return this.entities.subscribe(callback);
	}

	getEntity(id: number): Omit<Writable<Entity>, 'update'> {
		const entity = get(this.entities).find((entity) => entity.id === id)!;
		return {
			subscribe: (callback: Subscriber<Entity>) =>
				this.entities.subscribe((entities) => callback(entity)),
			set: (value: Entity) => {
				this.entities.update((oldEntities) =>
					oldEntities.map((entity) => (entity.id === id ? value : entity))
				);
				this.emit('update', { id });
			}
		};
	}

	on<K extends keyof HandlerParams>(k: K, handler: (params: HandlerParams[K]) => void): void {
		this.eventHandlers[k].push(handler);
	}

	private emit<K extends keyof HandlerParams>(k: K, data: HandlerParams[K]) {
		this.eventHandlers[k].forEach((handler) => handler(data));
	}
}
