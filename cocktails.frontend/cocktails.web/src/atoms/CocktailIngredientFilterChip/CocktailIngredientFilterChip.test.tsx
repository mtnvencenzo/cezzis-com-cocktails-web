import { describe, test, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CocktailIngredientFilterChip from './CocktailIngredientFilterChip';
import CocktailFiltersLocalStorageService from '../../services/CocktailFiltersLocalStorageService';

describe('Cocktail Ingredient Filter Chip', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders chip with default props specified', async () => {
        render(
            <MemoryRouter>
                <CocktailIngredientFilterChip id='adonis' label='The Adonis' />
            </MemoryRouter>
        );

        const item = await screen.findByText('The Adonis');
        expect(item).toBeTruthy();
        expect(item).toHaveClass('MuiChip-label MuiChip-labelSmall');

        const parent = item.parentElement as HTMLDivElement;
        expect(parent).toBeTruthy();
        expect(parent).toHaveRole('button');
        expect(parent).toHaveClass('MuiChip-filled');
        expect(parent).toHaveClass('MuiChip-clickable');
        expect(parent).toHaveClass('MuiChip-sizeSmall');
        expect(parent).toHaveClass('MuiChip-colorSecondary');
        expect(parent).not.toHaveAttribute('aria-disabled', 'true');
    });

    test('renders chip with disbaled prop true', async () => {
        render(
            <MemoryRouter>
                <CocktailIngredientFilterChip id='adonis' label='The Adonis' disabled />
            </MemoryRouter>
        );

        const item = await screen.findByText('The Adonis');
        expect(item).toBeTruthy();
        expect(item).toHaveClass('MuiChip-label MuiChip-labelSmall');

        const parent = item.parentElement as HTMLDivElement;
        expect(parent).toBeTruthy();
        expect(parent).toHaveRole('button');
        expect(parent).toHaveClass('MuiChip-filled');
        expect(parent).toHaveClass('MuiChip-clickable');
        expect(parent).toHaveClass('MuiChip-sizeSmall');
        expect(parent).toHaveClass('MuiChip-colorSecondary');
        expect(parent).toHaveAttribute('aria-disabled', 'true');
    });

    test('renders chip with selection override true when chip not selected', async () => {
        render(
            <MemoryRouter>
                <CocktailIngredientFilterChip id='adonis' label='The Adonis' selectionOverride />
            </MemoryRouter>
        );

        const item = await screen.findByText('The Adonis');
        expect(item).toBeTruthy();
        expect(item).toHaveClass('MuiChip-label MuiChip-labelSmall');

        const parent = item.parentElement;
        expect(parent).toBeTruthy();
        expect(parent).toHaveRole('button');
        expect(parent).toHaveClass('MuiChip-filled');
        expect(parent).toHaveClass('MuiChip-clickable');
        expect(parent).toHaveClass('MuiChip-sizeSmall');
        expect(parent).toHaveClass('MuiChip-colorPrimary');
        expect(parent).not.toHaveAttribute('aria-disabled', 'true');
    });

    test('renders chip with selection override false when chip not selected', async () => {
        render(
            <MemoryRouter>
                <CocktailIngredientFilterChip id='adonis' label='The Adonis' selectionOverride={false} />
            </MemoryRouter>
        );

        const item = await screen.findByText('The Adonis');
        expect(item).toBeTruthy();
        expect(item).toHaveClass('MuiChip-label MuiChip-labelSmall');

        const parent = item.parentElement as HTMLDivElement;
        expect(parent).toBeTruthy();
        expect(parent).toHaveRole('button');
        expect(parent).toHaveClass('MuiChip-filled');
        expect(parent).toHaveClass('MuiChip-clickable');
        expect(parent).toHaveClass('MuiChip-sizeSmall');
        expect(parent).toHaveClass('MuiChip-colorSecondary');
        expect(parent).not.toHaveAttribute('aria-disabled', 'true');
    });

    test('invokes supplied click callback', async () => {
        const filtersService = new CocktailFiltersLocalStorageService();

        render(
            <MemoryRouter>
                <CocktailIngredientFilterChip id='adonis' label='The Adonis' />
            </MemoryRouter>
        );

        const item = await screen.findByText('The Adonis');
        expect(item).toBeTruthy();
        expect(item).toHaveClass('MuiChip-label MuiChip-labelSmall');

        const parent = item.parentElement as HTMLDivElement;
        expect(parent).toBeTruthy();
        expect(parent).toHaveRole('button');
        expect(parent).toHaveClass('MuiChip-filled');
        expect(parent).toHaveClass('MuiChip-clickable');
        expect(parent).toHaveClass('MuiChip-sizeSmall');
        expect(parent).toHaveClass('MuiChip-colorSecondary');
        expect(parent).not.toHaveAttribute('aria-disabled', 'true');

        fireEvent.click(parent);

        // check local storage
        expect(filtersService.IsSelected('adonis')).toBeTruthy();

        expect(parent).toBeTruthy();
        expect(parent).toHaveRole('button');
        expect(parent).toHaveClass('MuiChip-filled');
        expect(parent).toHaveClass('MuiChip-clickable');
        expect(parent).toHaveClass('MuiChip-sizeSmall');
        expect(parent).toHaveClass('MuiChip-colorPrimary');
        expect(parent).not.toHaveAttribute('aria-disabled', 'true');
        expect(parent).not.toHaveClass('MuiChip-colorSecondary');

        fireEvent.click(parent);

        // check local storage
        expect(filtersService.IsSelected('adonis')).toBeFalsy();

        expect(parent).toBeTruthy();
        expect(parent).toHaveRole('button');
        expect(parent).toHaveClass('MuiChip-filled');
        expect(parent).toHaveClass('MuiChip-clickable');
        expect(parent).toHaveClass('MuiChip-sizeSmall');
        expect(parent).toHaveClass('MuiChip-colorSecondary');
        expect(parent).not.toHaveAttribute('aria-disabled', 'true');
        expect(parent).not.toHaveClass('MuiChip-colorPrimary');
    });

    test('renders chip as selected after clicked and back again', async () => {
        const handleClick = vi.fn();

        render(
            <MemoryRouter>
                <CocktailIngredientFilterChip id='adonis' label='The Adonis' onClick={handleClick} />
            </MemoryRouter>
        );

        const item = await screen.findByText('The Adonis');
        expect(item).toBeTruthy();
        expect(item).toHaveClass('MuiChip-label MuiChip-labelSmall');

        const parent = item.parentElement as HTMLDivElement;

        fireEvent.click(parent);
        fireEvent.click(parent);

        expect(handleClick).toHaveBeenCalledTimes(2);
    });
});
