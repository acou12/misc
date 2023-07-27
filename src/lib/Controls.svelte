<script lang="ts">
	import { base } from '$app/paths';
	import ControlsButton from './ControlsButton.svelte';

	export let playing = false;
	export let favorited = false;

	export let play: () => void;
	export let pause: () => void;
	export let back: () => void;
	export let skip: () => void;
	export let favorite: () => void;
	export let unFavorite: () => void;

	const toggleFavorite = () => (favorited ? unFavorite() : favorite());
</script>

<div class="controls">
	<ControlsButton path={'super-back'} />
	<ControlsButton path={'back'} on:click={back} />
	{#if playing}
		<ControlsButton path={'pause'} on:click={pause} />
	{:else}
		<ControlsButton path={'play'} on:click={play} />
	{/if}
	<ControlsButton path={'next'} on:click={skip} />
	<ControlsButton path={'super-next'} />
	<ControlsButton path={'tag'} />
	<ControlsButton path={'favorite'} />
</div>

<style>
	.controls {
		display: flex;
	}
</style>
