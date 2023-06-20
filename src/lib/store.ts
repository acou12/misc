import { writable } from 'svelte/store';
import type { Item } from './types';

export const items = writable([] as Item[]);
