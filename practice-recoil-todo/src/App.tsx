import React, { useState, useEffect } from 'react';
import List from './components/List';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { textState, categoryState, toDoSelector } from './recoil/atoms';

export interface textType {
	category: string;
	text: string;
	date: Date;
}

export enum categoryType {
	'TODO' = 'TODO',
	'DOING' = 'DOING',
	'DONE' = 'DONE',
}

function App() {
	const [recoilText, setRecoilText] = useRecoilState(textState);
	const toDos = useRecoilValue(toDoSelector);
	const [category, setCategory] = useRecoilState(categoryState);

	const [inputValue, setInputValue] = useState<textType>({
		category: '',
		text: '',
		date: new Date(),
	});

	const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setRecoilText([...recoilText, inputValue]);
			//초기화
			setInputValue({ category: '', text: '', date: new Date() });
		}
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setCategory(e.target.value);

	const saveText = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue({
			category,
			text: e.target.value,
			date: new Date(),
		});

	return (
		<>
			<select name='' id='category' onChange={handleSelect}>
				<option value={categoryType.TODO}>TODO</option>
				<option value={categoryType.DOING}>DOING</option>
				<option value={categoryType.DONE}>DONE</option>
			</select>
			<input
				type='text'
				onKeyDown={handleChange}
				onChange={saveText}
				value={inputValue.text}
			/>
			<div>
				{category === 'TODO' && (
					<>
						<p style={{ fontWeight: 'bold' }}>TODO ---------</p>
						{toDos.map((el, idx) => (
							<List
								setTextArray={setRecoilText}
								textArray={recoilText}
								idx={idx}
								el={el}
								key={idx}
							/>
						))}
					</>
				)}
				{category === 'DOING' && (
					<>
						<p style={{ fontWeight: 'bold' }}>DOING ---------</p>
						{toDos.map((el, idx) => (
							<List
								setTextArray={setRecoilText}
								textArray={recoilText}
								idx={idx}
								el={el}
								key={idx}
							/>
						))}
					</>
				)}
				{category === 'DONE' && (
					<>
						<p style={{ fontWeight: 'bold' }}>DONE ---------</p>
						{toDos.map((el, idx) => (
							<List
								setTextArray={setRecoilText}
								textArray={recoilText}
								idx={idx}
								el={el}
								key={idx}
							/>
						))}
					</>
				)}
				{}
			</div>
		</>
	);
}

export default App;
