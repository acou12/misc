import { items } from '$lib/store';
import { get } from 'svelte/store';
import type { Item } from '$lib/types';
import { browser } from '$app/environment';

const loadItems = () => {
	const savedItems = localStorage.getItem('items');
	if (savedItems !== null) {
		const parsed = JSON.parse(savedItems);
		items.set(parsed as Item[]);
	}
};

export const load = () => {
	if (browser) {
		loadItems();
	}
};
