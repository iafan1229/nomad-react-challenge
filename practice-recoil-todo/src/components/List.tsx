import { categoryType } from '../App';

interface TextType {
	category: string;
	text: string;
	date: Date;
}

interface ListType {
	textArray: TextType[];
	setTextArray: React.Dispatch<React.SetStateAction<TextType[]>>;
	idx: number;
	el: {
		category: string;
		text: string;
		date: Date;
	};
}

export default function List({ textArray, setTextArray, idx, el }: ListType) {
	const handleTodo = (el: string, category: string) => {
		const index = textArray.findIndex((ele: any) => ele.text === el);
		if (index !== -1) {
			const copied = [...textArray];
			copied[index] = { ...copied[index], category };
			setTextArray(copied);
		}
	};

	return (
		<div key={idx}>
			<p>{el.text}</p>
			{[categoryType.TODO, categoryType.DOING, categoryType.DONE].map(
				(aToDo) => (
					<button onClick={() => handleTodo(el.text, aToDo)}>{aToDo}</button>
				)
			)}
		</div>
	);
}
