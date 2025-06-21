import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

describe('Scroll To Top', () => {
    test('Renders component', async () => {
        window.scrollTo = vi.fn();

        render(
            <MemoryRouter>
                <ScrollToTop>
                    <Box data-testid='test' />
                </ScrollToTop>
            </MemoryRouter>
        );

        const test = await screen.findByTestId('test');
        expect(test).toBeTruthy();

        expect(window.scrollTo).toHaveBeenCalledTimes(1);
    });
});
