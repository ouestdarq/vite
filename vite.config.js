import { defineConfig, loadEnv } from 'vite';
import restart from 'vite-plugin-restart';
import smallstep from 'vite-plugin-smallstep';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(async ({ mode }) => {
    process.env = {
        ...process.env,
        ...loadEnv(mode, process.cwd(), 'VITE_SERVER'),
    };

    return {
        server: {
            host: true,
            port: 5173,
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
            smallstep({
                crt: process.env.VITE_SERVER_CRT,
                key: process.env.VITE_SERVER_KEY,
            }),
        ],
    };
});
