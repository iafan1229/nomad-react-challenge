import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { options } from '../api/api';

const SlideWrap = styled.div`
	position: relative;
	width: 100%;

	.slider-box {
		display: flex;
		justify-content: space-around;
		&:nth-child(2) {
			display: none;
		}
	}
	.combine-text {
		transform: scale(1);
		position: relative;
		transition: all 0.4s;
		&:hover {
			transform: scale(1.2);
			span {
				opacity: 1;
			}
		}
		span {
			position: absolute;
			display: block;
			bottom: 0;
			width: 100%;
			background: rgba(0, 0, 0, 0.7);
			padding: 10px 0;
			color: #fff;
			text-align: center;
			opacity: 0;
		}
	}
	button {
		position: absolute;
		width: 30px;
		height: 375px;
		top: 0;
		background: #303030;
		color: #fff;
		cursor: pointer;
		svg {
			font-size: 18px;
		}
		&:first-of-type {
			left: 0;
		}
		&:last-of-type {
			right: 0;
		}
	}
`;

const Box = styled(motion.div)`
	width: 250px;
	text-align: center;
	flex-shrink: 0;
	background-color: white;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 2px 3px rgba(0, 0, 0, 0.06);
	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

// animation
const boxVariants = {
	entry: (back: boolean) => ({
		x: back ? -500 : 500,
		opacity: 0,
	}),
	center: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.5 },
	},
	exit: (back: boolean) => ({
		x: back ? 500 : -500,
		opacity: 0,
		transition: { duration: 0.5 },
	}),
};

export default function Slider({ movieData }: { movieData: string }) {
	const [movieList, setMovieList] = useState<any>([]);
	const [movieIdx, setMovieIdx] = useState(1);
	const [showingMovieList, setShowingMovieList] = useState<any>([]);
	const [back, setBack] = useState(false);

	const nextPlease = () => {
		setBack(false);
		setMovieIdx((prevMovieIdx) => (prevMovieIdx >= 6 ? 1 : prevMovieIdx + 1));
	};
	const prevPlease = () => {
		setBack(true);
		setMovieIdx((prevMovieIdx) => (prevMovieIdx <= 1 ? 6 : prevMovieIdx - 1));
	};

	async function getData(api: string) {
		await fetch(api, options)
			.then((response) => response.json())
			.then((response) => setMovieList(response.results))
			.catch((err) => console.error(err));
	}

	useEffect(() => {
		getData(movieData);
	}, []);

	useEffect(() => {
		setShowingMovieList([...movieList].splice(movieIdx - 1, 6));
	}, [movieList, movieIdx]);
	return (
		<SlideWrap>
			<AnimatePresence custom={back}>
				<motion.div
					className='slider-box'
					custom={back}
					variants={boxVariants}
					initial='entry'
					animate='center'
					exit='exit'
					key={movieIdx}>
					{showingMovieList.map((el: any, idx: number) => {
						return (
							<div className='combine-text'>
								<Box>
									<img
										src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
										alt={el.original_title}
									/>
								</Box>
								<span>{el.original_title}</span>
							</div>
						);
					})}
				</motion.div>
			</AnimatePresence>
			<button onClick={prevPlease}>
				<BiSolidLeftArrow />
			</button>
			<button onClick={nextPlease}>
				<BiSolidRightArrow />
			</button>
		</SlideWrap>
	);
}
