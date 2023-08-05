import React, { useState, useEffect } from 'react';
import List from './components/List';

interface textType {
	category: string;
	text: string;
	date: Date;
}

function App() {
	const [inputValue, setInputValue] = useState<textType>({
		category: '',
		text: '',
		date: new Date(),
	});
	const [textArray, setTextArray] = useState<textType[]>([]);

	const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setTextArray([...textArray, inputValue]);
		}
	};

	const saveText = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue({ category: 'TODO', text: e.target.value, date: new Date() });

	const todoList = textArray.filter((el) => el.category === 'TODO');
	const doingList = textArray.filter((el) => el.category === 'DOING');
	const doneList = textArray.filter((el) => el.category === 'DONE');
	return (
		<>
			<input
				type='text'
				onKeyDown={handleChange}
				onChange={saveText}
				value={inputValue.text}
			/>
			<div>
				<p>TODO ---------</p>
				{todoList.map((el, idx) => (
					<List
						setTextArray={setTextArray}
						textArray={textArray}
						idx={idx}
						el={el}
					/>
				))}
				<p>DOING --------</p>
				{doingList.map((el, idx) => (
					<List
						setTextArray={setTextArray}
						textArray={textArray}
						idx={idx}
						el={el}
					/>
				))}
				<p>DONE ----------</p>
				{doneList.map((el, idx) => (
					<List
						setTextArray={setTextArray}
						textArray={textArray}
						idx={idx}
						el={el}
					/>
				))}
			</div>
		</>
	);
}

export default App;
