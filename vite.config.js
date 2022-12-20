import { defineConfig, loadEnv } from 'vite';

import fs from 'fs';
import path from 'path';

import restart from 'vite-plugin-restart';
import vue from '@vitejs/plugin-vue';

async function getHttps() {
    let cert, key;
    try {
        cert = fs.readFileSync(process.env.VITE_SERVER_CRT);
        key = fs.readFileSync(process.env.VITE_SERVER_KEY);
    } catch (err) {
        await getHttps();
    }
    return { cert: cert, key: key };
}

export default defineConfig(async ({ mode }) => {
    process.env = {
        ...process.env,
        ...loadEnv(mode, process.cwd(), 'VITE_SERVER'),
    };
    console.time('https');
    const https = await getHttps();
    console.timeEnd('https');
    console.log(https);

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
                restart: [
                    path.relative(__dirname, process.env.VITE_SERVER_CRT),
                    'tsconfig.json',
                ],
            }),
            vue(),
        ],
    };
});
