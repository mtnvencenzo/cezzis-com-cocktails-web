import { describe, test, expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import Logout from './Logout';

describe('Logout Menu Item', () => {
    test('renders correctly', async () => {
        await act(async () =>
            render(
                <MemoryRouter>
                    <Logout testId='test-id-menu-item' setAnchorEl={() => {}} />
                </MemoryRouter>
            )
        );

        const el = screen.getByTestId('test-id-menu-item');
        expect(el).toBeDefined();
    });
});
