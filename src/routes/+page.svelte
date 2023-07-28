<script lang="ts">
	import { debounce } from 'debounce';

	import { onMount } from 'svelte';

	const SCALE = 0.25;

	import youTubePlayer from 'youtube-player';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import type { Entity, Position, Song, ItunesEntity } from '$lib/song';
	import SongVis from '$lib/SongVis.svelte';
	import { defEntities } from './data';
	import Controls from '$lib/Controls.svelte';

	let player: YouTubePlayer;
	let playing = false;
	let progress: number = 0;
	let duration: number = 0;

	let entities: Entity[] = [];

	let queue: string[] = [];
	let queueProgress: number | undefined;

	let positionMap: Record<number, Position> = {};

	let connections: [number, number][] = [];

	let currentYoutubeId: string | undefined;

	let panning = false;

	const randomizeConnections = (first: Entity) => {
		let remainingEntities = [...entities];
		let resultOrder = [];

		if (remainingEntities.length > 0) {
			// let currentEntity = remainingEntities[Math.floor(Math.random() * remainingEntities.length)];
			let currentEntity = first;
			let currentPosition = positionMap[currentEntity.id];
			resultOrder.push(currentEntity);
			remainingEntities.splice(remainingEntities.indexOf(currentEntity), 1);

			while (remainingEntities.length > 0) {
				let minIndex = 0;
				let minDistance = Infinity;
				for (let i = 0; i < remainingEntities.length; i++) {
					const otherSong = remainingEntities[i];
					const otherPosition = positionMap[otherSong.id];
					const distance = Math.hypot(
						otherPosition.x - currentPosition.x,
						otherPosition.y - currentPosition.y
					);
					if (distance < minDistance) {
						minDistance = distance;
						minIndex = i;
					}
				}
				currentEntity = remainingEntities.splice(minIndex, 1)[0];
				currentPosition = positionMap[currentEntity.id];
				resultOrder.push(currentEntity);
			}

			connections = [];

			for (let i = 0; i < resultOrder.length - 1; i++) {
				connections = [...connections, [resultOrder[i].id, resultOrder[i + 1].id]];
			}
		}
	};

	let draggingId: number | undefined = undefined;

	onMount(() => {
		player = youTubePlayer('player');
		player.on('ready', (_event) => {
			setPlayback(entities.flatMap((e) => (e.type === 'song' ? e : e.songs))[0].youtubeId);
			setInterval(async () => {
				progress = await player.getCurrentTime();
				duration = await player.getDuration();
			}, 100);
			player.pauseVideo();
			playing = false;
		});
		player.on('stateChange', ({ data }) => {
			if (data === 0) {
				skip();
			}
		});

		const savedSongs = localStorage.getItem('entities');
		if (savedSongs === null) {
			entities = defEntities;
			localStorage.setItem('entities', JSON.stringify(entities));
		} else {
			entities = JSON.parse(savedSongs);
		}

		const savedPositionMap = localStorage.getItem('positionmap');

		if (savedPositionMap === null) {
			let newPositionMap: typeof positionMap = {};

			for (const song of entities) {
				newPositionMap[song.id] = {
					x: Math.random() * 2000,
					y: Math.random() * 2000
				};
			}

			positionMap = newPositionMap;
			localStorage.setItem('positionmap', JSON.stringify(positionMap));
		} else {
			positionMap = JSON.parse(savedPositionMap);
		}

		const center = {
			x: 0,
			y: 0
		};

		for (const key in positionMap) {
			center.x += positionMap[key].x;
			center.y += positionMap[key].y;
		}

		center.x /= Object.keys(positionMap).length;
		center.y /= Object.keys(positionMap).length;

		for (const entity of entities) {
			if (positionMap[entity.id] === undefined) {
				positionMap[entity.id] = { ...center };
			}
		}

		saveLocations();

		const songsElement = document.querySelector('.songs') as HTMLDivElement;

		document.addEventListener('mousedown', (e) => {
			for (const entity of entities) {
				const position = positionMap[entity.id];
				const clickX = (e.clientX - songsElement.getBoundingClientRect().left) / SCALE;
				const clickY = (e.clientY - songsElement.getBoundingClientRect().top) / SCALE;

				const entitySize = entity.type === 'song' ? 100 : 200;
				const entityRadius = entitySize / 2;

				if (
					position.x - entityRadius <= clickX &&
					clickX <= position.x + entityRadius &&
					position.y - entityRadius <= clickY &&
					clickY <= position.y + entityRadius
				) {
					// draggingId = entity.id;
					setPlayback(entity.type === 'song' ? entity.youtubeId : entity.songs[0].youtubeId);
					connections = [];
					setTimeout(() => {
						randomizeConnections(entity);
					}, 2000);
				}
			}
			if (draggingId === undefined) {
				panning = true;
			}
		});

		document.addEventListener('mouseup', (e) => {
			// if (draggingId !== undefined) {
			// 	draggingId = undefined;
			// 	randomizeConnections();
			// }
			if (panning) {
				panning = false;
			}
		});

		document.addEventListener('mousemove', (e) => {
			if (draggingId !== undefined) {
				positionMap[draggingId].x += e.movementX / SCALE;
				positionMap[draggingId].y += e.movementY / SCALE;
				debouncedSaveLocations();
			} else if (panning) {
				for (const song of entities) {
					positionMap[song.id].x += e.movementX / SCALE;
					positionMap[song.id].y += e.movementY / SCALE;
					debouncedSaveLocations();
				}
			}
		});
	});

	const setPlayback = async (youtubeId: string) => {
		currentYoutubeId = youtubeId;

		await player.loadVideoById(currentYoutubeId);

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

	const back = () => {
		const allSongs = entities.flatMap((e) => (e.type === 'song' ? e : e.songs));
		const currentIndex = allSongs.findIndex((song) => song.youtubeId === currentYoutubeId);
		const nextIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
		setPlayback(allSongs[nextIndex].youtubeId);
	};

	const skip = () => {
		const allSongs = entities.flatMap((e) => (e.type === 'song' ? e : e.songs));
		const currentIndex = allSongs.findIndex((song) => song.youtubeId === currentYoutubeId);
		const nextIndex = (currentIndex + 1) % allSongs.length;
		setPlayback(allSongs[nextIndex].youtubeId);
	};

	const setPlaybackTime = (t: number) => {
		player.seekTo(t, true);
		progress = t;
	};

	const togglePlayback = () => {
		if (playing) {
			pause();
		} else {
			play();
		}
	};

	let prettySeconds = (totalSeconds: number) => {
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.floor(totalSeconds % 60);
		const secondsDisplay = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${minutes}:${secondsDisplay}`;
	};

	let newSongInput = '';
	let searchEntities: ItunesEntity[] = [];

	const debouncedSearchSongs = debounce(async () => {
		const itunesData = (await fetch(
			`https://itunes.apple.com/search?term=${encodeURI(newSongInput)}&country=US&entity=song,album`
		).then((it) => it.json())) as {
			results: ItunesEntity[];
		};

		searchEntities = itunesData.results;
	}, 500);

	const saveLocations = () => {
		localStorage.setItem('positionmap', JSON.stringify(positionMap));
	};

	const debouncedSaveLocations = debounce(saveLocations, 5000);

	const addEntity = (entity: Entity) => {
		entities = [...entities, entity];
		localStorage.setItem('entities', JSON.stringify(entities));
		positionMap[entity.id] = {
			x: Math.random() * 1600,
			y: Math.random() * 1600
		};
		saveLocations();
	};

	const getYoutubeIdFromTrackUrl = async (trackViewUrl: string): Promise<string> => {
		const data = await fetch(
			`https://api.song.link/v1-alpha.1/links?url=${encodeURI(
				trackViewUrl
			)}&userCountry=US&songIfSingle=true`
		).then((it) => it.json());
		const id: string = data.linksByPlatform['youtube'].entityUniqueId.split('::')[1];
		return id;
	};

	const addItunesEntity = async (searchEntity: ItunesEntity) => {
		newSongInput = '';
		searchEntities = [];
		let entity: Entity;
		if (searchEntity.wrapperType === 'track') {
			const youtubeId = await getYoutubeIdFromTrackUrl(searchEntity.trackViewUrl);
			entity = {
				type: 'song',
				id: searchEntity.trackId,
				youtubeId,
				entity: searchEntity
			};
		} else {
			// (searchSong.wrapperType === 'album')
			const songs: Song[] = [];

			const data = (await fetch(
				`https://itunes.apple.com/lookup?id=${searchEntity.collectionId}&entity=song`
			).then((it) => it.json())) as { results: ItunesEntity[] };

			let total = data.results.length;
			let i = 0;

			for (let itunesEntity of data.results) {
				if (itunesEntity.wrapperType === 'track') {
					const song: Song = {
						id: itunesEntity.trackId,
						youtubeId: await getYoutubeIdFromTrackUrl(itunesEntity.trackViewUrl)
					};
					i++;
					console.log(`${searchEntity.collectionName}: ${i} / ${total}`);
					songs.push(song);
				}
			}

			entity = {
				type: 'album',
				id: searchEntity.collectionId,
				entity: searchEntity,
				songs
			};
		}
		addEntity(entity);
	};

	// TODO: REMOVE
	const noop = () => {};
