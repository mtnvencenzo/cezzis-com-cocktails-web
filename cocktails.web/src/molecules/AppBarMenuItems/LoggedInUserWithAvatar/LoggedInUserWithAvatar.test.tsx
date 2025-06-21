import { describe, test, expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import LoggedInUserWithAvatar from './LoggedInUserWithAvatar';

describe('LoggedIn User With Avatar Menu Item', () => {
    test('renders correctly', async () => {
        await act(async () =>
            render(
                <MemoryRouter>
                    <LoggedInUserWithAvatar testId='test-id-menu-item' setAnchorEl={() => {}} />
                </MemoryRouter>
            )
        );

        const el = screen.getByTestId('test-id-menu-item');
        expect(el).toBeDefined();
    });
});
