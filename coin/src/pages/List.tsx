import { Link } from 'react-router-dom';
// import axios from 'axios';
import axios from '../api/axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

type CoinNamesQueryFn = () => Promise<coinName[]>;
interface coinName {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: false;
	is_active: boolean;
	type: string;
}

const CoinList = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
	padding-top: 50px;
	li {
		width: 100%;
		padding: 20px;

		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		transition: all 0.5s;
		&:hover {
			box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
				rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
		}
		a {
			display: flex;
			align-items: center;
			gap: 20px;
			width: 100%;
			text-align-last: left;
			font-size: 25px;
			span {
				display: inline-block;
				width: 50px;
				height: 50px;
				img {
					width: 100%;
				}
			}
		}
	}
`;
export default function List() {
	const [array, setArray] = useState<coinName[]>([]);
	const coinNames: CoinNamesQueryFn = async () => {
		const result = await axios.get('coins');
		return result.data;
	};
	const { data, isLoading } = useQuery({
		queryKey: ['list'],
		queryFn: coinNames,
	});
	useEffect(() => {
		if (data) {
			const extractedData = data.slice(0, 20); // 처음부터 20개의 데이터만 추출
			setArray(extractedData);
		}
	}, [data]);

	return (
		<>
			<h1>Coin List Infinite Scrolling!</h1>
			<CoinList>
				{isLoading ? (
					<div>로딩중입니다</div>
				) : (
					array.map((el, idx: number) => {
						return (
							<li>
								<Link to={`${el.id}`}>
									<span>
										<img
											src={`https://coinicons-api.vercel.app/api/icon/${el.symbol.toLowerCase()}`}
											alt={`${el.name}`}
										/>
									</span>
									{el.name}
								</Link>
							</li>
						);
					})
				)}
			</CoinList>
		</>
	);
}
