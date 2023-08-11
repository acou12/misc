<script context="module" lang="ts">
	export enum GuiMode {
		PLAY,
		EDIT
	}
</script>

<script lang="ts">
	import { debounce } from 'debounce';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import youTubePlayer from 'youtube-player';
	import type { YouTubePlayer } from 'youtube-player/dist/types';

	import {
		type Entity,
		type Position,
		type ItunesEntity,
		type SongEntity,
		getEntityName,
		entityFromYoutubeId,
		entitySongs,
		EntityArray
	} from '$lib/entity';

	import SongVis from '$lib/SongVis.svelte';
	import Controls from '$lib/Controls.svelte';
	import TrackListing from '$lib/TrackListing.svelte';

	import { Connection, ConnectionStatus, ConnectionType } from '$lib/connect';
	import { addTask, deleteTask, updateTask, type Task } from '$lib/tasks';
	import { demoEntities, demoPositions } from './data';

	let boardScale = 0.3;

	let player: YouTubePlayer;
	let playing = false;
	let progress: number = 0;
	let duration: number = 0;

	let guiMode = GuiMode.PLAY;

	let entities: EntityArray = new EntityArray([]);

	let queue: string[] = [];

	let positions: Record<number, Position> = {};

	$: connections = connectionsFromList(queue);

	let currentYoutubeId: string | undefined;

	let panning = false;

	let tasks: Task[] = [];

	const connectionsFromList = (queue: string[]) => {
		let result = [];
		for (let i = 0; i < queue.length - 1; i++) {
			const e1 = entityFromYoutubeId($entities, queue[i]).id;
			const e2 = entityFromYoutubeId($entities, queue[i + 1]).id;
			if (e1 !== e2) {
				result.push([e1, e2] as [number, number]);
			}
		}
		return result;
	};

	const randomQueue = (first: Entity) => {
		let remainingEntities = [...$entities];
		let entityQueue: Entity[] = [];

		let currentEntity = first;
		let currentPosition = positions[currentEntity.id];
		entityQueue.push(currentEntity);
		remainingEntities.splice(remainingEntities.indexOf(currentEntity), 1);

		while (remainingEntities.length > 0) {
			let minIndex = 0;
			let minDistance = Infinity;
			for (let i = 0; i < remainingEntities.length; i++) {
				const otherSong = remainingEntities[i];
				const otherPosition = positions[otherSong.id];
				const distance = Math.hypot(
					otherPosition.x - currentPosition.x,
					otherPosition.y - currentPosition.y
				);
				if (distance < minDistance) {
					minDistance = distance;
					minIndex = i;
				}
			}
			currentEntity = remainingEntities.splice(minIndex, 1)[0];
			currentPosition = positions[currentEntity.id];
			entityQueue.push(currentEntity);
		}

		const result = entityQueue.flatMap(entitySongs).map((song) => song.youtubeId);
		return result;
	};

	const randomPosition = (): Position => ({
		x: Math.random() * 1000,
		y: Math.random() * 1000
	});

	let draggingId: number | undefined = undefined;
	let connection: Connection;

	onMount(() => {
		let cleanups: (() => void)[] = [];

		let setAndLaterClearInterval: typeof setInterval = (...params) => {
			let interval = setInterval(...params);
			cleanups.push(() => clearInterval(interval));
			return interval;
		};

		player = youTubePlayer('player');
		player.on('ready', async (_event) => {
			setAndLaterClearInterval(async () => {
				progress = await player.getCurrentTime();
				duration = await player.getDuration();
			}, 100);
		});
		player.on('stateChange', ({ data }) => {
			if (data === 0) {
				skip();
			}
		});

		entities = new EntityArray(JSON.parse(localStorage.getItem('entities')!));
		// entities = new EntityArray(demoEntities);
		// saveEntities();

		entities.on('add', ({ entity }) => {
			positions[entity.id] = randomPosition();
			saveLocations();
		});
		entities.on('delete', ({ entity }) => {
			delete positions[entity.id];
			saveLocations();
		});

		entities.on('add', () => saveEntities());
		entities.on('delete', () => saveEntities());
		entities.on('update', () => saveEntities());

		entities.on('add', ({ entity }) => {
			const [newTasks, _] = addTask(tasks, `<u>${getEntityName(entity)}</u> has been added!`);
			tasks = newTasks;
		});
		entities.on('delete', ({ entity }) => {
			const [newTasks, _] = addTask(tasks, `<u>${getEntityName(entity)}</u> has been deleted!`);
			tasks = newTasks;
		});

		positions = JSON.parse(localStorage.getItem('positionmap')!);
		// positions = demoPositions;

		const songsElement = document.querySelector('.songs') as HTMLDivElement;

		const addEvent = <K extends keyof DocumentEventMap>(
			k: K,
			callback: (ev: DocumentEventMap[K]) => void
		) => {
			document.addEventListener(k, callback);
			cleanups.push(() => document.removeEventListener(k, callback));
		};

		addEvent('contextmenu', (e) => e.preventDefault());

		addEvent('mousedown', (e) => {
			for (const entity of $entities) {
				const position = positions[entity.id];
				const clickX = (e.clientX - songsElement.getBoundingClientRect().left) / boardScale;
				const clickY = (e.clientY - songsElement.getBoundingClientRect().top) / boardScale;

				const entitySize = entity.type === 'song' ? 100 : 200;
				const entityRadius = entitySize / 2;

				if (
					position.x - entityRadius <= clickX &&
					clickX <= position.x + entityRadius &&
					position.y - entityRadius <= clickY &&
					clickY <= position.y + entityRadius
				) {
					if (e.button === 2) {
						infoId = entity.id;
						e.preventDefault();
					} else {
						switch (guiMode) {
							case GuiMode.PLAY:
								setPlayback(entity.type === 'song' ? entity.youtubeId : entity.songs[0].youtubeId);
								queue = [];
								connection.sendData({
									type: 'set-queue',
									queue
								});
								// setTimeout(() => {
								// 	queue = randomQueue(entity);
								// 	connection.sendData({
								// 		type: 'set-queue',
								// 		queue
								// 	});
								// }, 2000);
								break;
							case GuiMode.EDIT:
								draggingId = entity.id;
								break;
						}
					}
				}
			}
			if (draggingId === undefined) {
				panning = true;
			}
		});

		addEvent('mouseup', (e) => {
			if (draggingId !== undefined) {
				draggingId = undefined;
			}
			if (panning) {
				panning = false;
			}
		});

		let mousePos = { x: 0, y: 0 };

		addEvent('mousemove', (e) => {
			if (draggingId !== undefined) {
				positions[draggingId].x += e.movementX / boardScale;
				positions[draggingId].y += e.movementY / boardScale;
				debouncedSaveLocations();
			} else if (panning) {
				for (const song of $entities) {
					positions[song.id].x += e.movementX / boardScale;
					positions[song.id].y += e.movementY / boardScale;
					debouncedSaveLocations();
				}
			}
			mousePos.x = e.clientX;
			mousePos.y = e.clientY;
		});

		addEvent('wheel', (e) => {
			if (e.deltaY < 0) {
				boardScale *= 1.05;
				for (const entity of $entities) {
					positions[entity.id].x -= (mousePos.x * 0.05) / boardScale;
					positions[entity.id].y -= (mousePos.y * 0.05) / boardScale;
				}
			} else {
				boardScale /= 1.05;
				for (const entity of $entities) {
					positions[entity.id].x += (mousePos.x * 0.05) / boardScale;
					positions[entity.id].y += (mousePos.y * 0.05) / boardScale;
				}
			}
		});

		(async () => {
			connection = new Connection(
				await import('peerjs'),
				'testing',
				() => {
					if (
						connection.type === ConnectionType.HOST &&
						connection.status === ConnectionStatus.CONNECTED
					) {
						alert('connected!');
					}
				},
				(data) => {
					switch (data.type) {
						case 'set-song':
							setPlayback(data.youtubeId, false);
							break;
						case 'set-queue':
							queue = data.queue;
							break;
						case 'set-progress':
							setPlaybackTime(data.progress, false);
							break;
						case 'set-playing-status':
							if (data.playing) {
								play(false);
							} else {
								pause(false);
							}
							break;
						case 'add-entity':
							entities.add(data.entity);
							break;
					}
				}
			);
			connection.init();
		})();

		return () => cleanups.forEach((callback) => callback());
	});

	const setPlayback = async (youtubeId: string, sendToPeers = true) => {
		if (sendToPeers) {
			connection.sendData({
				type: 'set-song',
				youtubeId
			});
		}

		currentYoutubeId = youtubeId;

		await player.loadVideoById(currentYoutubeId);

		infoId = entityFromYoutubeId($entities, youtubeId).id;

		play(sendToPeers);
	};

	const play = (sendToPeers = true) => {
		if (sendToPeers) {
			connection.sendData({
				type: 'set-playing-status',
				playing: true
			});
		}
		playing = true;
		player.playVideo();
	};

	const pause = (sendToPeers = true) => {
		if (sendToPeers) {
			connection.sendData({
				type: 'set-playing-status',
				playing: false
			});
		}
		playing = false;
		player.pauseVideo();
	};

	const back = () => {
		let currentIndex = queue.indexOf(currentYoutubeId!);
		let newIndex = currentIndex - 1;
		if (newIndex >= 0) {
			setPlayback(queue[newIndex]);
		} else {
			pause();
		}
	};

	const skip = () => {
		let currentIndex = queue.indexOf(currentYoutubeId!);
		let newIndex = currentIndex + 1;
		if (newIndex < queue.length) {
			setPlayback(queue[newIndex]);
		} else {
			pause();
		}
	};

	const setPlaybackTime = (t: number, sendToPeers = true) => {
		if (sendToPeers) {
			connection.sendData({
				type: 'set-progress',
				progress: t
			});
		}
		player.seekTo(t, true);
		progress = t;
	};

	let newSongInput = '';
	let searchEntities: ItunesEntity[] = [];

	const search = async (term: string) => {
		const itunesData = (await fetch(
			`https://itunes.apple.com/search?term=${term}&country=US&entity=album`
		).then((it) => it.json())) as {
			results: ItunesEntity[];
		};

		return itunesData.results;
	};

	const saveLocations = () => {
		localStorage.setItem('positionmap', JSON.stringify(positions));
	};

	const debouncedSaveLocations = debounce(saveLocations, 1000);

	const saveEntities = () => {
		localStorage.setItem('entities', JSON.stringify($entities));
	};

	const getDataFromItunesId = async (id: number) => {
		const data = (await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`).then((it) =>
			it.json()
		)) as { results: ItunesEntity[] };
		return data;
	};

	const getDataFromTrackUrl = async (trackViewUrl: string) => {
		const data = (await fetch(
			`https://api.song.link/v1-alpha.1/links?url=${encodeURI(
				trackViewUrl
			)}&userCountry=US&songIfSingle=true`
		).then((it) => it.json())) as {
			pageUrl: string;
			linksByPlatform: {
				youtube?: { entityUniqueId: string };
				itunes?: { entityUniqueId: string };
			};
		};
		return data;
	};

	const getYoutubeIdFromTrackUrl = async (trackViewUrl: string): Promise<string | undefined> => {
		const data = await getDataFromTrackUrl(trackViewUrl);
		if (data.linksByPlatform.youtube === undefined) return undefined;
		const id: string = data.linksByPlatform.youtube.entityUniqueId.split('::')[1];
		return id;
	};

	const addItunesEntity = async (
		searchEntity: ItunesEntity,
		progress = (_n: number, _total: number) => {}
	) => {
		newSongInput = '';
		searchEntities = [];
		let entity: Entity;
		if (searchEntity.wrapperType === 'track') {
			const youtubeId = await getYoutubeIdFromTrackUrl(searchEntity.trackViewUrl);
			if (youtubeId === undefined) return;
			entity = {
				type: 'song',
				id: searchEntity.trackId,
				youtubeId,
				entity: searchEntity
			};
		} else {
			// (searchSong.wrapperType === 'album')
			const songs: SongEntity[] = [];

			const data = (await fetch(
				`https://itunes.apple.com/lookup?id=${searchEntity.collectionId}&entity=song`
			).then((it) => it.json())) as { results: ItunesEntity[] };

			let total = data.results.length;
			let i = 0;

			for (let itunesEntity of data.results) {
				if (itunesEntity.wrapperType === 'track') {
					const id = await getYoutubeIdFromTrackUrl(itunesEntity.trackViewUrl);
					if (id !== undefined) {
						const song: SongEntity = {
							type: 'song',
							id: itunesEntity.trackId,
							youtubeId: id,
							entity: itunesEntity
						};
						songs.push(song);
					}
					i++;
					progress(i + 1, total);
					console.log(`${searchEntity.collectionName}: ${i + 1} / ${total}`);
				}
			}

			entity = {
				type: 'album',
				id: searchEntity.collectionId,
				entity: searchEntity,
				songs
			};
		}
		entities.add(entity);
	};

	const addNewSong = async () => {
		const [newTasks, taskId] = addTask(
			tasks,
			`adding new song with url <a href="${newSongInput}">${newSongInput}</a>...`
		);
		tasks = newTasks;

		const data = await getDataFromTrackUrl(newSongInput);
		newSongInput = '';

		if (data.linksByPlatform.itunes === undefined) {
			tasks = updateTask(
				tasks,
				taskId,
				`something went wrong: there's no iTunes metadata available for that song. (${newSongInput})`
			);
			return;
		}

		const id = parseInt(data.linksByPlatform.itunes.entityUniqueId.split('::')[1]);
		const itunesData = await getDataFromItunesId(id);

		if (itunesData.results.length === 0) {
			tasks = updateTask(
				tasks,
				taskId,
				`something went wrong: this should never happen [but it probably will]. (${newSongInput})`
			);
			return;
		}

		const itunesResult = itunesData.results[0];
		const name =
			itunesResult.wrapperType === 'track' ? itunesResult.trackName : itunesResult.collectionName;

		await addItunesEntity(itunesResult, (n, total) => {
			tasks = updateTask(tasks, taskId, `downloading ${name}'s info... [${n} / ${total}]`);
		});

		tasks = deleteTask(tasks, taskId);
	};

	let infoId: number | undefined;

	// TODO: REMOVE
	const noop = () => {};
