<script lang="ts">
	import { Board, IN_A_ROW, Node, Tile } from '$lib/mcts';
	import BoardComponent from '$lib/BoardComponent.svelte';
	import { onMount } from 'svelte';
	import '$lib/style.scss';
	// import BoardComponent from '$lib/Board.svelte';
	// import { checkWin } from '$lib/check-win';
	// import type { Board, Tile } from '$lib/types';

	// const WIDTH = 3;
	// const HEIGHT = 3;

	let board: Board = new Board(4, 4);
	let filled: boolean[][] = Array(board.height)
		.fill(0)
		.map(() => Array(board.width).fill(false));

	onMount(() => {
		// for (let y = 0; y < board.height; y++) {
		// 	for (let x = 0; x < board.width; x++) {
		// 		board.tiles[y][x] = [Tile.X, Tile.O, Tile.EMPTY][Math.floor(Math.random() * 3)];
		// 	}
		// }
		// board = node.rollout();
		// setInterval(() => {
		// 	 if (board.checkWinner() !== undefined) {
		// 		let x: number, y: number;
		// 		do {
		// 			x = Math.floor(Math.random() * board.width);
		// 			y = Math.floor(Math.random() * board.height);
		// 		} while (board.tiles[y][x] === Tile.EMPTY);
		// 		board.tiles[y][x] = Tile.EMPTY;
		// 	}
		// }, 20);
		// const playInterval = setInterval(() => {
		// 	makeAiMove();
		// 	updateFilled();
		// 	if (board.checkWinner() !== undefined) clearInterval(playInterval);
		// }, 500);
		makeAiMove();
	});

	const updateFilled = () => {
		filled = Array(board.height)
			.fill(0)
			.map(() => Array(board.width).fill(false));
		const result = board.checkWinner();
		if (result !== undefined) {
			for (let i = 0; i < IN_A_ROW; i++) {
				filled[result.iy + i * result.dy][result.ix + i * result.dx] = true;
			}
		}
	};

	const makeAiMove = () => {
		const node = new Node(board);
		node.generateChildren();
		for (let i = 0; i < 10000; i++) node.simulate();
		console.log(node.children);
		if (node.children.length !== 0) {
			let bestNode: Node = node.children[0];
			for (const n of node.children) {
				if (n.games > bestNode.games) bestNode = n;
			}
			board = bestNode.board;
			turn = board.turn;
		}
	};

	// const scores = Array(Math.pow(3, 9)).fill(0);

	// const copyBoard = (board: Board) => {
	// 	return [...board.map((row) => [...row])];
	// };

	// const hashBoard = (board: Board) => {
	// 	let n = 0;
	// 	for (let y = 0; y < HEIGHT; y++) {
	// 		for (let x = 0; x < WIDTH; x++) {
	// 			n *= 3;
	// 			n += ['', 'x', 'o'].indexOf(board[y][x]);
	// 		}
	// 	}
	// 	return n;
	// };

	let turn = Tile.X;

	// 	const boardFromString = (s: string) => {
	// 		const tiles = s
	// 			.trim()
	// 			.split('\n')
	// 			.map((row) => row.split(''));
	// 		const board = new Board(tiles[0].length, tiles.length);
	// 		board.tiles = tiles.map((row) =>
	// 			row.map((tile) => (tile === '.' ? Tile.EMPTY : tile === 'X' ? Tile.X : Tile.O))
	// 		);
	// 		console.log(board.tiles);
	// 		return board;
	// 	};

	// 	const board = boardFromString(`

	// X...X
	// ...X.
	// ..X..

	// 	`);

	// 	console.log(board.checkWinner());
</script>

<!-- <h1>Tic Tac Tuc Tec Toe</h1> -->

<div class="board">
	<BoardComponent
		board={board.tiles}
		{filled}
		interactive
		onclick={(y, x) => {
			board = board.copyWithMove(x, y);
			turn = board.turn;
			if (turn === Tile.X && board.checkWinner() === undefined) {
				makeAiMove();
			}
			updateFilled();
		}}
		width={board.width}
		height={board.height}
	/>
</div>

<style lang="scss">
	.board {
		height: 100vh;
		width: 100vh;
		margin: auto;
	}
</style>
