import { defineConfig, loadEnv } from 'vite';

import fs from 'fs';
import path from 'path';

import restart from 'vite-plugin-restart';
import vue from '@vitejs/plugin-vue';

async function getServerConf() {
	let https = null;
	try {
		https = {
			key: fs.readFileSync(process.env.VITE_SERVER_KEY),
			cert: fs.readFileSync(process.env.VITE_SERVER_CERT),
		};
	} catch (err) {
		await getServerConf();
	}
	let certpath = process.env.VITE_SERVER_CERTPATH;
	return { https, certpath };
}

export default defineConfig(async ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), 'VITE_SERVER') };

	const { https, certpath } = await getServerConf();

	return {
		server: {
			host: true,
			port: 5173,
			https: https,
		},
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './node_modules'),
				'@': path.resolve(__dirname, './src'),
			},
		},
		plugins: [
			restart({
				restart: ['tsconfig.json', certpath],
			}),
			vue(),
		],
	};
});
