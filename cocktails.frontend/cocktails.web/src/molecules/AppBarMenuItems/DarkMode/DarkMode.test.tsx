import { describe, test, expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import DarkMode from './DarkMode';

describe('Dark Mode Menu Item', () => {
    test('renders correctly', async () => {
        await act(async () =>
            render(
                <MemoryRouter>
                    <DarkMode testId='test-id-menu-item' defaultChecked />
                </MemoryRouter>
            )
        );

        const el = screen.getByTestId('test-id-menu-item');
        expect(el).toBeDefined();
    });
});
