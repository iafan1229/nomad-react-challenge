import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { BiSearchAlt } from 'react-icons/bi';
import { useScroll, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeaderStyle = styled(motion.header)`
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
			&:first-child {
				width: 80px;
				height: 80px;
				img {
					width: 100%;
				}
			}
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

	return (
		<HeaderStyle
			initial={{ backgroundColor: 'transparent' }}
			onScroll={{ backgroundColor: 'red' }}>
			<ul>
				<li>
					<Link to='/'>
						<img src={`${process.env.PUBLIC_URL}/logo.png`} alt='로고'></img>
					</Link>
				</li>
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
