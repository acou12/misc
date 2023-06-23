<script lang="ts">
	import '$lib/style.scss';
	import { items, savedSinceLastWrite } from '$lib/store';
	import type { Item } from '$lib/types';
	import { onMount } from 'svelte';

	let loaded = false;

	const loadItems = () => {
		const savedItems = localStorage.getItem('items');
		if (savedItems !== null) {
			const parsed = JSON.parse(savedItems);
			items.set(parsed as Item[]);
		}
		loaded = true;
	};

	onMount(() => {
		loadItems();

		// window.onbeforeunload = () => true;
	});
</script>

{#if loaded}
	<slot />
{/if}
