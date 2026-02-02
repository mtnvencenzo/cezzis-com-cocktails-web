import { describe, test, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CocktailIngredientFilterChipGroup from './CocktailIngredientFilterChipGroup';
import { IngredientFilterModel } from '../../api/cocktailsApi';

describe('Cocktail Ingredient Filter Chip Group', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders chip group with no filters specified', async () => {
        const filters: IngredientFilterModel[] = [];

        render(
            <MemoryRouter>
                <CocktailIngredientFilterChipGroup filters={filters} title='My Chips' />
            </MemoryRouter>
        );

        const title = (await screen.findByText('My Chips')) as HTMLParagraphElement;
        expect(title).toBeTruthy();
        expect(title).toHaveClass('MuiTypography-root MuiTypography-body1');

        const divContainer = title.nextSibling as HTMLDivElement;
        expect(divContainer).toBeTruthy();
        expect(divContainer).toHaveClass('MuiBox-root');
        expect(divContainer.children.length).toBe(1);

        // (All) div
        const allDiv = divContainer.firstChild as HTMLDivElement;
        expect(allDiv).toBeTruthy();
        expect(allDiv).toHaveRole('button');
        expect(allDiv).toHaveClass('MuiChip-filled');
        expect(allDiv).toHaveClass('MuiChip-clickable');
        expect(allDiv).toHaveClass('MuiChip-sizeSmall');
        expect(allDiv).toHaveClass('MuiChip-colorPrimary');
        expect(allDiv).not.toHaveAttribute('aria-disabled', 'true');

        const allSpan = allDiv.firstChild as HTMLSpanElement;
        expect(allSpan).toBeTruthy();
        expect(allSpan).toHaveClass('MuiChip-label MuiChip-labelSmall');
        expect(allSpan).toHaveTextContent('(All)');
    });

    test('renders chip group with multiple filters specified', async () => {
        const filters: IngredientFilterModel[] = [
            {
                id: 'gin-1',
                name: 'Gin Stuff'
            },
            {
                id: 'burbon-1',
                name: 'Bourbon'
            }
        ];

        render(
            <MemoryRouter>
                <CocktailIngredientFilterChipGroup filters={filters} title='My Chips' />
            </MemoryRouter>
        );

        const title = (await screen.findByText('My Chips')) as HTMLParagraphElement;
        expect(title).toBeTruthy();
        expect(title).toHaveClass('MuiTypography-root MuiTypography-body1');

        const divContainer = title.nextSibling as HTMLDivElement;
        expect(divContainer).toBeTruthy();
        expect(divContainer).toHaveClass('MuiBox-root');
        expect(divContainer.children.length).toBe(3);

        // (All) div
        const allDiv = divContainer.firstChild as HTMLDivElement;
        expect(allDiv).toBeTruthy();
        expect(allDiv).toHaveRole('button');
        expect(allDiv).toHaveClass('MuiChip-filled');
        expect(allDiv).toHaveClass('MuiChip-clickable');
        expect(allDiv).toHaveClass('MuiChip-sizeSmall');
        expect(allDiv).toHaveClass('MuiChip-colorPrimary');
        expect(allDiv).not.toHaveAttribute('aria-disabled', 'true');
        const allSpan = allDiv.firstChild as HTMLSpanElement;
        expect(allSpan).toBeTruthy();
        expect(allSpan).toHaveClass('MuiChip-label MuiChip-labelSmall');
        expect(allSpan).toHaveTextContent('(All)');

        // (Gin) gin-1
        const ginDiv = allDiv.nextSibling as HTMLDivElement;
        expect(ginDiv).toBeTruthy();
        expect(ginDiv).toHaveRole('button');
        expect(ginDiv).toHaveClass('MuiChip-filled');
        expect(ginDiv).toHaveClass('MuiChip-clickable');
        expect(ginDiv).toHaveClass('MuiChip-sizeSmall');
        expect(ginDiv).toHaveClass('MuiChip-colorSecondary');
        expect(ginDiv).not.toHaveAttribute('aria-disabled', 'true');
        const ginSpan = ginDiv.firstChild as HTMLSpanElement;
        expect(ginSpan).toBeTruthy();
        expect(ginSpan).toHaveClass('MuiChip-label MuiChip-labelSmall');
        expect(ginSpan).toHaveTextContent('Gin Stuff');

        // (Burbon) burbon-1
        const burbonDiv = ginDiv.nextSibling as HTMLDivElement;
        expect(burbonDiv).toBeTruthy();
        expect(burbonDiv).toHaveRole('button');
        expect(burbonDiv).toHaveClass('MuiChip-filled');
        expect(burbonDiv).toHaveClass('MuiChip-clickable');
        expect(burbonDiv).toHaveClass('MuiChip-sizeSmall');
        expect(burbonDiv).toHaveClass('MuiChip-colorSecondary');
        expect(burbonDiv).not.toHaveAttribute('aria-disabled', 'true');
        const burbonSpan = burbonDiv.firstChild as HTMLSpanElement;
        expect(burbonSpan).toBeTruthy();
        expect(burbonSpan).toHaveClass('MuiChip-label MuiChip-labelSmall');
        expect(burbonSpan).toHaveTextContent('Bourbon');
    });

    test('disables all option when other filters clicked and enables when unclicked', async () => {
        const filters: IngredientFilterModel[] = [
            {
                id: 'gin-1',
                name: 'Gin Stuff'
            },
            {
                id: 'burbon-1',
                name: 'Bourbon'
            }
        ];

        render(
            <MemoryRouter>
                <CocktailIngredientFilterChipGroup filters={filters} title='My Chips' />
            </MemoryRouter>
        );

        const title = (await screen.findByText('My Chips')) as HTMLParagraphElement;
        expect(title).toBeTruthy();
        expect(title).toHaveClass('MuiTypography-root MuiTypography-body1');

        const divContainer = title.nextSibling as HTMLDivElement;
        expect(divContainer).toBeTruthy();
        expect(divContainer).toHaveClass('MuiBox-root');
        expect(divContainer.children.length).toBe(3);

        // (All) div
        const allDiv = divContainer.firstChild as HTMLDivElement;
        expect(allDiv).toBeTruthy();
        expect(allDiv).toHaveRole('button');
        expect(allDiv).toHaveClass('MuiChip-filled');
        expect(allDiv).toHaveClass('MuiChip-clickable');
        expect(allDiv).toHaveClass('MuiChip-sizeSmall');
        expect(allDiv).toHaveClass('MuiChip-colorPrimary');
        expect(allDiv).not.toHaveAttribute('aria-disabled', 'true');
        const allSpan = allDiv.firstChild as HTMLSpanElement;
        expect(allSpan).toBeTruthy();
        expect(allSpan).toHaveClass('MuiChip-label MuiChip-labelSmall');
        expect(allSpan).toHaveTextContent('(All)');

        // (Gin) gin-1
        const ginDiv = allDiv.nextSibling as HTMLDivElement;
        expect(ginDiv).toBeTruthy();
        expect(ginDiv).toHaveRole('button');
        expect(ginDiv).toHaveClass('MuiChip-filled');
        expect(ginDiv).toHaveClass('MuiChip-clickable');
        expect(ginDiv).toHaveClass('MuiChip-sizeSmall');
        expect(ginDiv).toHaveClass('MuiChip-colorSecondary');
        expect(ginDiv).not.toHaveAttribute('aria-disabled', 'true');
        const ginSpan = ginDiv.firstChild as HTMLSpanElement;
        expect(ginSpan).toBeTruthy();
        expect(ginSpan).toHaveClass('MuiChip-label MuiChip-labelSmall');
        expect(ginSpan).toHaveTextContent('Gin Stuff');

        // (Burbon) burbon-1
        const burbonDiv = ginDiv.nextSibling as HTMLDivElement;
        expect(burbonDiv).toBeTruthy();
        expect(burbonDiv).toHaveRole('button');
        expect(burbonDiv).toHaveClass('MuiChip-filled');
        expect(burbonDiv).toHaveClass('MuiChip-clickable');
        expect(burbonDiv).toHaveClass('MuiChip-sizeSmall');
        expect(burbonDiv).toHaveClass('MuiChip-colorSecondary');
        expect(burbonDiv).not.toHaveAttribute('aria-disabled', 'true');
        const burbonSpan = burbonDiv.firstChild as HTMLSpanElement;
        expect(burbonSpan).toBeTruthy();
        expect(burbonSpan).toHaveClass('MuiChip-label MuiChip-labelSmall');
        expect(burbonSpan).toHaveTextContent('Bourbon');

        fireEvent.click(ginDiv);

        expect(allDiv).toHaveAttribute('aria-disabled', 'true');
        expect(allDiv).toHaveClass('MuiChip-colorSecondary');
        expect(ginDiv).not.toHaveAttribute('aria-disabled', 'true');
        expect(ginDiv).toHaveClass('MuiChip-colorPrimary');
        expect(burbonDiv).not.toHaveAttribute('aria-disabled', 'true');
        expect(burbonDiv).toHaveClass('MuiChip-colorSecondary');

        fireEvent.click(burbonDiv);

        expect(allDiv).toHaveAttribute('aria-disabled', 'true');
        expect(allDiv).toHaveClass('MuiChip-colorSecondary');
        expect(ginDiv).not.toHaveAttribute('aria-disabled', 'true');
        expect(ginDiv).toHaveClass('MuiChip-colorPrimary');
        expect(burbonDiv).not.toHaveAttribute('aria-disabled', 'true');
        expect(burbonDiv).toHaveClass('MuiChip-colorPrimary');

        fireEvent.click(burbonDiv);

        expect(allDiv).toHaveAttribute('aria-disabled', 'true');
        expect(allDiv).toHaveClass('MuiChip-colorSecondary');
        expect(ginDiv).not.toHaveAttribute('aria-disabled', 'true');
        expect(ginDiv).toHaveClass('MuiChip-colorPrimary');
        expect(burbonDiv).not.toHaveAttribute('aria-disabled', 'true');
        expect(burbonDiv).toHaveClass('MuiChip-colorSecondary');

        fireEvent.click(ginDiv);

        expect(allDiv).not.toHaveAttribute('aria-disabled', 'true');
        expect(allDiv).toHaveClass('MuiChip-colorPrimary');
        expect(ginDiv).not.toHaveAttribute('aria-disabled', 'true');
        expect(ginDiv).toHaveClass('MuiChip-colorSecondary');
        expect(burbonDiv).not.toHaveAttribute('aria-disabled', 'true');
        expect(burbonDiv).toHaveClass('MuiChip-colorSecondary');
    });

    test('fires on filters updated callback when chips are clicked', async () => {
        const hendleClick = vi.fn();

        const filters: IngredientFilterModel[] = [
            {
                id: 'gin-1',
                name: 'Gin Stuff'
            },
            {
                id: 'burbon-1',
                name: 'Bourbon'
            }
        ];

        render(
            <MemoryRouter>
                <CocktailIngredientFilterChipGroup filters={filters} title='My Chips' onFiltersUpdated={hendleClick} />
            </MemoryRouter>
        );

        const title = (await screen.findByText('My Chips')) as HTMLParagraphElement;
        expect(title).toBeTruthy();
        expect(title).toHaveClass('MuiTypography-root MuiTypography-body1');

        const divContainer = title.nextSibling as HTMLDivElement;
        expect(divContainer).toBeTruthy();
        expect(divContainer).toHaveClass('MuiBox-root');
        expect(divContainer.children.length).toBe(3);

        // (All) div
        const allDiv = divContainer.firstChild as HTMLDivElement;
        expect(allDiv).toBeTruthy();

        // (Gin) gin-1
        const ginDiv = allDiv.nextSibling as HTMLDivElement;
        expect(ginDiv).toBeTruthy();

        // (Burbon) burbon-1
        const burbonDiv = ginDiv.nextSibling as HTMLDivElement;
        expect(burbonDiv).toBeTruthy();

        fireEvent.click(ginDiv);
        fireEvent.click(burbonDiv);
        fireEvent.click(burbonDiv);
        fireEvent.click(ginDiv);

        expect(hendleClick).toHaveBeenCalledTimes(4);
    });

    test('doesnt fire on filters updated callback when (all) option is clicked', async () => {
        const hendleClick = vi.fn();

        const filters: IngredientFilterModel[] = [
            {
                id: 'gin-1',
                name: 'Gin Stuff'
            },
            {
                id: 'burbon-1',
                name: 'Bourbon'
            }
        ];

        render(
            <MemoryRouter>
                <CocktailIngredientFilterChipGroup filters={filters} title='My Chips' onFiltersUpdated={hendleClick} />
            </MemoryRouter>
        );

        const title = (await screen.findByText('My Chips')) as HTMLParagraphElement;
        expect(title).toBeTruthy();
        expect(title).toHaveClass('MuiTypography-root MuiTypography-body1');

        const divContainer = title.nextSibling as HTMLDivElement;
        expect(divContainer).toBeTruthy();
        expect(divContainer).toHaveClass('MuiBox-root');
        expect(divContainer.children.length).toBe(3);

        // (All) div
        const allDiv = divContainer.firstChild as HTMLDivElement;
        expect(allDiv).toBeTruthy();

        // (Gin) gin-1
        const ginDiv = allDiv.nextSibling as HTMLDivElement;
        expect(ginDiv).toBeTruthy();

        // (Burbon) burbon-1
        const burbonDiv = ginDiv.nextSibling as HTMLDivElement;
        expect(burbonDiv).toBeTruthy();

        fireEvent.click(allDiv);

        expect(hendleClick).toHaveBeenCalledTimes(0);
    });
});
