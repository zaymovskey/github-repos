import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
        plugins: [react()],
        define: {
            __GITHUB_KEY__: JSON.stringify(env.GITHUB_KEY),
        },
        envDir: resolve(__dirname),
    };
});
