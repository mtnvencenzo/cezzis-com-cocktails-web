import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import UserSettings from './UserSettings';

describe('User Settings Menu Item', () => {
    test('renders correctly', () => {
        render(
            <MemoryRouter>
                <UserSettings testId='test-id-menu-item' setAnchorEl={() => {}} />
            </MemoryRouter>
        );

        const el = screen.getByTestId('test-id-menu-item');
        expect(el).toBeDefined();
    });
});
