<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getEntityName, entitySongs, EntityArray } from './entity';

	export let entities: EntityArray;
	export let id: number;
	export let currentYoutubeId: string | undefined;
	export let deleteMe: () => void;
	export let setPlayback: (youtubeId: string, sendToPeers?: boolean) => Promise<void>;

	$: entity = entities.getEntity(id);
</script>

<div class="track-listing" transition:fade={{}}>
	<img
		src={$entity.entity.artworkUrl100}
		alt={$entity.entity.artistName + ' - ' + getEntityName($entity)}
	/>
	<div class="text">
		<h2>
			{getEntityName($entity)}
		</h2>
		<h3>
			{$entity.entity.artistName}
		</h3>
		<div class="controls">
			<button on:click={deleteMe}>Delete</button>
		</div>
		<hr />
		{#each entitySongs($entity) as song, i (song.id)}
			<div class="song-outer">
				<button
					class="song"
					class:selected={song.youtubeId === currentYoutubeId}
					on:click={() => setPlayback(song.youtubeId)}
				>
					{i + 1}. {song.entity.trackName}
				</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.track-listing {
		position: absolute;
		top: 0px;
		right: 0px;
		width: 25vw;
		height: 70vh;
		/* background-color: rgb(0, 0, 0, 0.5); */
		padding: 20px;
	}

	.track-listing img {
		position: absolute;
		left: 0px;
		top: 0px;
		height: 100%;
		width: 100%;
		object-fit: cover;
		filter: blur(30px);
	}

	.track-listing .text {
		position: relative;
	}

	.song {
		/* background-color: transparent; */
		padding: 5px;
		border-radius: 5px;
		transition: background-color 0.2s, color 0.2s;
	}

	.selected {
		background-color: white;
		color: black;
	}
</style>
