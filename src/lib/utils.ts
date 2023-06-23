import { debounce } from 'debounce';
import { items, savedSinceLastWrite } from './store';
import { get } from 'svelte/store';

const saveItemsDeb = debounce(() => {
	localStorage.setItem('items', JSON.stringify(get(items)));
	savedSinceLastWrite.set(true);
}, 5 * 1000);

export const saveItems = () => {
	savedSinceLastWrite.set(false);
	saveItemsDeb();
};

export const download = (filename: string, text: string) => {
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
};
