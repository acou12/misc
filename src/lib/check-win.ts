import type { Board, Tile } from './types';

export const checkWin = (board: Board): Tile => {
	const winStates: [Board, Exclude<Tile, ''>][] = [
		[
			[
				['o', '', ''],
				['o', '', ''],
				['o', '', '']
			],
			'o'
		],
		[
			[
				['', 'o', ''],
				['', 'o', ''],
				['', 'o', '']
			],
			'o'
		],
		[
			[
				['', '', 'o'],
				['', '', 'o'],
				['', '', 'o']
			],
			'o'
		],
		[
			[
				['o', 'o', 'o'],
				['', '', ''],
				['', '', '']
			],
			'o'
		],
		[
			[
				['', '', ''],
				['o', 'o', 'o'],
				['', '', '']
			],
			'o'
		],
		[
			[
				['', '', ''],
				['', '', ''],
				['o', 'o', 'o']
			],
			'o'
		],
		[
			[
				['o', '', ''],
				['', 'o', ''],
				['', '', 'o']
			],
			'o'
		],
		[
			[
				['', '', 'o'],
				['', 'o', ''],
				['o', '', '']
			],
			'o'
		],
		[
			[
				['x', '', ''],
				['x', '', ''],
				['x', '', '']
			],
			'x'
		],
		[
			[
				['', 'x', ''],
				['', 'x', ''],
				['', 'x', '']
			],
			'x'
		],
		[
			[
				['', '', 'x'],
				['', '', 'x'],
				['', '', 'x']
			],
			'x'
		],
		[
			[
				['x', 'x', 'x'],
				['', '', ''],
				['', '', '']
			],
			'x'
		],
		[
			[
				['', '', ''],
				['x', 'x', 'x'],
				['', '', '']
			],
			'x'
		],
		[
			[
				['', '', ''],
				['', '', ''],
				['x', 'x', 'x']
			],
			'x'
		],
		[
			[
				['x', '', ''],
				['', 'x', ''],
				['', '', 'x']
			],
			'x'
		],
		[
			[
				['', '', 'x'],
				['', 'x', ''],
				['x', '', '']
			],
			'x'
		]
	];
	for (const stateWithPlayer of winStates) {
		const [state, player] = stateWithPlayer;
		let allMatch = true;
		for (let y = 0; y < 3 && allMatch; y++) {
			for (let x = 0; x < 3 && allMatch; x++) {
				if (state[y][x] !== '' && board[y][x] !== state[y][x]) {
					allMatch = false;
				}
			}
		}
		if (allMatch) {
			return player;
		}
	}
	return '';
};
