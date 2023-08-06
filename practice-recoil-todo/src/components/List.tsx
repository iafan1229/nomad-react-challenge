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
		const index = textArray.findIndex((ele: TextType) => ele.text === el);
		if (index !== -1) {
			const copied = [...textArray];
			copied[index] = { ...copied[index], category };
			setTextArray(copied);
		}
	};

	const handleDelete = () => {
		const copied = [...textArray];
		const index = textArray.findIndex((ele: TextType) => ele.text === el.text);
		copied.splice(index, 1);
		setTextArray(copied);
	};

	return (
		<div key={idx}>
			<p>{el.text}</p>
			{[categoryType.TODO, categoryType.DOING, categoryType.DONE].map(
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
