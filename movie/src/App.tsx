import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Content from './components/Content';
import { Outlet } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0 ;
    padding: 0 ;
    box-sizing: border-box;
  }
  a{
    color: #000;
    text-decoration: none;
  }
`;

function App() {
	return (
		<div style={{ height: '150vh' }}>
			<GlobalStyle />
			<Header />
			<Outlet />
		</div>
	);
}

export default App;
