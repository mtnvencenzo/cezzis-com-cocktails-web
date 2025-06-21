// eslint-disable-next-line import/no-unresolved
import { configDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        globals: true,

        reporters: ['junit', 'verbose'],
        outputFile: {
            junit: '../.coverage/junit-report.xml'
        },

        coverage: {
            provider: 'istanbul', // or 'v8'
            reporter: ['text', 'html', 'cobertura'],
            reportsDirectory: '../.coverage'
        },

        exclude: [...configDefaults.exclude, '**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**']
    }
});
