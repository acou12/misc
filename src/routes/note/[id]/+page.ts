import { get } from 'svelte/store';
import { items } from '$lib/store.js';

export function load({ params }) {
	return { item: get(items).find((item) => item.id === parseInt(params.id)) };
}
