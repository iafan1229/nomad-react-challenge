import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import CoinList from './pages/CoinList';
import List from './pages/List';
import Price from './components/Price';
import Chart from './components/Chart';

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
				path: ':coinId/',
				element: <CoinList />,
				children: [
					{
						path: 'price',
						element: <Price />,
					},
					{
						path: 'chart',
						element: <Chart />,
					},
				],
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
