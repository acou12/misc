<script context="module" lang="ts">
	export enum GuiMode {
		PLAY,
		EDIT
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import youTubePlayer from 'youtube-player';
	import type { YouTubePlayer } from 'youtube-player/dist/types';

	import Controls from '$lib/Controls.svelte';
	import SongVis from '$lib/SongVis.svelte';

	import {
		songById,
		type Entity,
		type Song,
		type SongId,
		entityById,
		type Collection
	} from '$lib/entity';
	import { addTask, deleteTask, updateTask, type Task } from '$lib/tasks';
	import type { Position } from '$lib/visual';
	import TrackListing from '$lib/TrackListing.svelte';
	import type { YoutubePlaylistResponse } from './list/+server';
	import type { YoutubePlaylistInfoResponse } from './info/+server';
	import { smartSyncStore } from '$lib/store';
	import { randomId } from '$lib/util';

	let boardScale = 0.3;

	let player: YouTubePlayer;
	let playing = false;
	let progress: number = 0;
	let duration: number = 0;

	let guiMode = GuiMode.PLAY;

	let songs: Writable<Song[]> = writable([]);
	let entities: Writable<Entity[]> = writable([]);
	let positions: Writable<Record<number, Position>> = writable({});

	let queue: SongId[] = [];

	$: connections = [];

	let currentlyPlayingSong: SongId | undefined;

	let panning = false;

	let tasks: Task[] = [];

	const randomPosition = (): Position => ({
		x: Math.random() * 1000,
		y: Math.random() * 1000
	});

	let draggingId: number | undefined = undefined;

	onMount(() => {
		let cleanups: (() => void)[] = [];

		let setAndLaterClearInterval: typeof setInterval = (...params) => {
			let interval = setInterval(...params);
			cleanups.push(() => clearInterval(interval));
			return interval;
		};

		player = youTubePlayer('player');
		player.on('ready', async (_event) => {
			setAndLaterClearInterval(async () => {
				progress = await player.getCurrentTime();
				duration = await player.getDuration();
			}, 100);
		});
		player.on('stateChange', ({ data }) => {
			if (data === 0) {
				skip();
			}
		});

		songs = smartSyncStore('velvet-songs', []);
		entities = smartSyncStore('velvet-entities', []);
		positions = smartSyncStore('velvet-positions', {}, 1000);

		for (const entity of $entities) {
			if ($positions[entity.id] === undefined) {
				$positions[entity.id] = randomPosition();
			}
		}

		const songsElement = document.querySelector('.songs') as HTMLDivElement;

		const addEvent = <K extends keyof DocumentEventMap>(
			k: K,
			callback: (ev: DocumentEventMap[K]) => void
		) => {
			document.addEventListener(k, callback);
			cleanups.push(() => document.removeEventListener(k, callback));
		};

		addEvent('contextmenu', (e) => e.preventDefault());

		addEvent('mousedown', (e) => {
			for (const entity of $entities) {
				const position = $positions[entity.id];
				const clickX = (e.clientX - songsElement.getBoundingClientRect().left) / boardScale;
				const clickY = (e.clientY - songsElement.getBoundingClientRect().top) / boardScale;

				const entitySize = entity.type === 'single' ? 100 : 200;
				const entityRadius = entitySize / 2;

				if (
					position.x - entityRadius <= clickX &&
					clickX <= position.x + entityRadius &&
					position.y - entityRadius <= clickY &&
					clickY <= position.y + entityRadius
				) {
					if (e.button === 2) {
						infoId = entity.id;
						e.preventDefault();
					} else {
						switch (guiMode) {
							case GuiMode.PLAY:
								if (entity.type === 'single') {
									setPlayback(entity.songId);
								} else if (entity.type === 'album' && entity.songs.length > 0) {
									setPlayback(songById($songs, entity.songs[0]).id);
								}
								queue = [];
								break;
							case GuiMode.EDIT:
								draggingId = entity.id;
								break;
						}
					}
				}
			}
			if (draggingId === undefined) {
				panning = true;
			}
		});

		addEvent('mouseup', (e) => {
			if (draggingId !== undefined) {
				draggingId = undefined;
			}
			if (panning) {
				panning = false;
			}
		});

		let mousePos = { x: 0, y: 0 };

		addEvent('mousemove', (e) => {
			if (draggingId !== undefined) {
				$positions[draggingId].x += e.movementX / boardScale;
				$positions[draggingId].y += e.movementY / boardScale;
			} else if (panning) {
				for (const song of $entities) {
					$positions[song.id].x += e.movementX / boardScale;
					$positions[song.id].y += e.movementY / boardScale;
				}
			}
			mousePos.x = e.clientX;
			mousePos.y = e.clientY;
		});

		addEvent('wheel', (e) => {
			if (e.deltaY < 0) {
				boardScale *= 1.05;
				for (const entity of $entities) {
					$positions[entity.id].x -= (mousePos.x * 0.05) / boardScale;
					$positions[entity.id].y -= (mousePos.y * 0.05) / boardScale;
				}
			} else {
				boardScale /= 1.05;
				for (const entity of $entities) {
					$positions[entity.id].x += (mousePos.x * 0.05) / boardScale;
					$positions[entity.id].y += (mousePos.y * 0.05) / boardScale;
				}
			}
		});

		return () => cleanups.forEach((callback) => callback());
	});

	const setPlayback = async (songId: SongId) => {
		currentlyPlayingSong = songId;

		await player.loadVideoById(songById($songs, currentlyPlayingSong).youtubeId);

		play();
	};

	const play = () => {
		playing = true;
		player.playVideo();
	};

	const pause = () => {
		playing = false;
		player.pauseVideo();
	};

	const back = () => {};

	const skip = () => {
		if (currentlyPlayingSong !== undefined) {
			const currentAlbum = $entities.find(
				(entity) =>
					entity.type === 'album' && entity.songs.some((song) => song === currentlyPlayingSong)
			) as (Entity & { type: 'album' }) | undefined;
			if (currentAlbum !== undefined) {
				const index = currentAlbum.songs.indexOf(currentlyPlayingSong);
				const nextIndex = index + 1;
				if (nextIndex < currentAlbum.songs.length) {
					console.log(currentAlbum.songs[nextIndex]);
					setPlayback(currentAlbum.songs[nextIndex]);
				}
			} else {
				pause();
			}
		}
	};

	const setPlaybackTime = (t: number) => {
		player.seekTo(t, true);
	};

	// const search = async (term: string) => {
	// 	const itunesData = (await fetch(
	// 		`https://itunes.apple.com/search?term=${term}&country=US&entity=album`
	// 	).then((it) => it.json())) as {
	// 		results: ItunesEntity[];
	// 	};

	// 	return itunesData.results;
	// };

	let infoId: number | undefined;

	// TODO: REMOVE
	const noop = () => {};

	let newSongInput = '';

	const addNewSong = async () => {
		const songUrl = newSongInput;
		newSongInput = '';

		const [newTasks, taskId] = addTask(tasks, 'Adding...');
		tasks = newTasks;

		const FAILED_MESSAGE = 'Add failed. Please enter a link to a youtube playlist.';

		if (!songUrl.includes('?')) {
			tasks = updateTask(tasks, taskId, FAILED_MESSAGE);
			return;
		}

		const queryParamsRaw = songUrl.split('?')[1];
		const queryParams = new URLSearchParams(queryParamsRaw);

		if (!queryParams.has('list')) {
			tasks = updateTask(tasks, taskId, FAILED_MESSAGE);
			return;
		}

		const infoData = (await fetch(`/info?id=${queryParams.get('list')}`).then((it) =>
			it.json()
		)) as YoutubePlaylistInfoResponse;

		const albumData = infoData.items[0].snippet;

		const albumTitle = albumData.title;
		const artist = albumData.channelTitle;
		const artwork = Object.entries(albumData.thumbnails)[0][1].url;

		const listData = (await fetch(`/list?list=${queryParams.get('list')}`).then((it) =>
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

		tasks = updateTask(tasks, taskId, `Done! "${newAlbum.name}" has been added.`);

		console.log(listData);
	};
</script>

<div id="player" />

<form on:submit|preventDefault={addNewSong}>
	<input type="text" placeholder="add album: enter a youtube link..." bind:value={newSongInput} />
</form>

<div class="songs" style="transform: scale({boardScale});">
	<SongVis {songs} {entities} {positions} {connections} {draggingId} {currentlyPlayingSong} />
</div>

<div class="tasks">
	{#each tasks as task, i}
		<div class="task" transition:scale={{}}>
			<div class="message">
				{@html task.message}
			</div>

			<div class="close">
				<button
					on:click={() => {
						tasks = deleteTask(tasks, task.id);
					}}
				>
					x
				</button>
			</div>
		</div>
	{/each}
</div>

<Controls
	{playing}
	favorited={false}
	favorite={noop}
	unFavorite={noop}
	{play}
	{pause}
	{back}
	{skip}
	{progress}
	{duration}
	bind:guiMode
	{setPlaybackTime}
/>

{#if infoId !== undefined}
	<TrackListing
		{songs}
		{entities}
		deleteMe={() => {
			$entities = $entities.filter((entity) => entity.id !== infoId);
			infoId = undefined;
		}}
		id={infoId}
		{setPlayback}
		{currentlyPlayingSong}
	/>
{/if}

<style>
	#player {
		display: none;
	}

	.playing button {
		background-color: black;
		color: white;
	}

	.songs {
		position: relative;
		transform-origin: top left;
	}

	.new-song {
		outline: none;
		border: none;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
	}

	.tasks {
		position: fixed;
		top: 0;
		right: 0;
	}

	.task {
		width: 300px;
		background-color: black;
		color: white;
		padding: 15px;
		border-radius: 10px;
		margin: 5px;

		display: flex;
	}

	.task .message {
		margin-right: auto;
	}

	input {
		background-color: black;
		color: white;
		border: none;
		outline: none;
	}
</style>
