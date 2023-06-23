<script lang="ts">
	export let tags: string[];
	export let onClick: (tag: string) => void = () => {};

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
</script>

{#each tags as tag}
	<span
		class="tag"
		style="background-color: {stringColor(tag)}"
		on:click={() => onClick(tag)}
		on:keydown={() => onClick(tag)}>#{tag}</span
	>
{/each}
