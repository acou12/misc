<script lang="ts">
	import { GuiMode } from '../routes/+page.svelte';
	import ControlsButton from './ControlsButton.svelte';

	const PROGRESS_WIDTH = 500;

	export let playing = false;
	export let favorited = false;

	export let progress: number;
	export let duration: number;

	export let guiMode: GuiMode;

	let hoverWidth: number;

	export let setPlaybackTime: (t: number) => void;

	export let play: () => void;
	export let pause: () => void;
	export let back: () => void;
	export let skip: () => void;
	export let favorite: () => void;
	export let unFavorite: () => void;

	const toggleFavorite = () => (favorited ? unFavorite() : favorite());

	const setPlaybackBasedOnClickLocation = (e: MouseEvent) => {
		setPlaybackTime((e.offsetX / PROGRESS_WIDTH) * duration);
	};

	const mouseMove = (e: MouseEvent) => {
		hoverWidth = e.offsetX;
	};

	const mouseOut = () => {
		hoverWidth = 0;
	};
</script>

<div class="controls-outer">
	<div class="center">
		<div class="controls">
			{#if guiMode === GuiMode.PLAY}
				<ControlsButton
					path={'edit'}
					size={25}
					style="margin-right: 10px;"
					on:click={() => (guiMode = GuiMode.EDIT)}
				/>
			{:else}
				<ControlsButton
					path={'edit'}
					size={25}
					style="margin-right: 10px; outline: dashed white 3px;"
					on:click={() => (guiMode = GuiMode.PLAY)}
				/>
			{/if}
			<ControlsButton path={'super-back'} size={30} />
			<ControlsButton path={'back'} on:click={back} size={30} />
			{#if playing}
				<ControlsButton path={'pause'} on:click={pause} />
			{:else}
				<ControlsButton path={'play'} on:click={play} />
			{/if}
			<ControlsButton path={'next'} on:click={skip} size={30} />
			<ControlsButton
				path={'super-next'}
				on:click={() => {
					for (let i = 0; i < 20; i++) skip();
				}}
				size={30}
			/>

			<ControlsButton
				path={'favorite'}
				on:click={() => setPlaybackTime(100)}
				size={25}
				style="margin-left: 10px;"
			/>
		</div>
	</div>
	<div class="center" aria-hidden="true">
		<div
			class="progress-outer"
			style="width: {PROGRESS_WIDTH}px;"
			on:click={setPlaybackBasedOnClickLocation}
			on:mousemove={mouseMove}
			aria-hidden="true"
		>
			<div class="progress-hover" style="width: {hoverWidth}px;" />
			<div class="progress" style="width: {(PROGRESS_WIDTH * progress) / duration}px;" />
		</div>
	</div>
</div>

<style>
	.controls-outer {
		position: fixed;
		left: 0px;
		bottom: 0px;
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(20px);
		padding: 20px;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: baseline;
		margin: 15px 0;
	}

	.controls {
		display: flex;
		margin: auto;
	}

	.progress-outer {
		position: relative;
		height: 10px;
	}

	.progress {
		position: absolute;
		height: 10px;
		background-color: orange;
		border-radius: 5px;
		transition: width 0.5s;
	}

	.progress-hover {
		opacity: 0;
		position: absolute;
		height: 10px;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 5px;
		transition: opacity 0.2s;
	}

	.progress-outer:hover .progress-hover {
		opacity: 1;
	}
</style>
