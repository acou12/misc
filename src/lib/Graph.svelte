<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { songById, type Entity, type Song, type SongId } from './entity';
	import type { Position } from './visual';
	import SongVis from './SongVis.svelte';
	import { onMount } from 'svelte';
	import { GuiMode } from '../routes/+page.svelte';

	let draggingId: number | undefined;
	let panning = false;

	export let setPlayback: (songId: SongId) => void;

	export let songs: Writable<Song[]>;
	export let entities: Writable<Entity[]>;
	export let positions: Writable<Record<number, Position>>;
	export let boardScale: Writable<number>;
	export let connections: [number, number][];
	export let currentlyPlayingSong: number | undefined;

	export let guiMode: GuiMode;

	export let infoId: number | undefined;

	onMount(() => {
		const cleanups: (() => void)[] = [];

		const songsElement = document.querySelector('.songs') as HTMLDivElement;

		const addDocumentEvent = <K extends keyof DocumentEventMap>(
			k: K,
			callback: (ev: DocumentEventMap[K]) => void
		) => {
			document.addEventListener(k, callback);
			cleanups.push(() => document.removeEventListener(k, callback));
		};

		addDocumentEvent('mouseup', (e) => {
			if (draggingId !== undefined) {
				draggingId = undefined;
			}
			if (panning) {
				panning = false;
			}
		});

		let mousePos = { x: 0, y: 0 };

		addDocumentEvent('mousemove', (e) => {
			if (draggingId !== undefined) {
				$positions[draggingId].x += e.movementX / $boardScale;
				$positions[draggingId].y += e.movementY / $boardScale;
			} else if (panning) {
				for (const song of $entities) {
					$positions[song.id].x += e.movementX / $boardScale;
					$positions[song.id].y += e.movementY / $boardScale;
				}
			}
			mousePos.x = e.clientX;
			mousePos.y = e.clientY;
		});

		const addEvent = <K extends keyof HTMLElementEventMap>(
			k: K,
			callback: (ev: HTMLElementEventMap[K]) => void
		) => {
			songsElement.addEventListener(k, callback);
			cleanups.push(() => document.removeEventListener(k, callback));
		};

		addEvent('contextmenu', (e) => e.preventDefault());

		addEvent('mousedown', (e) => {
			console.log('test');
			for (const entity of $entities) {
				const position = $positions[entity.id];
				const clickX = (e.clientX - songsElement.getBoundingClientRect().left) / $boardScale;
				const clickY = (e.clientY - songsElement.getBoundingClientRect().top) / $boardScale;

				const entitySize = entity.type === 'single' ? 100 : 200;
				const entityRadius = entitySize / 2;

				if (
					position.x - entityRadius <= clickX &&
					clickX <= position.x + entityRadius &&
					position.y - entityRadius <= clickY &&
					clickY <= position.y + entityRadius
				) {
					if (e.button === 2) {
						if (infoId !== entity.id) {
							infoId = entity.id;
						} else {
							infoId = undefined;
						}
						e.preventDefault();
					} else {
						switch (guiMode) {
							case GuiMode.PLAY:
								if (entity.type === 'single') {
									setPlayback(entity.songId);
								} else if (entity.type === 'album' && entity.songs.length > 0) {
									setPlayback(songById($songs, entity.songs[0]).id);
								}
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

		addEvent('wheel', (e) => {
			if (e.deltaY < 0) {
				$boardScale *= 1.05;
				for (const entity of $entities) {
					$positions[entity.id].x -= (mousePos.x * 0.05) / $boardScale;
					$positions[entity.id].y -= (mousePos.y * 0.05) / $boardScale;
				}
			} else {
				$boardScale /= 1.05;
				for (const entity of $entities) {
					$positions[entity.id].x += (mousePos.x * 0.05) / $boardScale;
					$positions[entity.id].y += (mousePos.y * 0.05) / $boardScale;
				}
			}
			console.log($boardScale);
		});

		return () => cleanups.forEach((callback) => callback());
	});
</script>

<div class="outer-songs">
	<div class="songs" style="transform: scale({$boardScale});">
		<SongVis {songs} {entities} {positions} {connections} {draggingId} {currentlyPlayingSong} />
	</div>
</div>

<style>
	.songs {
		position: absolute;
		transform-origin: top left;
		top: 0;
		left: 0;
		width: 10000vw; /* :/ */
		height: 10000vh;
		overflow: clip;
	}
</style>
