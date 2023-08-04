import { useOutletContext } from 'react-router-dom';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';

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
			<div className='highst'>
				<span>지금까지의 최고가</span>
				<p>{context?.quotes.USD.ath_date} </p>
				<p>{context?.quotes.USD.ath_price}</p>
			</div>
			<div>
				<h3>코인 변화율 / 증감 그래프</h3>
				<ul>
					<li>
						{context?.quotes.USD.percent_change_12h}
						{isPositive(context?.quotes.USD.percent_change_12h)}
					</li>
					<li>{context?.quotes.USD.percent_change_24h}</li>
					<li>{context?.quotes.USD.percent_change_7d}</li>
					<li>{context?.quotes.USD.percent_change_30d}</li>
					<li>{context?.quotes.USD.percent_change_1y}</li>
				</ul>
			</div>
		</>
	);
}
