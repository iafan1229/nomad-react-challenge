import axios from '../api/axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link, Outlet } from 'react-router-dom';
import { CoinList as ListMenu } from './List';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';

interface coinDetail {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	logo: string;
	description: string;
}

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

type CoinDetailQueryFn = (coinId: string) => Promise<coinDetail>;

type CoinSupplyFn = (coinId: string) => Promise<coinSupply>;

const BackButton = styled.button`
	position: relative;
	padding: 10px 30px;
	border-radius: 15px;
	background-color: #e2980f;
	color: #fafafa;
	border: solid 1px #000;
	overflow: hidden;
	cursor: pointer;
	max-width: 200px;
	margin: 0 auto;
	transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1); // easeOutQuart
`;

const ListWrap = styled.div`
	padding-top: 5vw;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 8rem;
`;
const List = styled.div`
	background-color: rgb(124, 123, 123);
	border-radius: 0.7rem;
	box-shadow: rgba(187, 186, 186, 0.2) 0px 0.2rem 0.5rem;
	padding: 1rem;

	ul {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		justify-content: space-around;
		li {
			span {
				font-weight: bold;
				font-size: 20px;
				display: block;
				padding-bottom: 20px;
			}
			background-color: inherit;
			line-height: 1.2;
		}
	}
`;

const PrimeList = styled(ListMenu)`
	flex-direction: row;
`;

export default function CoinList() {
	const navi = useNavigate();
	const { coinId } = useParams();

	const coinInfo: CoinDetailQueryFn = async (coinId) => {
		const result = await axios.get(`coins/${coinId}`);
		return result.data;
	};

	const coinSupply: CoinSupplyFn = async (coinId) => {
		const result = await axios.get(`tickers/${coinId}`);
		return result.data;
	};

	const { data: coinInfoDetail, isLoading: coinInfoLoading } = useQuery({
		queryKey: ['coinDetail', coinId],
		queryFn: () => coinInfo(coinId!),
	});

	const {
		data: coinInfoSupply,
		isLoading: coinSupplyLoading,
		isError,
	} = useQuery({
		queryKey: ['coinSupply', coinId],
		queryFn: () => coinSupply(coinId!),
	});
	return (
		<>
			<ListWrap>
				{
					<>
						<BackButton onClick={() => navi('/')}>목록으로 가기</BackButton>
						<List className='title'>
							<h3>{coinInfoDetail?.name}</h3>
						</List>
						<List className='rank'>
							<ul>
								<li>
									<span>순위</span>
									{coinInfoDetail?.rank}
								</li>
								<li>
									<span>티커</span>
									{coinInfoDetail?.symbol}
								</li>
								<li>
									<span>현재가</span>
									{coinInfoSupply?.quotes.USD.price}
								</li>
							</ul>
						</List>
						<List className='supply'>
							<ul>
								<li>
									<span>총량</span>
									{coinInfoSupply?.total_supply}
								</li>
								<li>
									<span>최대 발행량</span>
									{coinInfoSupply?.max_supply}
								</li>
							</ul>
						</List>
						<List className='description'>{coinInfoDetail?.description}</List>
						<div>
							<PrimeList>
								<li>
									<Link to='price'>Price</Link>
								</li>
								<li>
									<Link to='chart'>Chart</Link>
								</li>
							</PrimeList>
							<div className='content'>
								<Outlet context={!isError && coinInfoSupply} />
							</div>
						</div>
					</>
				}
			</ListWrap>
		</>
	);
}
