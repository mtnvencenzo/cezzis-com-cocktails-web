import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        base: '/',
        build: {
            assetsDir: '',
            target: 'esnext'
        },
        server: {
            port: parseInt(process.env.VITE_PORT, 10)
        },
        resolve: {
            conditions: ['mui-modern', 'module', 'browser', 'development|production']
        },
        plugins: [react(), tsconfigPaths(), splitVendorChunkPlugin(), mkcert()]
    });
};
