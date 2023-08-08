import { defineConfig, loadEnv } from 'vite';
import smallstep from 'vite-plugin-smallstep';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(async ({ mode }) => {
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
            vue(),
            smallstep({
                steppath: process.env.VITE_STEPPATH,
            }),
        ],
    };
});
