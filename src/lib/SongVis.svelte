<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Entity, Song, SongId } from './entity';
	import { fade } from 'svelte/transition';
	import type { Position } from './visual';

	export let songs: Writable<Song[]>;
	export let entities: Writable<Entity[]>;
	export let positions: Writable<Record<number, Position>>;
	export let connections: [number, number][];
	export let draggingId: number | undefined;
	export let currentlyPlayingSong: SongId | undefined;

	const distance = (connection: [number, number], positions: Record<number, Position>) => {
		const p1 = positions[connection[0]];
		const p2 = positions[connection[1]];
		return Math.hypot(p1.x - p2.x, p1.y - p2.y);
	};

	const angle = (connection: [number, number], positions: Record<number, Position>) => {
		const p1 = positions[connection[0]];
		const p2 = positions[connection[1]];
		return Math.atan2(p2.y - p1.y, p2.x - p1.x);
	};
</script>

{#each connections as connection, i}
	<div class="connection-wrap">
		<div
			class="connection"
			style="transform: translate({$positions[connection[0]].x}px, {$positions[connection[0]]
				.y}px) rotate({angle(connection, $positions)}rad); width: {distance(
				connection,
				$positions
			)}px; animation-delay: {i * 0.02}s;"
			out:fade={{ duration: 200 }}
		/>
	</div>
{/each}
{#each $entities as entity (entity.id)}
	<div class="img-wrapper">
		<img
			src={entity.artworkUrl}
			alt="{entity.artist} - {entity.name}"
			draggable="false"
			class="entity"
			class:song={entity.type === 'single'}
			class:album={entity.type === 'album'}
			style="transform: translate(calc({$positions[entity.id].x}px - 50%), calc({$positions[
				entity.id
			].y}px - 50%)); "
			class:selected={draggingId === entity.id}
			class:playing={entity.type === 'single'
				? entity.songId === currentlyPlayingSong
				: entity.songs.some((songId) => songId === currentlyPlayingSong)}
		/>
	</div>
{/each}

<style>
	@keyframes fadein {
		from {
			opacity: 0;
			/* transform: scaleX(0); */
		}

		to {
			opacity: 1;
			/* transform: scaleX(1); */
		}
	}

	@keyframes scalein {
		from {
			transform: scaleX(0) scaleY(0);
		}

		to {
			transform: scaleX(1) scaleY(1);
		}
	}

	.img-wrapper {
		transform-origin: center;
		animation: scalein 1s both;
	}

	.entity {
		position: absolute;
		background-color: black;
		color: white;
		touch-action: none;
		user-select: none;
		transition: outline 0.2s;
		outline: solid transparent 0px;
		object-fit: cover;
	}

	.song {
		border-radius: 100%;
		width: 100px;
		height: 100px;
	}

	.album {
		border-radius: 30px;
		width: 200px;
		height: 200px;
	}

	.connection {
		position: absolute;
		height: 20px;
		background-color: rgb(255, 206, 241);
		/* border: double 2px red; */
		filter: blur(3px);
		transform-origin: 0 0;
		animation: fadein 0.5s both;
	}

	.entity:hover {
		outline: solid rgb(255, 255, 255) 10px;
	}

	.selected {
		outline: solid rgb(255, 154, 243) 10px !important;
	}

	.playing {
		outline: solid rgb(251, 255, 0) 10px;
	}
</style>
