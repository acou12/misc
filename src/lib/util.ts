import type { Position } from './visual';

/**
 * should be fine...
 */
export const randomId = (): number => Math.floor(Math.random() * Math.pow(2, 32));

export const randomPosition = (): Position => ({
	x: Math.random() * 1000,
	y: Math.random() * 1000
});
