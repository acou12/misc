<script lang="ts">
	import { debounce } from 'debounce';

	import { onMount } from 'svelte';

	import youTubePlayer from 'youtube-player';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import type { Entity, Position, Song, ItunesEntity } from '$lib/song';
	import SongVis from '$lib/SongVis.svelte';
	import { defEntities } from './data';
	import Controls from '$lib/Controls.svelte';

	let player: YouTubePlayer;
	let progress: number = 0;
	let duration: number = 0;
	let playing = false;

	// let defaultSongs: Song[] = [
	// 	{
	// 		id: 'k6jqx9kZgPM',
	// 		name: 'Talk that Talk',
	// 		artist: '트와이스',
	// 		img: 'talk.webp'
	// 	},
	// 	{
	// 		id: '2IA7QExh-NQ',
	// 		name: "Ain't It Fun",
	// 		artist: 'Paramore',
	// 		img: 'fun.webp'
	// 	},
	// 	{
	// 		id: 'qICsQ8lT4Ko',
	// 		name: 'Song for Dan Treacy',
	// 		artist: 'MGMT',
	// 		img: 'congrats.webp'
	// 	},
	// 	{
	// 		id: 'iIH-yP-35cc',
	// 		name: 'American Teen',
	// 		artist: 'Khalid',
	// 		img: 'teen.webp'
	// 	},
	// 	{
	// 		id: 'LUjGtyYEi90',
	// 		name: 'Weird Fishes / Arpeggi',
	// 		artist: 'Radiohead',
	// 		img: 'fishes.webp'
	// 	},
	// 	{
	// 		id: 'UxzSGMYogow',
	// 		name: 'Fxmldr',
	// 		artist: 'Thank You Scientist',
	// 		img: 'fxmldr.webp'
	// 	},
	// 	{
	// 		id: 'z7q9W2PNhJ4',
	// 		name: 'Elephant',
	// 		artist: 'Tame Impala',
	// 		img: 'elephant.webp'
	// 	}
	// 	// {
	// 	// 	id: 'or die',
	// 	// 	name: 'Select Farm',
	// 	// 	artist: 'Please'
	// 	// },
	// 	// {
	// 	// 	id: 'dsaffff',
	// 	// 	name: 'J Berry',
	// 	// 	artist: 'J Berry'
	// 	// }
	// ];

	let entities: Entity[] = [];

	let positionMap: Record<number, Position> = Object.assign(
		{},
		...entities.map((entity) => ({ [entity.id]: { x: 0, y: 0 } }))
	);

	let connections: [number, number][] = [];

	let currentYoutubeId: string | undefined;

	let panning = false;

	const randomizeConnections = () => {
		let remainingEntities = [...entities];
		let resultOrder = [];

		if (remainingEntities.length > 0) {
			let currentEntities = remainingEntities[Math.floor(Math.random() * remainingEntities.length)];
			let currentPosition = positionMap[currentEntities.id];
			resultOrder.push(currentEntities);
			remainingEntities.splice(remainingEntities.indexOf(currentEntities), 1);

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
				currentEntities = remainingEntities.splice(minIndex, 1)[0];
				currentPosition = positionMap[currentEntities.id];
				resultOrder.push(currentEntities);
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
				const clickX = e.clientX - songsElement.getBoundingClientRect().left;
				const clickY = e.clientY - songsElement.getBoundingClientRect().top;

				const entitySize = entity.type === 'song' ? 100 : 200;
				const entityRadius = entitySize / 2;

				if (
					position.x - entityRadius <= clickX &&
					clickX <= position.x + entityRadius &&
					position.y - entityRadius <= clickY &&
					clickY <= position.y + entityRadius
				) {
					draggingId = entity.id;
					connections = [];
				}
			}
			if (draggingId === undefined) {
				panning = true;
			}
		});

		document.addEventListener('mouseup', (e) => {
			if (draggingId !== undefined) {
				draggingId = undefined;
				randomizeConnections();
			}
			if (panning) {
				panning = false;
			}
		});

		document.addEventListener('mousemove', (e) => {
			if (draggingId !== undefined) {
				positionMap[draggingId].x += e.movementX;
				positionMap[draggingId].y += e.movementY;
				debouncedSaveLocations();
			} else if (panning) {
				for (const song of entities) {
					positionMap[song.id].x += e.movementX;
					positionMap[song.id].y += e.movementY;
					debouncedSaveLocations();
				}
			}
		});
	});

	const setPlayback = async (youtubeId: string) => {
		currentYoutubeId = youtubeId;

		// const selectedEntity = entities.find((e) => e.id === selectedEntityId)!;

		// if (selectedEntity.type === 'song') {
		// 	await player.loadVideoById(selectedEntity.youtubeId);
		// } else {
		// 	const subEntity = selectedEntity.songs.find((e) => e.id === selectedSubId)!;
		// 	await player.loadVideoById(subEntity.youtubeId);
		// }

		await player.loadVideoById(currentYoutubeId);

		play();

		// const interval = setInterval(() => {
		// 	player.getCurrentTime().then((time) => (progress = time));
		// 	player.getDuration().then((d) => (duration = d));
		// }, 100);

		// return () => {
		// 	clearInterval(interval);
		// };
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

{#each entities as song, i}
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
{/each}

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

<p>
	{prettySeconds(progress)} / {prettySeconds(duration)}
	<button on:click={togglePlayback}>
		{playing ? 'pause' : 'play'}
	</button>
</p>

<Controls
	{playing}
	favorited={false}
	favorite={noop}
	unFavorite={noop}
	{play}
	{pause}
	{back}
	{skip}
/>

<div class="songs">
	<SongVis {entities} {positionMap} {connections} {draggingId} />
</div>

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
	}
</style>
