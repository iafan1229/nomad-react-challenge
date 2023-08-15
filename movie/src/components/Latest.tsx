import { useState, useEffect } from 'react';
import { options } from '../api/api';
import styled from 'styled-components';

const MovieScreen = styled.div`
	height: 80vh;
	background-repeat: no-repeat;
	background-size: cover;
`;

export default function Latest() {
	const [screen, setScreen] = useState<any>({});
	async function getTopMovie() {
		const id = await fetch(
			'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
			options
		)
			.then((res) => res.json())
			.then((res) => res.results[0].id);

		await fetch(
			`https://api.themoviedb.org/3/movie/${id}?language=en-US`,
			options
		)
			.then((response) => response.json())
			.then((response) => setScreen(response))
			.catch((err) => console.error(err));
	}

	useEffect(() => {
		getTopMovie();
	}, []);
	return (
		<>
			<MovieScreen
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${screen.backdrop_path})`,
				}}></MovieScreen>
		</>
	);
}
