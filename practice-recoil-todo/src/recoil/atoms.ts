import { atom, selector } from 'recoil';
import { textType } from '../App';

export const textState = atom<textType[]>({
	key: 'textState',
	default: [],
});

export const categoryState = atom({
	key: 'categoryState',
	default: 'TODO',
});

export const toDoSelector = selector({
	key: 'toDoSelector',
	get: ({ get }) => {
		const text = get(textState);
		const category = get(categoryState);
		return text.filter((el) => el.category === category);
	},
});
