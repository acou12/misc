<script lang="ts">
	import '$lib/style.scss';
	import { onMount } from 'svelte';
	import { InputType, parseInput } from '$lib/parse';
	import type { Item } from '$lib/types';

	let contexts: string[] = [];

	let input: string = '';

	$: parseResult = parseInput(input);

	let items: Item[] = [];

	$: filteredItems = items.filter(
		(item) =>
			(parseResult.type === InputType.SEARCH ? parseResult.discriminator(item) : true) &&
			contexts.every((c) => item.tags.includes(c))
	);

	/**
	 * rough hash of a string name to make colors consistent across sessions.
	 */
	export const stringColor = (s: string): string => {
		let n = 0;
		// todo: deprecated; use buffers
		for (const c of btoa(s)) {
			n *= 36;
			n += c.charCodeAt(0);
			n %= 0xffffff;
		}
		for (const x of [13539042, 11647610, 13327862, 7175073]) n = (n * x) % 0xffffff;
		return '#' + n.toString(16).padStart(6, '0');
	};

	const inputSubmit = () => {
		switch (parseResult.type) {
			case InputType.NOOP:
			case InputType.ERROR:
			case InputType.SEARCH:
				break;
			case InputType.CREATE:
				items = [
					{
						text: parseResult.text,
						tags: parseResult.tags.concat(contexts)
					},
					...items
				];
				input = '';
				break;
			case InputType.CONTEXT:
				contexts = [...contexts, ...parseResult.tags];
				input = '';
				break;
			case InputType.DELETE:
				// items = [];
				// contexts = [];
				input = '';
				break;
		}
		saveItems();
	};

	const saveItems = () => {
		localStorage.setItem('items', JSON.stringify(items));
	};

	const loadItems = () => {
		const savedItems = localStorage.getItem('items');
		if (savedItems !== null) {
			items = JSON.parse(savedItems) as Item[];
		}
	};

	onMount(() => {
		loadItems();
	});
</script>

<div class="center">
	Current context: {#each contexts as context}
		<span
			class="tag"
			style="background-color: {stringColor(context)}"
			on:click={() => (contexts = contexts.filter((c) => c !== context))}>#{context}</span
		>
	{/each}
	<form on:submit|preventDefault={inputSubmit}>
		<input type="text" bind:value={input} autofocus />
	</form>
	{#if parseResult.type === InputType.CREATE || parseResult.type === InputType.CONTEXT || parseResult.type === InputType.SEARCH || parseResult.type === InputType.NOOP}
		<ul class="items">
			{#each filteredItems as item}
				<li class="item">
					{item.text}
					{#each item.tags.filter((tag) => !contexts.includes(tag)) as tag}
						<span class="tag" style="background-color: {stringColor(tag)}">#{tag}</span>
					{/each}
				</li>
			{/each}
		</ul>
	{:else if parseResult.type === InputType.ERROR}
		{parseResult.message}
	{/if}
</div>
