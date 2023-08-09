import { categoryType } from '../App';
import { textType, Category } from '../App';

interface ListType {
	textArray: textType[];
	setTextArray: React.Dispatch<React.SetStateAction<textType[]>>;
	idx: number;
	el: {
		category: string;
		text: string;
		date: Date;
	};
	categoryArray: string[];
}

export default function List({ textArray, setTextArray, idx, el, categoryArray }: ListType) {
	const handleTodo = (el: string, category: Category) => {
		const index = textArray.findIndex((ele: textType) => ele.text === el);
		if (index !== -1) {
			const copied = [...textArray];
			copied[index] = { ...copied[index], category };
			setTextArray(copied);
		}
	};

	const handleDelete = () => {
		const copied = [...textArray];
		const index = textArray.findIndex((ele: textType) => ele.text === el.text);
		copied.splice(index, 1);
		setTextArray(copied);
	};

	return (
		<div key={idx}>
			<p>{el.text}</p>
			{categoryArray.map(
				(aToDo, idx) => (
					<button key={idx} onClick={() => handleTodo(el.text, aToDo)}>
						{aToDo}
					</button>
				)
			)}
			<button onClick={handleDelete}>삭제</button>
		</div>
	);
}
