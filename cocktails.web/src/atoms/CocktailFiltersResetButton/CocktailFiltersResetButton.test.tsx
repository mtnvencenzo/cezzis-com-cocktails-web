import { describe, test, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CocktailFiltersResetButton from './CocktailFiltersResetButton';
import CocktailFiltersLocalStorageService from '../../services/CocktailFiltersLocalStorageService';

describe('Cocktail Filters Reset Button', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders button with default props specified', async () => {
        render(
            <MemoryRouter>
                <CocktailFiltersResetButton testId='testid-btn' />
            </MemoryRouter>
        );

        const item = await screen.findByTestId('testid-btn');
        expect(item).toBeTruthy();
        expect(item).not.toHaveAttribute('disabled');

        expect(item).toHaveClass('MuiButton-colorPrimary');
        expect(item).toHaveClass('MuiButton-outlined');
        expect(item).toHaveClass('MuiButton-outlinedPrimary');
        expect(item).toHaveTextContent('Reset All Filters');
    });

    test('renders button with disabled prop true specified', async () => {
        render(
            <MemoryRouter>
                <CocktailFiltersResetButton testId='testid-btn' disabled />
            </MemoryRouter>
        );

        const item = await screen.findByTestId('testid-btn');
        expect(item).toBeTruthy();
        expect(item).toHaveAttribute('disabled');

        expect(item).toHaveClass('MuiButton-colorPrimary');
        expect(item).toHaveClass('MuiButton-outlined');
        expect(item).toHaveClass('MuiButton-outlinedPrimary');
        expect(item).toHaveTextContent('Reset All Filters');
    });

    test('renders button with disabled prop false specified', async () => {
        render(
            <MemoryRouter>
                <CocktailFiltersResetButton testId='testid-btn' disabled={false} />
            </MemoryRouter>
        );

        const item = await screen.findByTestId('testid-btn');
        expect(item).toBeTruthy();
        expect(item).not.toHaveAttribute('disabled');

        expect(item).toHaveClass('MuiButton-colorPrimary');
        expect(item).toHaveClass('MuiButton-outlined');
        expect(item).toHaveClass('MuiButton-outlinedPrimary');
        expect(item).toHaveTextContent('Reset All Filters');
    });

    test('renders button and performs click event', async () => {
        const filtersService = new CocktailFiltersLocalStorageService();
        const handleReset = vi.fn();

        render(
            <MemoryRouter>
                <CocktailFiltersResetButton testId='testid-btn' onReset={handleReset} />
            </MemoryRouter>
        );

        const item = await screen.findByTestId('testid-btn');
        expect(item).toBeTruthy();
        expect(item).not.toHaveAttribute('disabled');

        expect(item).toHaveClass('MuiButton-colorPrimary');
        expect(item).toHaveClass('MuiButton-outlined');
        expect(item).toHaveClass('MuiButton-outlinedPrimary');
        expect(item).toHaveTextContent('Reset All Filters');

        filtersService.SetAllFilterSelections({
            'spirit-adonis': { selected: true },
            'spirit-last-word': { selected: false },
            'spirit-pimms-cup': { selected: true }
        });

        expect(filtersService.AnySelected('spirit-')).toBeTruthy();

        fireEvent.click(item);

        expect(filtersService.AnySelected('spirit-')).toBeFalsy();
        expect(filtersService.GetAllFilterSelections()).toStrictEqual({
            'spirit-adonis': { selected: false },
            'spirit-last-word': { selected: false },
            'spirit-pimms-cup': { selected: false }
        });

        expect(handleReset).toHaveBeenCalledTimes(1);
    });

    test('renders button and forwards sx props', async () => {
        render(
            <MemoryRouter>
                <CocktailFiltersResetButton
                    testId='testid-btn'
                    sx={{
                        paddingTop: '100px'
                    }}
                />
            </MemoryRouter>
        );

        const item = await screen.findByTestId('testid-btn');
        expect(item).toBeTruthy();
        expect(item).not.toHaveAttribute('disabled');

        expect(item).toHaveClass('MuiButton-colorPrimary');
        expect(item).toHaveClass('MuiButton-outlined');
        expect(item).toHaveClass('MuiButton-outlinedPrimary');
        expect(item).toHaveTextContent('Reset All Filters');
        expect(item).toHaveStyle('padding-top: 100px');
    });
});
