const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * proxy error와
 * payment required 에러가 나와서
 * 임시로 설치한 proxy
 */
module.exports = (app: any) => {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'https://api.coinpaprika.com/v1/',
			changeOrigin: true,
		})
	);
};
