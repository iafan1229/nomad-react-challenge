import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { BiSearchAlt } from 'react-icons/bi';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeaderStyle = styled(motion.header)`
	z-index: 10;
	height: 10vh;
	position: fixed;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 1vw;
	ul {
		display: flex;
		align-items: center;
		gap: 30px;
		li {
			a {
				font-size: 25px;
				font-weight: bold;
				color: inherit;
			}
		}
	}
`;
const Search = styled.div`
	margin-left: 5vw;
	position: relative;
	input {
		width: 0;
		color: inherit;
		font-size: 18px;
	}
	span {
		cursor: pointer;
		position: absolute;
		top: 50%;
		left: -2vw;
		transform: translateY(-50%);
	}
	svg {
		width: 20px;
		height: 20px;
		color: inherit;
	}
	.search-content {
		position: absolute;
		top: calc(100% + 3px);
		left: 0;
		width: 100%;
		height: 30px;
		background-color: #fff;
	}
`;

const Input = styled(motion.input)`
	background-color: transparent;
	outline: none;
	border: none;
	border-bottom: 1px solid gray;
`;

export default function Header() {
	const [openSearch, setOpenSearch] = useState(false);
	const { register, watch, handleSubmit } = useForm();
	const { scrollY } = useScroll();
	const [keyword, setKeyword] = useState('');

	const backgroundColor = useTransform(
		scrollY,
		[0, 300],
		['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']
	);
	const color = useTransform(
		scrollY,
		[0, 300],
		['rgba(255,255,255,1)', 'rgba(255,255,255,1)']
	);
	const watchedValue = watch('search');

	return (
		<HeaderStyle style={{ backgroundColor, color }}>
			<ul>
				<li>
					<Link to='/'>홈</Link>
				</li>
				<li>
					<Link to='/tv'>TV 시리즈</Link>
				</li>
			</ul>
			<Search>
				<form onSubmit={handleSubmit((data) => console.log(data))}>
					<Input
						type='text'
						{...register('search')}
						animate={{
							width: openSearch ? '180px' : 0,
							padding: openSearch ? '7px' : 0,
						}}
					/>
				</form>
				<span onClick={() => setOpenSearch(!openSearch)}>
					<BiSearchAlt />
				</span>
			</Search>
		</HeaderStyle>
	);
}
