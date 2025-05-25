import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CocktailFavoritesNoResultsView from './CocktailFavoritesNoResultsView';

describe('Cocktail Search Filter No Results View', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders view', async () => {
        render(
            <MemoryRouter>
                <CocktailFavoritesNoResultsView />
            </MemoryRouter>
        );

        const item = await screen.findByText("Hmmm, you don't appear to have any selected cocktail favorites.");
        expect(item).toBeTruthy();
    });

    test('contains cocktail list link', async () => {
        render(
            <MemoryRouter>
                <CocktailFavoritesNoResultsView />
            </MemoryRouter>
        );

        const item = await screen.findByText("Hmmm, you don't appear to have any selected cocktail favorites.");
        expect(item).toBeTruthy();

        const link = (await screen.findByText('View the complete list of cocktails here')) as HTMLAnchorElement;
        expect(link).toBeTruthy();
        expect(link).toHaveClass('inpage-link');
        expect(link.href).toBe('http://localhost:3000/cocktails/list');
    });
});