</script>

<div id="player" />

<form on:submit|preventDefault={addNewSong}>
	<input type="text" placeholder="add song: enter a url..." bind:value={newSongInput} />
</form>

<div class="songs" style="transform: scale({boardScale});">
	<SongVis {entities} {positions} {connections} {draggingId} {currentYoutubeId} />
</div>

<div class="tasks">
	{#each tasks as task, i}
		<div class="task" transition:scale={{}}>
			<div class="message">
				{@html task.message}
			</div>

			<div class="close">
				<button
					on:click={() => {
						tasks = deleteTask(tasks, task.id);
					}}
				>
					x
				</button>
			</div>
		</div>
	{/each}
</div>

<Controls
	{playing}
	favorited={false}
	favorite={noop}
	unFavorite={noop}
	{play}
	{pause}
	{back}
	{skip}
	{progress}
	{duration}
	bind:guiMode
	{setPlaybackTime}
/>

{#if infoId !== undefined}
	<TrackListing
		{entities}
		deleteMe={() => {
			console.log(infoId);
			if (infoId !== undefined) {
				entities.remove(infoId);
				infoId = undefined;
			}
		}}
		id={infoId}
		{setPlayback}
		{currentYoutubeId}
	/>
{/if}

<style>
	#player {
		display: none;
	}

	.playing button {
		background-color: black;
		color: white;
	}

	.songs {
		position: relative;
		transform-origin: top left;
	}

	.new-song {
		outline: none;
		border: none;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
	}

	.tasks {
		position: fixed;
		top: 0;
		right: 0;
	}

	.task {
		width: 300px;
		background-color: black;
		color: white;
		padding: 15px;
		border-radius: 10px;
		margin: 5px;

		display: flex;
	}

	.task .message {
		margin-right: auto;
	}

	input {
		background-color: black;
		color: white;
		border: none;
		outline: none;
	}
</style>
