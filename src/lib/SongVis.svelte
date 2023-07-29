<script lang="ts">
	import { getEntityName, type Entity, type Position, type SongData } from './song';
	import { fade } from 'svelte/transition';

	export let entities: Entity[];
	export let positionMap: Record<number, Position>;
	export let connections: [number, number][];
	export let draggingId: number | undefined;
	export let currentYoutubeId: string | undefined;

	$: currentEntityId =
		currentYoutubeId === undefined
			? undefined
			: entities.find((e) =>
					e.type === 'song'
						? e.youtubeId === currentYoutubeId
						: e.songs.some((s) => s.youtubeId === currentYoutubeId)
			  )!.id;

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
			style="transform: translate({positionMap[connection[0]].x}px, {positionMap[connection[0]]
				.y}px) rotate({angle(connection, positionMap)}rad); width: {distance(
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
		alt="{entity.entity.artistName} - {getEntityName(entity)}"
		draggable="false"
		class="entity"
		class:song={entity.type === 'song'}
		class:album={entity.type === 'album'}
		style="transform: translate(calc({positionMap[entity.id].x}px - 50%), calc({positionMap[
			entity.id
		].y}px - 50%)); "
		class:selected={draggingId === entity.id}
		class:playing={entity.id === currentEntityId}
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

	.entity {
		position: absolute;
		background-color: black;
		color: white;
		touch-action: none;
		user-select: none;
		transition: outline 0.2s;
		outline: solid transparent 0px;
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
