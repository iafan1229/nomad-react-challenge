import React, { useState, useEffect } from 'react';
import List from './components/List';

interface textType {
	category: string;
	text: string;
	date: Date;
}

function App() {
	const [selectValue, setSelectValue] = useState('TODO');
	const [inputValue, setInputValue] = useState<textType>({
		category: '',
		text: '',
		date: new Date(),
	});
	const [textArray, setTextArray] = useState<textType[]>([]);

	const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setTextArray([...textArray, inputValue]);
			//초기화
			setInputValue({ category: '', text: '', date: new Date() });
		}
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setSelectValue(e.target.value);

	const saveText = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue({
			category: selectValue,
			text: e.target.value,
			date: new Date(),
		});

	const todoList = textArray.filter((el) => el.category === 'TODO');
	const doingList = textArray.filter((el) => el.category === 'DOING');
	const doneList = textArray.filter((el) => el.category === 'DONE');

	return (
		<>
			<select name='' id='category' onChange={handleSelect}>
				<option value='TODO'>TODO</option>
				<option value='DOING'>DOING</option>
				<option value='DONE'>DONE</option>
			</select>
			<input
				type='text'
				onKeyDown={handleChange}
				onChange={saveText}
				value={inputValue.text}
			/>
			<div>
				{selectValue === 'TODO' && (
					<>
						<p style={{ fontWeight: 'bold' }}>TODO ---------</p>
						{todoList.map((el, idx) => (
							<List
								setTextArray={setTextArray}
								textArray={textArray}
								idx={idx}
								el={el}
								key={idx} // 각 항목의 고유한 키를 설정해 주세요.
							/>
						))}
					</>
				)}
				{selectValue === 'DOING' && (
					<>
						<p style={{ fontWeight: 'bold' }}>DOING ---------</p>
						{doingList.map((el, idx) => (
							<List
								setTextArray={setTextArray}
								textArray={textArray}
								idx={idx}
								el={el}
								key={idx} // 각 항목의 고유한 키를 설정해 주세요.
							/>
						))}
					</>
				)}
				{selectValue === 'DONE' && (
					<>
						<p style={{ fontWeight: 'bold' }}>DONE ---------</p>
						{doneList.map((el, idx) => (
							<List
								setTextArray={setTextArray}
								textArray={textArray}
								idx={idx}
								el={el}
								key={idx} // 각 항목의 고유한 키를 설정해 주세요.
							/>
						))}
					</>
				)}
			</div>
		</>
	);
}

export default App;
