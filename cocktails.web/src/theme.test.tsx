import { describe, expect, test } from 'vitest';
import theme from './theme';

describe('Theme', () => {
    test('creates theme', async () => {
        const t = theme;

        // typography
        expect(t.typography.fontFamily).toBe('Segoe UI, sans-serif');

        // palette
        expect(t.palette.primary.main).toBe('#010101');
        expect(t.palette.secondary.main).toBe('#f0f0f0');

        // mui papaer
        expect(t.components?.MuiPaper?.defaultProps?.elevation).toBe(4);
    });
});
