import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { CocktailSearchContextProvider, useCocktailSearch } from './CocktailSearchContext';

describe('Cocktail Search Context', () => {
    const TestComp = () => {
        const { noItems, setNoItems } = useCocktailSearch();

        useEffect(() => {
            if (noItems === false) {
                setNoItems(true);
            }
        }, [noItems, setNoItems]);

        return <Box data-testid={noItems} />;
    };

    test('Updates no items within a provider', async () => {
        render(
            <CocktailSearchContextProvider>
                <TestComp />
            </CocktailSearchContextProvider>
        );

        const test = await screen.findByTestId('true');
        expect(test).toBeTruthy();
    });

    test('Doesnt update no items when not within a provider', async () => {
        render(<TestComp />);

        const test = await screen.findByTestId('false');
        expect(test).toBeTruthy();
    });
});
