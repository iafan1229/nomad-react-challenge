import React, { useState, useEffect, InputHTMLAttributes } from 'react';
import List from './components/List';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { textState, categoryState, toDoSelector, categoryArrayState } from './recoil/atoms';
import NumberConverter from './components/NumberConverter';

export type Category = any;

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
	const [categoryArray, setCategoryArray] = useRecoilState(categoryArrayState);
	const [newInput, setNewInput] = useState('');

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
	const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewInput(e.target.value);
	}
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setCategory(e.target.value);

	const saveText = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue({
			category,
			text: e.target.value,
			date: new Date(),
		});
	const addCategory = () => {
		setCategoryArray([...categoryArray, newInput])
	}
	const deleteCategory = () => {
		const findIndx = categoryArray.findIndex(el=>el===newInput);
		if(!findIndx) return;
		else {
			const tmp = [...categoryArray];
			tmp.splice(findIndx,1);
			setCategoryArray(tmp)
		}
	}
	return (
		<>
			<div className='toDoList'>
				<div style={{paddingBottom: '10px'}}>
					<input type="text" id='setCategory' value={newInput} onChange={handleAddChange}/>
					<button onClick={addCategory}>add category</button>
					<button onClick={deleteCategory}>delete Category</button>
				</div>
				<select name='' id='category' onChange={handleSelect} value={category}>
					{categoryArray.map((el)=><option value={el}>{el}</option>
					)}
				</select>
				<input
					type='text'
					onKeyPress={handleChange}
					onChange={saveText}
					value={inputValue.text}
				/>
				<div>
					{
						<>
							<p style={{ fontWeight: 'bold' }}>{category} ---------</p>
							{toDos.map((el, idx) => (
								<List
									setTextArray={setRecoilText}
									textArray={recoilText}
									idx={idx}
									el={el}
									key={idx}
									categoryArray={categoryArray}
								/>
							))}
						</>
					}
				
				</div>
			</div>
{/* 
			<div className='numberConverter'>
				<NumberConverter />
			</div> */}
		</>
	);
}

export default App;
