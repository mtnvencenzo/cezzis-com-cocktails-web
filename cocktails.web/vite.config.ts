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
            assetsDir: '',
            target: 'esnext',
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        // 1. Group all Node.js modules into a 'vendor' chunk
                        if (id.includes('node_modules')) {
                            // You can further split vendor chunks by package if needed
                            // For example, to create a separate chunk for 'react' and 'react-dom':
                            if (id.includes('react') || id.includes('react-dom')) {
                                return 'vendor-react';
                            }
                            // 2. Create a specific chunk for a large utility library
                            if (id.includes('mui')) {
                                return 'vendor-mui';
                            }

                            // 2. Create a specific chunk for a large utility library
                            if (id.includes('kelso-component')) {
                                return 'vendor-mtnvencenzo';
                            }

                            // 2. Create a specific chunk for a large utility library
                            if (id.includes('lodash')) {
                                return 'vendor-lodash';
                            }

                            return 'vendor'; // Default vendor chunk for other node_modules
                        }

                        // 4. Group common components or shared logic
                        if (id.includes('src/components') || id.includes('src/utils') || id.includes('src/services')) {
                            return 'common-components';
                        }

                        // 4. Group common components or shared logic
                        if (id.includes('src/api/cocktailsApi')) {
                            return 'api-cocktails';
                        }

                        // 5. Default behavior: let Rollup handle remaining files
                        // Returning `undefined` or nothing allows Rollup's default chunking strategy
                        // to take over for files not explicitly assigned to a manual chunk.
                        return undefined;
                    },
                    // Optional: Customize chunk file names
                    chunkFileNames: 'assets/[name]-[hash].js',
                    entryFileNames: 'assets/[name]-[hash].js',
                    assetFileNames: 'assets/[name]-[hash][extname]'
                }
            }
        },
        server: {
            port: parseInt(process.env.VITE_PORT, 10)
        },
        resolve: {
            conditions: ['mui-modern', 'module', 'browser', 'local|development|production']
        },
        plugins: [react(), tsconfigPaths(), mkcert()],
        optimizeDeps: {
            include: ['@mui/material', '@mui/system', '@mui/utils', '@mui/base', '@mui/icons-material', 'lodash']
        }
    });
};
