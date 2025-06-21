import { describe, test, expect } from 'vitest';
import trimWhack from './trimWhack';

describe('Trim Whack', () => {
    test('returns null when string is null', async () => {
        const str = null;

        const actual = trimWhack(str);

        expect(actual).toBeNull();
    });

    test('returns undefined when string is undefined', async () => {
        const str = undefined;

        // checking actual
        const actual = trimWhack(str);

        expect(actual).toBeUndefined();
    });

    test('returns unaltered string when doesnt end in whack', async () => {
        const str = 'this is my string';

        const actual = trimWhack(str);

        expect(actual).toBe(str);
    });

    test('returns unaltered string when string is empty', async () => {
        const str = '';

        const actual = trimWhack(str);

        expect(actual).toBe(str);
    });

    test('removes whack when string ends in a whack', async () => {
        const str = 'This is my string/';

        const actual = trimWhack(str);

        expect(actual).toBe('This is my string');
    });
});
