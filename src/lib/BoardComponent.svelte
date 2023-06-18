<script lang="ts">
	import { Tile } from './mcts';

	export let width: number;
	export let height: number;

	export let board: Tile[][];

	// export let board: Tile[][] = [
	// 	['', '', ''],
	// 	['', '', ''],
	// 	['', '', ''],
	// ];

	export let onclick: (row: number, column: number) => void = () => {};
	export let interactive: boolean = true;

	export let filled = board.map((row) => row.map(() => false));
</script>

<svg viewBox="-0.5 -0.5 {width + 1} {height + 1}" xmlns="http://www.w3.org/2000/svg">
	<g class="lines">
		{#each board as row, rowNum}
			{#each row as tile, columnNum}
				{#if tile === Tile.O}
					{#if filled[rowNum][columnNum]}
						<rect
							class="filledO"
							x={columnNum}
							y={rowNum}
							rx="0.01"
							width="1"
							height="1"
							stroke="none"
						/>
					{/if}
					<circle
						class="o"
						class:white={filled[rowNum][columnNum]}
						cx={columnNum + 0.5}
						cy={rowNum + 0.5}
						r="0.35"
						stroke-width="0.1"
					/>
				{:else if tile === Tile.X}
					{#if filled[rowNum][columnNum]}
						<rect
							class="filledX"
							x={columnNum}
							y={rowNum}
							rx="0.01"
							width="1"
							height="1"
							stroke="none"
						/>
					{/if}
					<path
						class="x"
						class:white={filled[rowNum][columnNum]}
						d="M{columnNum + 0.25},{rowNum + 0.25} L{columnNum + 0.75},{rowNum + 0.75} M{columnNum +
							0.75},{rowNum + 0.25} L{columnNum + 0.25},{rowNum + 0.75}"
						stroke-width="0.1"
					/>
				{:else if !filled[rowNum][columnNum]}
					<rect
						class:select={interactive}
						x={columnNum}
						y={rowNum}
						rx="0.01"
						width="1"
						height="1"
						stroke="none"
						on:click={() => onclick(rowNum, columnNum)}
					/>
				{/if}
			{/each}
		{/each}

		{#each board.slice(1) as row, rowNum}
			<path d="M 0 {rowNum + 1} l {width} 0" />
		{/each}
		{#each board[0].slice(1) as col, colNum}
			<path d="M {colNum + 1} 0 l 0 {height}" />
		{/each}
	</g>
</svg>

<style lang="scss">
	.lines {
		fill: none;
		stroke: black;
		stroke-width: 0.1;
		stroke-linecap: round;
	}

	.select {
		fill: transparent;
		stroke: transparent;
		&:hover {
			fill: #eeeeee;
			stroke: #eeeeee;
		}
	}

	.filledX {
		fill: #ff7f2a;
		stroke: #ff7f2a;
	}

	.filledO {
		fill: #4f9fe6;
		stroke: #4f9fe6;
	}

	.x {
		stroke: #ff7f2a;
	}

	.o {
		stroke: #4f9fe6;
	}

	.white {
		stroke: white !important;
	}
</style>
