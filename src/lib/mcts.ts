export enum Tile {
	X,
	O,
	EMPTY
}

export const IN_A_ROW = 3;

const otherTurn = (t: Tile) => {
	if (t === Tile.X) return Tile.O;
	else return Tile.X;
};

export class GameResult {
	constructor(
		public ix: number,
		public iy: number,
		public dx: number,
		public dy: number,
		public winner: Tile
	) {}
}

export class Board {
	tiles: Tile[][];
	turn: Tile;

	constructor(public width: number, public height: number) {
		this.tiles = [];
		for (let y = 0; y < height; y++) {
			const row: Tile[] = [];
			for (let x = 0; x < width; x++) {
				row.push(Tile.EMPTY);
			}
			this.tiles.push(row);
		}
		this.turn = Tile.X;
	}

	checkWinner(): GameResult | undefined {
		for (let iy = 0; iy < this.height; iy++) {
			for (let ix = 0; ix < this.width; ix++) {
				for (const d of [
					[0, 1],
					[1, 0],
					[1, 1],
					[1, -1]
				] as [number, number][]) {
					let result = this.checkLine(ix, iy, ...d);
					if (result !== undefined) return result;
				}
			}
		}
		return undefined;
	}

	full() {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (this.tiles[y][x] === Tile.EMPTY) return false;
			}
		}
		return true;
	}

	checkLine(ix: number, iy: number, dx: number, dy: number): GameResult | undefined {
		let tileAtInitial = this.tiles[iy][ix];
		if (tileAtInitial === Tile.EMPTY) return undefined;
		if (
			ix + dx * (IN_A_ROW - 1) >= this.width ||
			iy + dy * (IN_A_ROW - 1) >= this.height ||
			ix + dx * (IN_A_ROW - 1) < 0 ||
			iy + dy * (IN_A_ROW - 1) < 0
		) {
			return undefined;
		}
		for (let i = 0; i < IN_A_ROW; i++) {
			if (this.tiles[iy + dy * i][ix + dx * i] !== tileAtInitial) return undefined;
		}
		return new GameResult(ix, iy, dx, dy, tileAtInitial);
	}

	copy() {
		const newBoard = new Board(this.width, this.height);
		newBoard.tiles = [...this.tiles.map((row) => [...row])];
		return newBoard;
	}

	copyWithMove(x: number, y: number) {
		const newBoard = new Board(this.width, this.height);
		newBoard.tiles = [...this.tiles.map((row) => [...row])];
		newBoard.tiles[y][x] = this.turn;
		newBoard.turn = otherTurn(this.turn);
		return newBoard;
	}
}

export class Node {
	children: Node[];
	explored: boolean;

	wins: number;
	games: number;

	constructor(public board: Board) {
		this.children = [];
		this.explored = false;
		this.wins = 0;
		this.games = 0;
	}

	generateChildren() {
		this.children = [];
		for (let y = 0; y < this.board.height; y++) {
			for (let x = 0; x < this.board.width; x++) {
				if (this.board.tiles[y][x] === Tile.EMPTY) {
					this.children.push(new Node(this.board.copyWithMove(x, y)));
				}
			}
		}
	}

	simulate() {
		let bestChild: Node = this;
		let nodeTrail: Node[] = [];
		do {
			if (bestChild.children.length === 0) break;
			bestChild = bestChild.children
				.map((child) => [child, child.score()] as const)
				.reduce(([bc, bcs], [c, cs]) => (cs > bcs ? [c, cs] : [bc, bcs]))[0];
			nodeTrail.push(bestChild);
		} while (bestChild.explored);
		nodeTrail.push(bestChild);
		bestChild.explored = true;
		bestChild.generateChildren();
		const rollout = bestChild.rollout();
		for (const node of nodeTrail) {
			node.games++;
			if (rollout === Tile.EMPTY) node.wins += 0.5;
			else if (node.board.turn !== rollout) node.wins++;
		}
	}

	score(): number {
		return this.games === 0 ? Infinity : this.wins / this.games + Math.sqrt(2 / this.games);
	}

	rollout() {
		let boardCopy = this.board.copy();
		while (boardCopy.checkWinner() === undefined && !boardCopy.full()) {
			let x: number, y: number;
			do {
				x = Math.floor(Math.random() * boardCopy.width);
				y = Math.floor(Math.random() * boardCopy.height);
			} while (boardCopy.tiles[y][x] !== Tile.EMPTY);
			boardCopy = boardCopy.copyWithMove(x, y);
		}
		return (boardCopy.checkWinner() ?? { winner: Tile.EMPTY }).winner;
	}
}

export {};
