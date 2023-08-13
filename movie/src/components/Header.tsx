import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<header>
			<ul>
				<li>
					<Link to='/'>Movie</Link>
				</li>
				<li>
					<Link to='/tv'>Tv</Link>
				</li>
			</ul>
		</header>
	);
}
