import type { Item } from '$lib/types';

export enum InputType {
	NOOP,
	ERROR,
	CREATE,
	CONTEXT,
	DELETE,
	SEARCH,
	SAVE
}

export type Input =
	| {
			type: InputType.NOOP;
	  }
	| {
			type: InputType.ERROR;
			message: string;
	  }
	| {
			type: InputType.CREATE;
			text: string;
			tags: string[];
	  }
	| {
			type: InputType.CONTEXT;
			tags: string[];
	  }
	| {
			type: InputType.DELETE;
	  }
	| {
			type: InputType.SEARCH;
			discriminator: (item: Item) => boolean;
	  }
      | {
        type: InputType.SAVE
      }

export const parseInput = (input: string): Input => {
	if (input.length === 0) {
		return {
			type: InputType.NOOP
		};
	} else if (input[0] === '+') {
		return parseCreate(input);
	} else if (input[0] === '-') {
		return {
			type: InputType.DELETE
		};
	} else if (input[0] === '@') {
		return parseContext(input);
	} else if (input[0] === '%') {
		return {
			type: InputType.SAVE
		};
	} else {
		return parseSearch(input);
	}
};

const validTagChar = (c: string): boolean => c !== ' ';

const parseTag = (input: string, index: number): { tag: string; newIndex: number } => {
	index++;
	let startIndex = index;
	while (index < input.length && validTagChar(input[index])) {
		index++;
	}
	return {
		tag: input.slice(startIndex, index),
		newIndex: index
	};
};

const parseCreate = (input: string): Input => {
	let tags: string[] = [];
	let itemText = '';
	let index = 1;
	while (index < input.length) {
		switch (input[index]) {
			case '#': {
				const { tag, newIndex } = parseTag(input, index);
				tags.push(tag);
				index = newIndex;
				break;
			}
			default: {
				itemText += input[index];
				index++;
				break;
			}
		}
	}
	return {
		type: InputType.CREATE,
		text: itemText,
		tags
	};
};

const error = (message: string): Input => ({ type: InputType.ERROR, message });

const parseContext = (input: string): Input => {
	let index = 0;
	let tags: string[] = [];
	while (index < input.length) {
		if (input[index] !== '@') return error('invalid context creation.');
		const { tag, newIndex } = parseTag(input, index);
		index = newIndex;
		if (index < input.length) index++; // trailing space
		tags.push(tag);
	}
	return {
		type: InputType.CONTEXT,
		tags: tags
	};
};

const parseSearch = (input: string): Input => {
	let tags: string[] = [];
	let itemText = '';
	let index = 0;
	while (index < input.length) {
		switch (input[index]) {
			case '#': {
				const { tag, newIndex } = parseTag(input, index);
				tags.push(tag);
				index = newIndex;
				break;
			}
			default: {
				itemText += input[index];
				index++;
				break;
			}
		}
	}

	return {
		type: InputType.SEARCH,
		discriminator: (item) => {
			return (
				item.text.includes(itemText.trim()) &&
				tags.every((tag) => item.tags.some((otherTag) => otherTag.includes(tag)))
			);
		}
	};
};
