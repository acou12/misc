<script lang="ts">
	import { debounce } from 'debounce';

	import { onMount } from 'svelte';

	import youTubePlayer from 'youtube-player';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import type { Position, Song } from '$lib/song';
	import SongVis from '$lib/SongVis.svelte';

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

	let songs: Song[] = [];

	let positionMap: Record<string, Position> = Object.assign(
		{},
		...songs.map((song) => ({ [song.id]: { x: 0, y: 0 } }))
	);

	let connections: [string, string][] = [];

	let selectedSongIndex = 0;
	let panning = false;

	const randomizeConnections = () => {
		let remainingSongs = [...songs];
		let resultOrder = [];

		if (remainingSongs.length > 0) {
			let currentSong = remainingSongs[Math.floor(Math.random() * remainingSongs.length)];
			let currentPosition = positionMap[currentSong.id];
			resultOrder.push(currentSong);
			remainingSongs.splice(remainingSongs.indexOf(currentSong), 1);

			while (remainingSongs.length > 0) {
				let minIndex = 0;
				let minDistance = Infinity;
				for (let i = 0; i < remainingSongs.length; i++) {
					const otherSong = remainingSongs[i];
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
				currentSong = remainingSongs.splice(minIndex, 1)[0];
				currentPosition = positionMap[currentSong.id];
				resultOrder.push(currentSong);
			}

			connections = [];

			for (let i = 0; i < resultOrder.length - 1; i++) {
				connections = [...connections, [resultOrder[i].id, resultOrder[i + 1].id]];
			}
		}
	};

	let draggingId: string | undefined = undefined;

	onMount(() => {
		player = youTubePlayer('player');
		player.on('ready', (_event) => {
			setSong(0);
			player.pauseVideo();
			playing = false;
		});
		player.on('stateChange', ({ data }) => {
			if (data === 0) {
				setSong((selectedSongIndex + 1) % songs.length);
			}
		});

		const savedSongs = localStorage.getItem('songs');
		if (savedSongs == null) {
			songs = [];
			localStorage.setItem('songs', JSON.stringify(songs));
		} else {
			songs = JSON.parse(savedSongs);
		}

		let newPositionMap: typeof positionMap = {};

		for (const song of songs) {
			newPositionMap[song.id] = {
				x: Math.random() * 2000,
				y: Math.random() * 2000
			};
		}

		positionMap = newPositionMap;

		const songsElement = document.querySelector('.songs') as HTMLDivElement;

		document.addEventListener('mousedown', (e) => {
			for (const song of songs) {
				const position = positionMap[song.id];
				const clickX = e.clientX - songsElement.getBoundingClientRect().left;
				const clickY = e.clientY - songsElement.getBoundingClientRect().top;

				if (
					position.x <= clickX &&
					clickX <= position.x + 200 &&
					position.y <= clickY &&
					clickY <= position.y + 200
				) {
					draggingId = song.id;
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
			} else if (panning) {
				for (const song of songs) {
					positionMap[song.id].x += e.movementX;
					positionMap[song.id].y += e.movementY;
				}
			}
		});
	});

	const setSong = (index: number) => {
		selectedSongIndex = index;
		player.loadVideoById(songs[selectedSongIndex].id);
		playing = true;

		const interval = setInterval(() => {
			player.getCurrentTime().then((time) => (progress = time));
			player.getDuration().then((d) => (duration = d));
		}, 100);

		return () => {
			clearInterval(interval);
		};
	};

	const togglePlayback = () => {
		if (playing) {
			playing = false;
			player.pauseVideo();
		} else {
			playing = true;
			player.playVideo();
		}
	};

	let prettySeconds = (totalSeconds: number) => {
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.floor(totalSeconds % 60);
		const secondsDisplay = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${minutes}:${secondsDisplay}`;
	};

	type ItunesSong = {
		artistName: string;
		collectionName: string;
		trackName: string;
		trackViewUrl: string;
		artworkUrl100: string;
	};

	let newSongInput = '';
	let searchSongs: ItunesSong[] = [];

	const debouncedSearchSongs = debounce(async () => {
		const itunesData = (await fetch(
			`https://itunes.apple.com/search?term=${encodeURI(newSongInput)}&country=US&entity=song`
		).then((it) => it.json())) as {
			results: ItunesSong[];
		};

		searchSongs = itunesData.results;
	}, 500);
</script>

<div id="player" />

{#each songs as song, i}
	<div class="song" class:playing={i === selectedSongIndex}>
		<button
			on:click={() => {
				setSong(i);
			}}
			on:keydown={() => {
				setSong(i);
			}}
		>
			{song.artist} - {song.name}
		</button>
	</div>
{/each}

Add song:
<form
	on:submit|preventDefault={async () => {
		const data = await (await fetch(`/search?search=${newSongInput}`)).json();
		songs = [
			...songs,
			{
				id: data.id,
				name: data.data.trackName,
				artist: data.data.artistName,
				img: data.data.artworkUrl100
			}
		];
		localStorage.setItem('songs', JSON.stringify(songs));
		positionMap[data.id] = {
			x: 0,
			y: 0
		};
		newSongInput = '';
	}}
>
	<input type="text" bind:value={newSongInput} on:input={debouncedSearchSongs} />
</form>
<ul>
	{#each searchSongs as searchSong}
		<li
			on:click={async () => {
				fetch(
					`https://api.song.link/v1-alpha.1/links?url=${encodeURI(
						searchSong.trackViewUrl
					)}&userCountry=US&songIfSingle=true`
				)
					.then((it) => it.json())
					.then((it) => alert(JSON.stringify(it)));
			}}
		>
			{searchSong.artistName} - {searchSong.trackName} - {searchSong.trackViewUrl}
		</li>
	{/each}
</ul>

<p>
	{prettySeconds(progress)} / {prettySeconds(duration)}
	<button on:click={togglePlayback}>
		{playing ? 'pause' : 'play'}
	</button>
</p>

<div class="songs">
	<SongVis {songs} {positionMap} {connections} {draggingId} />
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
