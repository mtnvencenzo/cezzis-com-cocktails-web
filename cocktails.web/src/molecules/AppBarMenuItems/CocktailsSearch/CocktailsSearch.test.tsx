import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import CocktailsSearch from './CocktailsSearch';

describe('Cocktails Search Menu Item', () => {
    test('renders correctly', () => {
        render(
            <MemoryRouter>
                <CocktailsSearch testId='test-id-menu-item' setAnchorEl={() => {}} />
            </MemoryRouter>
        );

        const el = screen.getByTestId('test-id-menu-item');
        expect(el).toBeDefined();
    });
});
