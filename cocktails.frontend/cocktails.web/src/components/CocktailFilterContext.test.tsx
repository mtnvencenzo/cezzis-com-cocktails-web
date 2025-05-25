import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { CocktailFilterContextProvider, useCocktailFiltering } from './CocktailFilterContext';

describe('Cocktail Filter Context', () => {
    const TestComp = () => {
        const { filtersRevision, setFiltersRevision } = useCocktailFiltering();

        useEffect(() => {
            if (filtersRevision === 0) {
                setFiltersRevision();
            }
        }, [filtersRevision, setFiltersRevision]);

        return <Box data-testid={filtersRevision} />;
    };

    test('Updates filter revision within a provider', async () => {
        render(
            <CocktailFilterContextProvider>
                <TestComp />
            </CocktailFilterContextProvider>
        );

        const test = await screen.findByTestId('1');
        expect(test).toBeTruthy();
    });

    test('Doesnt updates filter revision when not within a provider', async () => {
        render(<TestComp />);

        const test = await screen.findByTestId('0');
        expect(test).toBeTruthy();
    });
});
