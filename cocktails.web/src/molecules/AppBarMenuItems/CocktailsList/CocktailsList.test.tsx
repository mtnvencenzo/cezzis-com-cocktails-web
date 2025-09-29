import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import CocktailsList from './CocktailsList';

describe('Cocktails List Menu Item', () => {
    test('renders correctly', () => {
        render(
            <MemoryRouter>
                <CocktailsList testId='test-id-menu-item' setAnchorEl={() => {}} />
            </MemoryRouter>
        );

        const el = screen.getByTestId('test-id-menu-item');
        expect(el).toBeDefined();
    });
});
