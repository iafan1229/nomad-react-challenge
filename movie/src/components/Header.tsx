import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { BiSearchAlt } from 'react-icons/bi';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeaderStyle = styled(motion.header)`
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
			}
		}
	}
`;
const Search = styled.div`
	position: relative;
	span {
		position: absolute;
		top: 0;
		left: 0;
	}
`;

export default function Header() {
	const { register } = useForm();
	const { scrollY } = useScroll();
	const backgroundColor = useTransform(
		scrollY,
		[0, 300],
		['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']
	);
	return (
		<HeaderStyle style={{ backgroundColor }}>
			<ul>
				<li>
					<Link to='/'>홈</Link>
				</li>
				<li>
					<Link to='/tv'>TV 시리즈</Link>
				</li>
			</ul>
			<Search>
				<input type='text' {...register('search')} />
				<span>
					<BiSearchAlt />
				</span>
			</Search>
		</HeaderStyle>
	);
}
