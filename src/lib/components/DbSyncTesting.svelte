<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const useDbSyncStore = <T extends { id: number; name: string; artist: string; length: number }>(
		t: T[]
	): Writable<T[]> => {
		const store = writable(t);

		let oldValue = t.map((item) => ({ ...item }));

		store.subscribe((value) => {
			const added = value.filter((item) => !oldValue.some((otherItem) => otherItem.id === item.id));
			const removed = oldValue.filter(
				(item) => !value.some((otherItem) => otherItem.id === item.id)
			);
			const updated = value.filter((item) =>
				oldValue.some(
					(otherItem) =>
						otherItem.id === item.id &&
						(otherItem.name !== item.name ||
							otherItem.artist !== item.artist ||
							otherItem.length !== item.length)
				)
			);

			// console.log(added, removed);

			for (const item of added) {
				const { id, name, artist, length } = item;
				console.log(
					`INSERT INTO Songs (Id, Name, Artist, Length) VALUES (${id}, "${name}", "${artist}", ${length});`
				);
			}

			for (const item of removed) {
				console.log(`DELETE FROM Songs WHERE Id=${item.id};`);
			}

			for (const item of updated) {
				const otherItem = oldValue.find((o) => o.id === item.id)!;
				const updates = [];
				if (item.name !== otherItem.name) {
					updates.push(`name = "${item.name}"`);
				}
				if (item.artist !== otherItem.artist) {
					updates.push(`artist = "${item.artist}"`);
				}
				if (item.length !== otherItem.length) {
					updates.push(`length = ${item.length}`);
				}
				console.log(`UPDATE table_name SET ${updates.join(', ')} WHERE Id=${item.id};`);
			}

			oldValue = value.map((item) => ({ ...item }));
		});

		return store;
	};

	let songs = useDbSyncStore<{ id: number; name: string; artist: string; length: number }>([]);

	onMount(() => {
		console.log('initialize songs');
		$songs = [
			{
				id: 0,
				name: 'Hysteria',
				artist: 'Muse',
				length: 127
			},
			{
				id: 1,
				name: 'Soma',
				artist: 'The Strokes',
				length: 91
			},
			{
				id: 2,
				name: 'Me and Michael',
				artist: 'MGMT',
				length: 109
			}
		];

		console.log('delete soma');
		$songs = $songs.filter((song) => song.name !== 'Soma');

		console.log('convert length to ms');
		$songs = $songs.map((song) => ({ ...song, length: song.length * 1000 }));
	});
</script>
