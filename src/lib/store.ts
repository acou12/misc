import { debounce } from 'debounce';
import type { Subscriber } from 'svelte/motion';
import { writable, type Updater, type Writable, get } from 'svelte/store';

export const smartSyncStore = <T>(
	location: string,
	init: T,
	debounceTime: number | undefined = undefined
): Writable<T> & { forceSave: () => void } => {
	let savedValueString = localStorage.getItem(location);

	let savedValue = savedValueString === null ? null : JSON.parse(savedValueString);

	if (savedValue === null) {
		savedValue = init;
	}

	const baseStore = writable(savedValue);

	const save = (t: T) => localStorage.setItem(location, JSON.stringify(t));
	const possiblyDebouncedSave = debounceTime === undefined ? save : debounce(save, debounceTime);

	return {
		set: (t: T) => {
			baseStore.set(t);
			possiblyDebouncedSave(t);
		},
		subscribe: (run: Subscriber<T>) => baseStore.subscribe(run),
		update: (updater: Updater<T>) => baseStore.update(updater),
		forceSave: () => {
			save(get(baseStore));
		}
	};
};
