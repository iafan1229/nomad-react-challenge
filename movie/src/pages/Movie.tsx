import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from '../components/Slider';
import Screen from '../components/Latest';

// style
const Wrapper = styled.div`
	justify-content: center;
	align-items: center;
	flex-direction: column;
	h2 {
		width: 100%;
		padding: 0 10px;
		padding-bottom: 10px;
		padding-top: 30px;
		text-align: left;
	}
`;

// render
function Movie() {
	return (
		<Wrapper>
			<Screen />
			<h2>Popular Movies</h2>
			<Slider movieData='https://api.themoviedb.org/3/movie/popular?language=en-KO&page=1' />
			<h2>Top Rated Movies</h2>
			<Slider movieData='https://api.themoviedb.org/3/movie/top_rated?language=en-KO&page=1' />
			<h2>Upcoming</h2>
			<Slider movieData='https://api.themoviedb.org/3/movie/upcoming?language=en-KO&page=1' />
		</Wrapper>
	);
}

export default Movie;
