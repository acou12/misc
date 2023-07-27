<script lang="ts">
	import type { Entity, Position, Song } from './song';
	import { fade } from 'svelte/transition';

	export let entities: Entity[];
	export let positionMap: Record<number, Position>;
	export let connections: [number, number][];
	export let draggingId: number | undefined;

	const distance = (connection: [number, number], positionMap: Record<number, Position>) => {
		const p1 = positionMap[connection[0]];
		const p2 = positionMap[connection[1]];
		return Math.hypot(p1.x - p2.x, p1.y - p2.y);
	};

	const angle = (connection: [number, number], positionMap: Record<number, Position>) => {
		const p1 = positionMap[connection[0]];
		const p2 = positionMap[connection[1]];
		return Math.atan2(p2.y - p1.y, p2.x - p1.x);
	};
</script>

{#each connections as connection, i}
	<div class="connection-wrap">
		<div
			class="connection"
			style="transform: translate({positionMap[connection[0]].x + 100}px, {positionMap[
				connection[0]
			].y + 100}px) rotate({angle(connection, positionMap)}rad); width: {distance(
				connection,
				positionMap
			)}px; animation-delay: {i * 0.02}s;"
			out:fade={{ duration: 200 }}
		/>
	</div>
{/each}
{#each entities as entity}
	<img
		src={entity.entity.artworkUrl100}
		alt="{entity.entity.artistName} - {entity.entity.wrapperType === 'track'
			? entity.entity.trackName
			: entity.entity.collectionName}"
		draggable="false"
		class="song"
		style="transform: translate({positionMap[entity.id].x}px, {positionMap[entity.id].y}px); "
		class:selected={draggingId === entity.id}
	/>
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

	.song {
		position: absolute;
		background-color: black;
		color: white;
		touch-action: none;
		user-select: none;
		border-radius: 30px;
		width: 200px;
		height: 200px;
		transition: outline 0.2s;
		outline: solid transparent 0px;
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

	.selected {
		outline: solid rgb(255, 154, 243) 10px;
	}
</style>
