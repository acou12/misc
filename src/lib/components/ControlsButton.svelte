<script lang="ts">
	import { base } from '$app/paths';

	export let path: string;
	export let size = 50;
	export let style = '';
</script>

<button on:click {style}>
	<img src="{base}/icons/{path}.svg" style="width: {size}px;" alt="" />
</button>

<style>
	button {
		display: block;
		background-color: transparent;
		outline: none;
		border: none;
		border-radius: 5px;
	}

	button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	button:active {
		background-color: rgba(255, 255, 255, 0.4);
	}
</style>