</script>

<div id="player" />

<!-- {#each entities as song, i}
	<div class="song" class:playing={false}>
		<button
			on:click={() => {
				setPlayback(song.type === 'song' ? song.youtubeId : song.songs[0].youtubeId);
			}}
		>
			{song.entity.wrapperType === 'track' ? song.entity.trackName : song.entity.collectionName} - {song
				.entity.artistName}
		</button>
	</div>
{/each} -->

<!--
Add song:
<form>
	<input type="text" bind:value={newSongInput} on:input={debouncedSearchSongs} />
</form>
<ul>
	{#each searchEntities as searchEntity}
		<button on:click={() => addItunesEntity(searchEntity)}>
			{searchEntity.artistName} - {searchEntity.wrapperType === 'track'
				? searchEntity.trackName
				: searchEntity.collectionName} - {searchEntity.wrapperType}
		</button>
	{/each}
</ul> 
-->

<!-- 
<p>
	{prettySeconds(progress)} / {prettySeconds(duration)}
	<button on:click={togglePlayback}>
		{playing ? 'pause' : 'play'}
	</button>
</p> -->

<div class="songs" style="transform: scale({SCALE});">
	<SongVis {entities} {positionMap} {connections} {draggingId} {currentYoutubeId} />
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

	.songs {
		position: relative;
		transform-origin: top left;
	}
</style>
