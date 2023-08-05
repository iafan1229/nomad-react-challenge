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
	const handleDoing = (el: string) => {
		const index = [...textArray].findIndex((ele) => ele.text === el);
		const copied = [...textArray];
		copied[index].category = 'DOING';

		setTextArray(copied);
	};

	const handleDone = (el: string) => {
		const index = [...textArray].findIndex((ele) => ele.text === el);
		const copied = [...textArray];
		copied[index].category = 'DONE';

		setTextArray(copied);
	};

	const handleTodo = (el: string) => {
		const index = textArray.findIndex((ele: any) => ele.text === el);
		if (index !== -1) {
			const copied = [...textArray];
			copied[index] = { ...copied[index], category: 'TODO' };
			setTextArray(copied);
		}
	};

	return (
		<div key={idx}>
			<p>{el.text}</p>
			<button onClick={() => handleTodo(el.text)}>DOING</button>
			<button onClick={() => handleDoing(el.text)}>DOING</button>
			<button onClick={() => handleDone(el.text)}>DONE</button>
		</div>
	);
}
