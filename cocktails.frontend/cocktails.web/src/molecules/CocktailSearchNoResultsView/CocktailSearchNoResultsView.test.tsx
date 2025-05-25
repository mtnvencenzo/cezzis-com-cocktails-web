import { describe, test, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import CocktailSearchNoResultsView from './CocktailSearchNoResultsView';
import CocktailFiltersLocalStorageService from '../../services/CocktailFiltersLocalStorageService';
import { useCocktailFiltering } from '../../components/CocktailFilterContext';
import GlobalContext from '../../components/GlobalContexts';

describe('Cocktail Search Filter No Results View', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders view with no search term', async () => {
        render(
            <MemoryRouter>
                <CocktailSearchNoResultsView />
            </MemoryRouter>
        );

        const item = await screen.findByText("Hmmm, we didn't find anything for '' using your selected cocktail filters.");
        expect(item).toBeTruthy();
    });

    test('renders view with a search term', async () => {
        render(
            <MemoryRouter>
                <CocktailSearchNoResultsView searchTerm='Peter Giffin' />
            </MemoryRouter>
        );

        const item = await screen.findByText("Hmmm, we didn't find anything for 'Peter Giffin' using your selected cocktail filters.");
        expect(item).toBeTruthy();
    });

    test('contains cocktail list link', async () => {
        render(
            <MemoryRouter>
                <CocktailSearchNoResultsView />
            </MemoryRouter>
        );

        const item = await screen.findByText("Hmmm, we didn't find anything for '' using your selected cocktail filters.");
        expect(item).toBeTruthy();

        const link = (await screen.findByText('View the complete list of cocktails here')) as HTMLAnchorElement;
        expect(link).toBeTruthy();
        expect(link).toHaveClass('inpage-link');
        expect(link.href).toBe('http://localhost:3000/cocktails/list');
    });

    test('contains reset filters button', async () => {
        render(
            <MemoryRouter>
                <CocktailSearchNoResultsView />
            </MemoryRouter>
        );

        const item = await screen.findByText("Hmmm, we didn't find anything for '' using your selected cocktail filters.");
        expect(item).toBeTruthy();

        await screen.findByText('Reset Your Cocktail Filters');
        await screen.findByText('Perhaps your cocktail filters are too selective?');
        const button = await screen.findByText('Reset All Filters');
        expect(button).toBeTruthy();
    });

    test('reset button clears storage filters', async () => {
        const filtersService = new CocktailFiltersLocalStorageService();

        render(
            <MemoryRouter>
                <CocktailSearchNoResultsView />
            </MemoryRouter>
        );

        const item = await screen.findByText("Hmmm, we didn't find anything for '' using your selected cocktail filters.");
        expect(item).toBeTruthy();

        await screen.findByText('Reset Your Cocktail Filters');
        await screen.findByText('Perhaps your cocktail filters are too selective?');
        const button = await screen.findByText('Reset All Filters');
        expect(button).toBeTruthy();

        filtersService.SetAllFilterSelections({
            'spirit-adonis': { selected: true },
            'spirit-last-word': { selected: false },
            'spirit-pimms-cup': { selected: true }
        });

        expect(filtersService.AnySelected('spirit-')).toBeTruthy();

        fireEvent.click(button);

        expect(filtersService.AnySelected('spirit-')).toBeFalsy();
        expect(filtersService.GetAllFilterSelections()).toStrictEqual({
            'spirit-adonis': { selected: false },
            'spirit-last-word': { selected: false },
            'spirit-pimms-cup': { selected: false }
        });
    });

    test('reset button callsback and updates context filter revision', async () => {
        const TestComp = () => {
            const { filtersRevision } = useCocktailFiltering();

            return <Box data-testid={`box-${filtersRevision}`} />;
        };

        render(
            <GlobalContext>
                <MemoryRouter>
                    <Box>
                        <CocktailSearchNoResultsView />
                        <TestComp />
                    </Box>
                </MemoryRouter>
            </GlobalContext>
        );

        await screen.findByTestId('box-0');

        const button = await screen.findByText('Reset All Filters');

        fireEvent.click(button);

        await screen.findByTestId('box-1');
    });
});
