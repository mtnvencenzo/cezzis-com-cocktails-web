import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import GlobalContext from './GlobalContexts';

describe('Global contexts', () => {
    test('renders children', async () => {
        render(
            <GlobalContext>
                <div data-testid='my-test-div' />
            </GlobalContext>
        );

        const div = screen.findByTestId('my-test-div');
        expect(div).toBeTruthy();
    });
});
