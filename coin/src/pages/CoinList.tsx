import { useParams } from 'react-router-dom';

export default function CoinList() {
	const { coinId } = useParams();
	return <>{coinId}</>;
}
