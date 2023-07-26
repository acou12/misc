<script lang="ts">
	import { onMount } from 'svelte';

	import youTubePlayer from 'youtube-player';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import type { Position, Song } from '$lib/song';
	import SongVis from '$lib/SongVis.svelte';

	let player: YouTubePlayer;
	let progress: number = 0;
	let duration: number = 0;
	let playing = false;

	let songs: Song[] = [
		{
			id: 'k6jqx9kZgPM',
			name: 'Talk that Talk',
			artist: '트와이스',
			img: 'talk.webp'
		},
		{
			id: '2IA7QExh-NQ',
			name: "Ain't It Fun",
			artist: 'Paramore',
			img: 'fun.webp'
		},
		{
			id: 'qICsQ8lT4Ko',
			name: 'Song for Dan Treacy',
			artist: 'MGMT',
			img: 'congrats.webp'
		},
		{
			id: 'iIH-yP-35cc',
			name: 'American Teen',
			artist: 'Khalid',
			img: 'teen.webp'
		},
		{
			id: 'LUjGtyYEi90',
			name: 'Weird Fishes / Arpeggi',
			artist: 'Radiohead',
			img: 'fishes.webp'
		},
		{
			id: 'UxzSGMYogow',
			name: 'Fxmldr',
			artist: 'Thank You Scientist',
			img: 'fxmldr.webp'
		},
		{
			id: 'z7q9W2PNhJ4',
			name: 'Elephant',
			artist: 'Tame Impala',
			img: 'elephant.webp'
		}
		// {
		// 	id: 'or die',
		// 	name: 'Select Farm',
		// 	artist: 'Please'
		// },
		// {
		// 	id: 'dsaffff',
		// 	name: 'J Berry',
		// 	artist: 'J Berry'
		// }
	];

	let positionMap: Record<string, Position> = Object.assign(
		{},
		...songs.map((song) => ({ [song.id]: { x: 0, y: 0 } }))
	);

	let connections: [string, string][] = [];

	let selectedSongIndex = 0;
	let panning = false;

	const randomizeConnections = () => {
		let tempSongs = [...songs];
		let randomizedSongs = [];

		while (tempSongs.length > 0) {
			let index = Math.floor(Math.random() * tempSongs.length);
			randomizedSongs.push(tempSongs[index]);
			tempSongs.splice(index, 1);
		}

		for (let i = 0; i < randomizedSongs.length - 1; i++) {
			connections = [...connections, [randomizedSongs[i].id, randomizedSongs[i + 1].id]];
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

		let newPositionMap: typeof positionMap = {};

		for (const song of songs) {
			newPositionMap[song.id] = {
				x: Math.random() * 800,
				y: Math.random() * 800
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
