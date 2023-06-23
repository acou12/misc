import { writable } from 'svelte/store';
import type { Item } from './types';

export const contexts = writable([] as string[]);
export const items = writable([] as Item[]);
export const savedSinceLastWrite = writable(true);
