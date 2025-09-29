import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import AccountNavigationBar from './AccountNavigationBar';

describe('Account Navigation Bar', () => {
    test('renders correctly', () => {
        render(
            <MemoryRouter>
                <AccountNavigationBar testId='test-id-settings-navbar' fullScreen={false} />
            </MemoryRouter>
        );

        const el = screen.getByTestId('test-id-settings-navbar');
        expect(el).toBeDefined();
    });
});
