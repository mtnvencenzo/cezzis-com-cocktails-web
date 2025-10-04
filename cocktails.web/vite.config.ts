import { defineConfig, loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';
// eslint-disable-next-line import/no-unresolved
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        base: '/',
        build: {
            target: 'esnext',
            minify: 'esbuild'
        },
        server: {
            port: parseInt(process.env.VITE_PORT, 10)
        },
        plugins: [react(), tsconfigPaths(), mkcert()]
    });
};
