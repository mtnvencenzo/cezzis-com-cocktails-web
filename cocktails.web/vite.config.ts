import { defineConfig, loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
// eslint-disable-next-line import/no-unresolved
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        base: '/',
        build: {
            target: 'esnext',
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        // 1. Group all Node.js modules into a 'vendor' chunk
                        if (id.includes('node_modules')) {
                            return 'vendor'; // Default vendor chunk for other node_modules
                        }

                        // 5. Default behavior: let Rollup handle remaining files
                        // Returning `undefined` or nothing allows Rollup's default chunking strategy
                        // to take over for files not explicitly assigned to a manual chunk.
                        return undefined;
                    }
                }
            }
        },
        server: {
            port: parseInt(process.env.VITE_PORT, 10)
        },
        resolve: {
            conditions: ['mui-modern', 'module', 'browser', 'local|development|production']
        },
        plugins: [react(), tsconfigPaths()]
        // plugins: [react(), tsconfigPaths(), mkcert()] // FOR SSL
    });
};
