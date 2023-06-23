// import { get } from 'svelte/store';
// import { items } from '$lib/store.js';
// import { error } from '@sveltejs/kit';

export function load({ params }) {
	// const item = get(items).find((item) => item.id === parseInt(params.id));
	// if (item === undefined) {
	// 	throw error(400, 'invalid id. >:(');
	// }
	// return { item };
	return { ...params };
}
