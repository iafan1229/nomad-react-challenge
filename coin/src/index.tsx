import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import CoinList from './pages/CoinList';
import List from './pages/List';

/**
 * 라우터들이 존재함
 */
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <List />,
			},
			{
				path: ':coinId',
				element: <CoinList />,
			},
		],
	},
]);

const rootElement = document.getElementById('root');

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
} else {
	console.error("Root element with ID 'root' not found.");
}
