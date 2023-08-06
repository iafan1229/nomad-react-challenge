import { recoilPersist } from 'recoil-persist';
import { atom, selector } from 'recoil';
import { textType } from '../App';

const { persistAtom } = recoilPersist({
	key: 'todoLocal',
	storage: localStorage,
});

export const textState = atom<textType[]>({
	key: 'textState',
	default: [],
	effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom({
	key: 'categoryState',
	default: 'TODO',
	effects_UNSTABLE: [persistAtom],
});

export const numberState = atom<number | string>({
	key: 'numberState',
	default: 0,
});

export const toDoSelector = selector({
	key: 'toDoSelector',
	get: ({ get }) => {
		const text = get(textState);
		const category = get(categoryState);
		return text.filter((el) => el.category === category);
	},
});

export const converterSelector = selector({
	key: 'converterSelector',
	get: ({ get }) => {
		const number = get(numberState);
		if (typeof number === 'number') {
			return number / 60;
		}
		return '';
	},
	set: ({ set }, newValue) => {
		const minutes = newValue && +newValue * 60;
		set(numberState, minutes);
	},
});
