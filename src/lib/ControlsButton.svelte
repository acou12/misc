<script lang="ts">
	import { base } from '$app/paths';

	export let path: string;
</script>

<button on:click>
	<img src="{base}/icons/{path}.svg" alt="" />
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
