import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartData {
	time_open: string;
	time_close: string;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	market_cap: string;
}
type ChartType = () => Promise<ChartData[]>;

export default function Chart() {
	const { coinId } = useParams();

	const [chart, setChart] = useState<ChartData[]>([]);

	const chartData: ChartType = async () => {
		const result = await axios.get(
			`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${
				coinId?.split('/')[0]
			}`
		);
		return result.data;
	};

	useEffect(() => {
		chartData().then((res) => setChart(res));
	}, []);

	return (
		<>
			<div>
				<ReactApexChart
					type='candlestick'
					series={[
						{
							data: chart?.map((price) => {
								return [
									Number(price.time_close) * 1000,
									Number(price.open),
									Number(price.high),
									Number(price.low),
									Number(price.close),
								];
							}),
						},
					]}
					options={{
						chart: {
							type: 'candlestick',
							height: 350,
							foreColor: '#9c88ff',
						},
						xaxis: {
							type: 'datetime',
							labels: {
								style: {
									colors: '#9c88ff',
								},
							},
						},
						tooltip: {
							theme: 'dark',
						},
					}}
					height={350}
				/>
			</div>
		</>
	);
}
