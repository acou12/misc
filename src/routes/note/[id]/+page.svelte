<script lang="ts">
	import TagSet from '$lib/components/TagSet.svelte';
	import { items } from '$lib/store.js';
	import { saveItems } from '$lib/utils.js';
	import { debounce } from 'debounce';

	export let data;

	let item = $items.find((item) => item.id === parseInt(data.id))!;

	let content: string = item.content ?? '';

	const saveContent = () => {
		$items = $items.map((other) => (other.id === item.id ? { ...item, content } : other));
		console.log({ ...item, content });
		saveItems();
	};
</script>

<div class="center">
	{#if item !== undefined}
		<h1>{item.text}</h1>
		<TagSet tags={item.tags} />
		<textarea
			class="content"
			cols="30"
			rows="10"
			on:input={debounce(saveContent, 200)}
			bind:value={content}
		/>
	{/if}
</div>
