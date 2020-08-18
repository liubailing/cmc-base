// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import { baseUrl, authUrl } from './config.routes';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
	hash: true,
	antd: {},
	dva: {
		hmr: true,
	},
	locale: {
		// enable: false,
		// default zh-CN
		default: 'zh-CN',
		// default true, when it is true, will use `navigator.language` overwrite default
		antd: true,
		baseNavigator: true,
	},
	dynamicImport: {
		loading: '@/components/PageLoading/index',
	},
	targets: {
		ie: 11,
	},
	// umi routes: https://umijs.org/docs/routing
	routes: [
		{
			path: '/',
			component: '../layouts/BlankLayout',
			routes: [
				{
					path: '/user',
					component: '../layouts/UserLayout',
					routes: baseUrl,
				},
				{
					path: '/',
					component: '../layouts/BasicLayout',
					Routes: ['src/pages/Authorized'],
					authority: ['admin', 'user'],
					routes: authUrl,
				},
			],
		},
	],
	// Theme for antd: https://ant.design/docs/react/customize-theme-cn
	theme: {
		// ...darkTheme,
		'primary-color': defaultSettings.primaryColor,
	},
	// @ts-ignore
	title: false,
	ignoreMomentLocale: true,
	proxy: proxy[REACT_APP_ENV || 'dev'],
	manifest: {
		basePath: '/',
	},
});
