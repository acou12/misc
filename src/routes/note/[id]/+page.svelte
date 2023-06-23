<script lang="ts">
	import { goto } from '$app/navigation';
	import TagSet from '$lib/components/TagSet.svelte';
	import { items } from '$lib/store.js';
	import { download, saveItems } from '$lib/utils.js';
	import { debounce } from 'debounce';

	export let data;

	let item = $items.find((item) => item.id === parseInt(data.id))!;

	let content: string = item.content ?? '';

	const saveContent = () => {
		$items = $items.map((other) => (other.id === item.id ? { ...item, content } : other));
		console.log({ ...item, content });
		saveItems();
	};

	const deleteMe = () => {
		$items = $items.filter(other => other.id !== item.id)
		saveItems()
		goto('/')
	}

	const bottom = () => {
		$items = [...$items.filter(other => other.id !== item.id), item]
	}

	const downloadMe = () => {
		download(`${item.text}.txt`, `${item.content}\n\n${item.tags.join(", ")}`)
	}
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
		<button on:click={deleteMe}>delete</button>
		<button on:click={downloadMe}>download</button>
	{/if}
</div>
