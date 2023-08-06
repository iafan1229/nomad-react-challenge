import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { converterSelector, numberState } from '../recoil/atoms';

/**
 * 리코일의 getter, setter 함수를 활용한 예제
 */
export default function NumberConverter() {
	const [change, setChange] = useRecoilState(numberState);
	const [hour, setHour] = useRecoilState(converterSelector); //첫 요소는 get으로, 두번째 요소는 set property
	const removeZero = (el: any) => {
		if (el === '') {
			return '';
		} else {
			return +el.replace(/(^0+)/, '');
		}
	};
	const handleMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
		const tmp = removeZero(e.target.value);
		setChange(tmp);
	};
	const handleHour = (e: React.ChangeEvent<HTMLInputElement>) => {
		const tmp = removeZero(e.target.value);
		setHour(tmp);
	};
	return (
		<>
			<h1>Time Converter</h1>
			<input type='number' onChange={handleMinute} value={change} />
			<input type='number' onChange={handleHour} value={hour} />
		</>
	);
}
