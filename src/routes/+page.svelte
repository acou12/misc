<script lang="ts">
	import '$lib/style/main.scss';
	import { onMount } from 'svelte';

	const modifier = Math.pow(2, 25) / (60 * 60 * 24 * 365);

	const nToBits = (n: number) => {
		const result = [];
		for (let i = 0; i < 25; i++) {
			result.push((n >> i) & 1);
		}
		return result;
	};

	let bits: number[] = [];

	const draw = () => {
		// requestAnimationFrame(draw);
		const x = new Date(1963, 11, 22, 12, 30, 30);
		// const last = new Date(x.getFullYear(), 11, 31, 12, 59);
		const newYears = new Date(x.getFullYear(), 0, 1);
		let n = 0;
		for (let i = 0; i < 25; i++) { if (Math.random() < 0.5) n += 1 << i; }
		bits = nToBits(n);
	};

	onMount(() => {
		draw();
		document.addEventListener('mousemove', (event) => {
			trackMouse.style.transform = `translate(${event.clientX}px, ${event.clientY - 20}px)`;
		});
	});

	let trackMouse: HTMLDivElement;
	let selectedBit: number | undefined = undefined;
	$: hoverSeconds = selectedBit === undefined ? undefined : Math.pow(2, selectedBit) / modifier;

	const maxDecimals = (s: string, n: number) => {
		const decimalIndex = s.indexOf('.');
		if (decimalIndex === -1) return s;
		else if (decimalIndex + n + 1 >= s.length) return s;
		else return s.substring(0, decimalIndex + n + 1);
	};

	const hoverTime = (seconds: number) => {
		if (seconds < 60) return `${maxDecimals(`${seconds}`, 2)} seconds`;
		else if (seconds < 60 * 60) return `${maxDecimals(`${seconds / 60}`, 2)} minutes`;
		else if (seconds < 60 * 60 * 24) return `${maxDecimals(`${seconds / 60 / 60}`, 2)} hours`;
		else if (seconds < 60 * 60 * 24 * 31)
			return `${maxDecimals(`${seconds / 60 / 60 / 24}`, 2)} days`;
		else if (seconds < 60 * 60 * 24 * 365)
			return `${maxDecimals(`${(seconds / 60 / 60 / 24 / 365) * 12}`, 2)} months`;
		else return `one year`;
	};
</script>

<div class="track-mouse" bind:this={trackMouse}>
	{hoverSeconds === undefined ? undefined : hoverTime(hoverSeconds)}
</div>
<div
	class="bits"
	on:mouseleave={() => (trackMouse.style.opacity = '0%')}
	on:mouseenter={() => (trackMouse.style.opacity = '100%')}
>
	{#each bits as bit, i}
		<div
			class="bit"
			class:filled={bit === 1}
			class:selected={i === selectedBit}
			on:mouseover={() => (selectedBit = i)}
			on:focus={() => (selectedBit = i)}
		/>
		<!-- style="transition: background-color {Math.pow(1, i)}s" -->
	{/each}
</div>
