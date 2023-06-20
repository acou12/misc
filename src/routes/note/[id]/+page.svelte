<script lang="ts">
	export let data;
</script>

<div class="center">
	{#if data.item !== undefined}
		<h1>{data.item.text}</h1>
	{/if}
</div>
