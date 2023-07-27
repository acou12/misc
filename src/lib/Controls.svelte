<script lang="ts">
	import { base } from '$app/paths';
	import ControlsButton from './ControlsButton.svelte';

	let playing = false;
	let favorited = false;
</script>

<div class="controls">
	<ControlsButton path={'super-back'} />
	<ControlsButton path={'back'} />
	{#if playing}
		<ControlsButton path={'pause'} on:click={() => (playing = false)} />
	{:else}
		<ControlsButton path={'play'} on:click={() => (playing = true)} />
	{/if}
	<ControlsButton path={'next'} />
	<ControlsButton path={'super-next'} />
	<ControlsButton path={'tag'} />
	<ControlsButton path={'favorite'} />
</div>

<style>
	.controls {
		display: flex;
	}
</style>
