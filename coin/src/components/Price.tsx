import { useOutletContext } from 'react-router-dom';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import styled from 'styled-components';

interface coinSupply {
	total_supply: number;
	max_supply: number;
	quotes: {
		USD: {
			price: number;
			percent_change_12h: number;
			percent_change_24h: number;
			percent_change_7d: number;
			percent_change_30d: number;
			percent_change_1y: number;
			ath_price: number;
			ath_date: number;
		};
	};
}

const List = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 30px;
	li {
		width: 100%;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const High = styled.div`
	height: 100px;
	background: ${(props) => props.theme.bgColor};
	margin: 10px 0;
	display: flex;
	gap: 10px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	span {
		display: block;
		color: #e7d20f;
	}
`;

export default function Price() {
	const context: coinSupply = useOutletContext();

	const isPositive = (num: number) =>
		num >= 0 ? (
			<BiTrendingUp size={50} color='black' />
		) : (
			<BiTrendingDown size={50} color='black' />
		);

	return (
		<>
			<High>
				<span>지금까지의 최고가</span>
				<p>
					{context?.quotes.USD.ath_date.toString().split('T')[0] +
						' ' +
						context?.quotes.USD.ath_date.toString().split('T')[1]}
				</p>
				<p>{context?.quotes.USD.ath_price}</p>
			</High>
			<div>
				<List>
					<li>
						<span>지난 12시간 동안</span>
						{context?.quotes.USD.percent_change_12h}
						{isPositive(context?.quotes.USD.percent_change_12h)}
					</li>
					<li>
						<span>지난 24시간 동안</span>
						{context?.quotes.USD.percent_change_24h}
						{isPositive(context?.quotes.USD.percent_change_24h)}
					</li>
					<li>
						<span>지난 7일 동안</span>
						{context?.quotes.USD.percent_change_7d}
						{isPositive(context?.quotes.USD.percent_change_7d)}
					</li>
					<li>
						<span>지난 30일 동안</span>
						{context?.quotes.USD.percent_change_30d}
						{isPositive(context?.quotes.USD.percent_change_30d)}
					</li>
					<li>
						<span>지난 1년 동안</span>
						{context?.quotes.USD.percent_change_1y}
						{isPositive(context?.quotes.USD.percent_change_1y)}
					</li>
				</List>
			</div>
		</>
	);
}
