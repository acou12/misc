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

	import { songById, type Entity, type Song, type SongId, type Collection } from '$lib/entity';
	import { addTask, deleteTask, updateTask, type Task } from '$lib/tasks';
	import type { Position } from '$lib/visual';
	import TrackListing from '$lib/TrackListing.svelte';
	import type { YoutubePlaylistResponse } from './list/+server';
	import type { YoutubePlaylistInfoResponse } from './info/+server';
	import { smartSyncStore } from '$lib/store';
	import { randomId, randomPosition } from '$lib/util';
	import Graph from '$lib/Graph.svelte';
	import List from '$lib/List.svelte';
	import { demoEntities, demoPositions } from './data';

	let player: YouTubePlayer;
	let playing = false;
	let progress: number = 0;
	let duration: number = 0;

	let guiMode = GuiMode.PLAY;

	let songs: Writable<Song[]> = writable([]);
	let entities: Writable<Entity[]> = writable([]);
	let positions: Writable<Record<number, Position>> = writable({});
	let boardScale: Writable<number> = writable(0);

	let queue: SongId[] = [];

	$: connections = [];

	let currentlyPlayingSong: SongId | undefined;

	let tasks: Writable<Task[]> = writable([]);

	let viewType: 'graph' | 'list' = 'graph';
	onMount(() => {
		const cleanups: (() => void)[] = [];

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
		boardScale = smartSyncStore('velvet-scale', 0.3, 1000);

		for (const entity of $entities) {
			if ($positions[entity.id] === undefined) {
				$positions[entity.id] = randomPosition();
			}
		}

		// for (const entity of $entities) {
		// 	if (entity.type === 'album') {
		// 		const oldEntity = demoEntities.find(
		// 			(it) => it.type === 'album' && it.entity.collectionName === entity.name
		// 		);
		// 		if (oldEntity !== undefined) {
		// 			$positions[entity.id] = demoPositions[oldEntity.id];
		// 		}
		// 	}
		// }

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

		$tasks = updateTask($tasks, taskId, `Done! "${newAlbum.name}" has been added.`);

		console.log(listData);
	};
</script>

<div id="player" />

<div class="view" class:noscroll={viewType === 'graph'}>
	{#if viewType === 'list'}
		<!-- <form on:submit|preventDefault={addNewSong}>
			<input
				type="text"
				placeholder="add album: enter a youtube link..."
				bind:value={newSongInput}
			/>
		</form> -->
		<List
			{songs}
			{entities}
			{positions}
			{connections}
			{tasks}
			{setPlayback}
			bind:currentlyPlayingSong
			bind:infoId
			bind:guiMode
		/>
	{:else}
		<Graph
			{songs}
			{entities}
			{positions}
			{boardScale}
			{connections}
			{setPlayback}
			bind:currentlyPlayingSong
			bind:infoId
			bind:guiMode
		/>
	{/if}
</div>

<button class="view-switch" on:click={() => (viewType = viewType === 'graph' ? 'list' : 'graph')}>
	switch view
</button>

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

<div class="tasks">
	{#each $tasks as task, i}
		<div class="task" transition:scale={{}}>
			<div class="message">
				{@html task.message}
			</div>

			<div class="close">
				<button
					on:click={() => {
						$tasks = deleteTask($tasks, task.id);
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

<style>
	#player {
		display: none;
	}

	.playing button {
		background-color: black;
		color: white;
	}

	.outer-songs {
		position: relative;
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

	.view-switch {
		position: absolute;
		top: 0;
		left: 0;
	}

	.view {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		overflow: scroll;
	}

	.view.noscroll {
		overflow: clip;
	}
</style>
