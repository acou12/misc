<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import {
		entityById,
		type Entity,
		type EntityId,
		type SongId,
		songById,
		type Song
	} from '$lib/entity';

	export let entities: Writable<Entity[]>;
	export let songs: Writable<Song[]>;
	export let id: EntityId;
	export let currentlyPlayingSong: SongId | undefined;
	export let deleteMe: () => void;
	export let setPlayback: (songId: SongId) => Promise<void>;

	$: entity = entityById($entities, id);
</script>

<div class="track-listing">
	<img src={entity.artworkUrl} alt={entity.artist + ' - ' + entity.name} />
	<div class="text">
		<h2>
			{entity.name}
		</h2>
		<h3>
			{entity.artist}
		</h3>
		<div class="controls">
			<button on:click={deleteMe}>Delete</button>
		</div>
		<hr />
		{#if entity.type === 'album'}
			{#each entity.songs as songId, i (songId)}
				<div class="song-outer">
					<button
						class="song"
						class:selected={songId === currentlyPlayingSong}
						on:click={() => setPlayback(songId)}
					>
						{i + 1}. {songById($songs, songId).name}
					</button>
				</div>
			{/each}
		{/if}
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
