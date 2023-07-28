<script context="module" lang="ts">
	export enum GuiMode {
		PLAY,
		EDIT
	}
</script>

<script lang="ts">
	import { debounce } from 'debounce';

	import { onMount } from 'svelte';

	const SCALE = 0.3;

	import youTubePlayer from 'youtube-player';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import type { Entity, Position, Song, ItunesEntity } from '$lib/song';
	import SongVis from '$lib/SongVis.svelte';
	// import { defEntities } from './data';
	import Controls from '$lib/Controls.svelte';

	let player: YouTubePlayer;
	let playing = false;
	let progress: number = 0;
	let duration: number = 0;

	let guiMode = GuiMode.PLAY;

	let entities: Entity[] = [];

	let queue: string[] = [];

	let positionMap: Record<number, Position> = {};

	$: connections = connectionsFromList(queue);

	let currentYoutubeId: string | undefined;

	let panning = false;

	const entityFromYoutubeId = (id: string) =>
		entities.find((entity) =>
			entity.type === 'song'
				? entity.youtubeId === id
				: entity.songs.some((song) => song.youtubeId === id)
		)!;

	const entitySongs = (entity: Entity) => (entity.type === 'song' ? [entity] : entity.songs);

	const connectionsFromList = (queue: string[]) => {
		let result = [];
		for (let i = 0; i < queue.length - 1; i++) {
			const e1 = entityFromYoutubeId(queue[i]).id;
			const e2 = entityFromYoutubeId(queue[i + 1]).id;
			if (e1 !== e2) {
				result.push([e1, e2] as [number, number]);
			}
		}
		return result;
	};

	const randomQueue = (first: Entity) => {
		let remainingEntities = [...entities];
		let entityQueue: Entity[] = [];

		let currentEntity = first;
		let currentPosition = positionMap[currentEntity.id];
		entityQueue.push(currentEntity);
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
			entityQueue.push(currentEntity);
		}

		const result = entityQueue.flatMap(entitySongs).map((song) => song.youtubeId);
		console.log(result);
		return result;
	};

	let draggingId: number | undefined = undefined;

	onMount(() => {
		player = youTubePlayer('player');
		player.on('ready', async (_event) => {
			// await setPlayback(entities.flatMap((e) => (e.type === 'song' ? e : e.songs))[0].youtubeId);
			// pause();
			setInterval(async () => {
				progress = await player.getCurrentTime();
				duration = await player.getDuration();
			}, 100);
		});
		player.on('stateChange', ({ data }) => {
			if (data === 0) {
				skip();
			}
		});

		const savedSongs = localStorage.getItem('entities');
		if (savedSongs === null) {
			entities = [];
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
					switch (guiMode) {
						case GuiMode.PLAY:
							setPlayback(entity.type === 'song' ? entity.youtubeId : entity.songs[0].youtubeId);
							queue = [];
							setTimeout(() => {
								queue = randomQueue(entity);
							}, 2000);
							break;
						case GuiMode.EDIT:
							draggingId = entity.id;
							break;
					}
				}
			}
			if (draggingId === undefined) {
				panning = true;
			}
		});

		document.addEventListener('mouseup', (e) => {
			if (draggingId !== undefined) {
				draggingId = undefined;
			}
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
		let currentIndex = queue.indexOf(currentYoutubeId!);
		let newIndex = currentIndex - 1;
		if (newIndex >= 0) {
			setPlayback(queue[newIndex]);
		} else {
			pause();
		}
	};

	const skip = () => {
		let currentIndex = queue.indexOf(currentYoutubeId!);
		let newIndex = currentIndex + 1;
		if (newIndex < queue.length) {
			setPlayback(queue[newIndex]);
		} else {
			pause();
		}
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

	.songs {
		position: relative;
		transform-origin: top left;
	}
</style>
