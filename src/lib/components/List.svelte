<script lang="ts">
	import type { Writable } from 'svelte/store';
	import {
		allSongs,
		arbitrarySong,
		entityById,
		type Entity,
		type EntityId,
		type Song,
		type SongId,
		type Collection
	} from '$lib/entity';
	import type { Position } from '$lib/visual';
	import type { GuiMode } from '../../routes/+page.svelte';
	import { onMount } from 'svelte';
	import { addTask, updateTask, type Task } from '$lib/tasks';
	import type { YoutubePlaylistInfoResponse } from '../../routes/info/+server';
	import type { YoutubePlaylistResponse } from '../../routes/list/+server';
	import { randomId, randomPosition } from '$lib/util';
	import { base } from '$app/paths';

	let sortIndex = 0;

	export let setPlayback: (songId: SongId) => void;

	$: sort = sorts[sortIndex];

	export let songs: Writable<Song[]>;
	export let entities: Writable<Entity[]>;
	export let tasks: Writable<Task[]>;
	export let positions: Writable<Record<number, Position>>;
	export let connections: [number, number][];
	export let currentlyPlayingSong: number | undefined;

	export let guiMode: GuiMode;

	export let infoId: number | undefined;

	const sorts = [
		{ sortFn: (a: Entity, b: Entity) => a.name.localeCompare(b.name) },
		{ sortFn: (a: Entity, b: Entity) => a.artist.localeCompare(b.artist) },
		{ sortFn: (a: Entity, b: Entity) => a.name.length - b.name.length },
		{ sortFn: (a: Entity, b: Entity) => allSongs(a, $songs).length - allSongs(b, $songs).length }
		// (a: Entity, b: Entity) => colors[a.id] - colors[b.id]
	];

	// const generateColors = async (entities: Entity[]): Promise<Record<EntityId, number>> => {
	// 	const record: Record<EntityId, number> = {};
	// 	for (const entity of entities) {
	// 		try {
	// 			const image = new Image();
	// 			image.src = entity.artworkUrl;
	// 			await new Promise((resolve) => {
	// 				image.onload = () => {
	// 					const canvas = document.createElement('canvas');
	// 					canvas.width = image.width;
	// 					canvas.height = image.height;
	// 					const ctx = canvas.getContext('2d')!;
	// 					ctx.drawImage(image, 0, 0);
	// 					const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	// 					record[entity.id] = data.data[0];
	// 					resolve(undefined);
	// 				};
	// 			});
	// 		} catch (e) {
	// 			record[entity.id] = 0;
	// 			console.log('rip');
	// 		}
	// 	}
	// 	console.log(record);
	// 	return record;
	// };

	// let colors: Record<EntityId, number>;

	// onMount(async () => {
	// 	colors = await generateColors($entities);
	// 	alert('colors generated');
	// });

	let newSongInput = '';

	const addNewSong = async () => {
		const songUrl = newSongInput;
		newSongInput = '';

		const [newTasks, taskId] = addTask($tasks, 'Adding...');
		$tasks = newTasks;

		const FAILED_MESSAGE = 'Add failed. Please enter a link to a youtube playlist.';

		if (!songUrl.includes('?')) {
			$tasks = updateTask($tasks, taskId, FAILED_MESSAGE);
			return;
		}

		const queryParamsRaw = songUrl.split('?')[1];
		const queryParams = new URLSearchParams(queryParamsRaw);

		if (!queryParams.has('list')) {
			$tasks = updateTask($tasks, taskId, FAILED_MESSAGE);
			return;
		}

		const infoData = (await fetch(`${base}/info?id=${queryParams.get('list')}`).then((it) =>
			it.json()
		)) as YoutubePlaylistInfoResponse;

		const albumData = infoData.items[0].snippet;

		const albumTitle = albumData.title;
		const artist = albumData.channelTitle;
		const artwork = Object.entries(albumData.thumbnails)[0][1].url;

		const listData = (await fetch(`${base}/list?list=${queryParams.get('list')}`).then((it) =>
			it.json()
		)) as YoutubePlaylistResponse;

		const newSongs = listData.items.map(
			(item) =>
				({
					id: randomId(),
					name: item.snippet.title,
					artist,
					youtubeId: item.snippet.resourceId.videoId
				} satisfies Song)
		);

		const newAlbum: Collection = {
			id: randomId(),
			type: 'album',
			name: albumTitle,
			artist,
			artworkUrl: artwork,
			songs: newSongs.map((song) => song.id)
		};

		$songs = [...$songs, ...newSongs];
		$entities = [...$entities, newAlbum];
		$positions[newAlbum.id] = randomPosition();

		$tasks = updateTask($tasks, taskId, `Done! "${newAlbum.name}" has been added.`);

		console.log(listData);
	};
</script>

<div class="list-outer">
	<div class="list-wrapper">
		<div class="list">
			<button
				on:click={() => {
					sortIndex++;
					sortIndex %= sorts.length;
				}}>change sort</button
			>
			<form on:submit|preventDefault={addNewSong}>
				<input type="text" bind:value={newSongInput} placeholder="add new song..." />
				<input type="submit" value="add" />
			</form>
			{#each $entities.sort(sort.sortFn) as entity}
				<button
					class="song"
					on:click={() => {
						setPlayback(arbitrarySong(entity, $songs));
					}}
					on:contextmenu={(e) => {
						infoId = entity.id;
						e.preventDefault();
					}}
					class:playing={currentlyPlayingSong !== undefined &&
						allSongs(entity, $songs).includes(currentlyPlayingSong)}
				>
					<img class="song-image" src={entity.artworkUrl} alt="" />
					<div class="song-text">
						<div class="title">
							{entity.name}
						</div>
						<div class="artist">
							{entity.artist}
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.list-outer {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.list {
		width: 60vw;
		padding-bottom: 300px;
	}

	.song {
		display: flex;
		padding: 10px;
		margin: 5px;
		height: 70px;
		text-align: left;
		width: 100%;
		border-radius: 10px;
	}

	.song:hover {
		background-color: rgb(34, 0, 43);
	}

	.song-image {
		aspect-ratio: 1/1;
		object-fit: cover;
	}

	.song-text {
		padding: 0 10px;
	}

	.title {
		font-size: 20px;
	}

	.artist {
		font-size: 15px;
		color: rgb(171, 171, 171);
	}

	.playing {
		background-color: white;
	}

	.playing .title {
		color: black;
	}

	.playing .artist {
		color: rgb(34, 34, 34);
	}

	.playing:hover {
		background-color: rgb(206, 206, 206) !important;
	}
</style>
