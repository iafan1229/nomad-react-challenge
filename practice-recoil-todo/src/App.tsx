import React, { useState, useEffect } from 'react';
import List from './components/List';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { textState, categoryState, toDoSelector } from './recoil/atoms';
import NumberConverter from './components/NumberConverter';

export type Category = 'TODO' | 'DOING' | 'DONE';

export interface textType {
	category: Category;
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
		category: 'TODO',
		text: '',
		date: new Date(),
	});

	const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setRecoilText([...recoilText, inputValue]);
			//초기화
			setInputValue({ category: 'TODO', text: '', date: new Date() });
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
			<div className='toDoList'>
				<select name='' id='category' onChange={handleSelect} value={category}>
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
									key={idx}
									el={el}
								/>
							))}
						</>
					)}
					{}
				</div>
			</div>

			<div className='numberConverter'>
				<NumberConverter />
			</div>
		</>
	);
}

export default App;
