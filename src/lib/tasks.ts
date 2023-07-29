export type Task = {
	id: symbol;
	message: string;
};

export const addTask = (tasks: Task[], message: string): [Task[], symbol] => {
	const symbol = Symbol();
	const newTask = {
		id: symbol,
		message
	};
	return [[...tasks, newTask], symbol];
};

export const updateTask = (tasks: Task[], id: symbol, message: string): Task[] =>
	tasks.map((task) => (task.id === id ? { ...task, message } : task));

export const deleteTask = (tasks: Task[], id: symbol): Task[] =>
	tasks.filter((task) => task.id !== id);
