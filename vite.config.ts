import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname)
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                sidepanel: resolve(__dirname, 'sidepanel.html'),
                background: resolve(__dirname, 'src/background/index.ts')
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'chunks/[name].js',
                assetFileNames: 'assets/[name].[ext]'
            }
        }
    }
});
