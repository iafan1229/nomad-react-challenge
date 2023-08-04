import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ThemeProvider, styled } from 'styled-components';
import { darkTheme, lightTheme } from './components/theme';
import { CiDark } from 'react-icons/ci';
import { CgSun } from 'react-icons/cg';

const queryClient = new QueryClient();

const Btn = styled.button`
	position: fixed;
	bottom: 10px;
	left: 10px;
	width: 80px;
	height: 80px;
	background-color: transparent;
	border: 1px solid ${(props) => props.theme.textColor};
	border-radius: 10px;
`;

const CoinWrap = styled.div`
	max-width: 900px;
	margin: 0 auto;
	text-align: center;
`;

const App = () => {
	const [dark, setDark] = useState(true);
	return (
		<ThemeProvider theme={dark ? darkTheme : lightTheme}>
			<QueryClientProvider client={queryClient}>
				<Btn onClick={() => setDark(!dark)}>
					{dark ? <CgSun size={50} color='white' /> : <CiDark size={50} />}
				</Btn>
				<GlobalStyle />
				<CoinWrap>
					<Outlet />
				</CoinWrap>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

export default App;
