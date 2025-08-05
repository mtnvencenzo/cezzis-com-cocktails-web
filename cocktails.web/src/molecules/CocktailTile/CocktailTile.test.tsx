import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CocktailTile from './CocktailTile';
import { CocktailsListModel, IngredientApplicationModel, IngredientRequirementTypeModel, IngredientTypeModel, PreparationTypeModel, UofMTypeModel } from '../../api/cocktailsApi/cocktailsApiClient';

describe('Cocktail List Tile', () => {
    test('renders with short title text', async () => {
        const model = {
            id: 'test',
            title: 'My Cocktail - 1029201',
            descriptiveTitle: 'My Cocktail - 1029201 - descriptive',
            isIba: false,
            searchTiles: [],
            ingredients: [],
            glassware: [],
            prepTimeMinutes: 10,
            mainImages: [],
            rating: 1,
            serves: 1
        } as CocktailsListModel;

        render(
            <MemoryRouter>
                <CocktailTile cocktail={model} testId='cocktail-title' isFavorite={false} indicatorValue={0} indicatorPosition='Top' />
            </MemoryRouter>
        );

        const el = await screen.findByText(model.title ?? '');
        expect(el).toBeTruthy();
        expect(el.classList).toContain('cocktailLink');
    });

    test('renders with long title text ellipsis', async () => {
        const model = {
            id: 'test',
            title: 'This is a very long cock tail title text - 1029201',
            descriptiveTitle: 'My Cocktail - 1029201 - descriptive',
            isIba: false,
            searchTiles: [],
            ingredients: [],
            glassware: [],
            prepTimeMinutes: 10,
            mainImages: [],
            rating: 1,
            serves: 1
        } as CocktailsListModel;

        render(
            <MemoryRouter>
                <CocktailTile cocktail={model} testId='cocktail-title' isFavorite={false} indicatorValue={0} indicatorPosition='Top' />
            </MemoryRouter>
        );

        const el = await screen.findByText(model.title ?? '');
        expect(el).toBeTruthy();
        expect(el).toHaveStyle('text-overflow: ellipsis');
        expect(el).toHaveStyle('overflow: hidden');
        expect(el).toHaveStyle('white-space: nowrap');
        expect(el.classList).toContain('cocktailLink');
    });

    test('renders with single base ingredient text', async () => {
        const model = {
            id: 'test',
            title: 'My Cocktail - 1029201',
            descriptiveTitle: 'My Cocktail - 1029201 - descriptive',
            isIba: false,
            searchTiles: [],
            ingredients: [
                {
                    id: 'Rum',
                    name: 'Rum',
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base, IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Rum',
                    units: 1
                }
            ],
            glassware: [],
            prepTimeMinutes: 10,
            mainImages: [],
            rating: 1,
            serves: 1
        } as CocktailsListModel;

        render(
            <MemoryRouter>
                <CocktailTile cocktail={model} testId='cocktail-title' isFavorite={false} indicatorValue={0} indicatorPosition='Top' />
            </MemoryRouter>
        );

        const el = await screen.findByText('BASE: Rum');
        expect(el).toBeTruthy();
        expect(el.classList).toContain('baseIngredientLink');
    });

    test('renders with multiple short base ingredient text', async () => {
        const model = {
            id: 'test',
            title: 'My Cocktail - 1029201',
            descriptiveTitle: 'My Cocktail - 1029201 - descriptive',
            isIba: false,
            searchTiles: [],
            ingredients: [
                {
                    id: 'Rum',
                    name: 'Rum',
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base, IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Rum',
                    units: 1
                },
                {
                    id: 'Vodka',
                    name: 'Vodka',
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Vodka',
                    units: 1
                }
            ],
            glassware: [],
            prepTimeMinutes: 10,
            mainImages: [],
            rating: 1,
            serves: 1
        } as CocktailsListModel;

        render(
            <MemoryRouter>
                <CocktailTile cocktail={model} testId='cocktail-title' isFavorite={false} indicatorValue={0} indicatorPosition='Top' />
            </MemoryRouter>
        );

        const el = await screen.findByText('BASE: Rum, Vodka');
        expect(el).toBeTruthy();
        expect(el.classList).toContain('baseIngredientLink');
    });

    test('renders with multiple long base ingredient text ellipsis', async () => {
        const model = {
            id: 'test',
            title: 'My Cocktail - 1029201',
            descriptiveTitle: 'My Cocktail - 1029201 - descriptive',
            isIba: false,
            searchTiles: [],
            ingredients: [
                {
                    id: 'Pimms',
                    name: 'Pimms',
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Pimms',
                    units: 1
                },
                {
                    id: 'Jamaican-Rum',
                    name: 'Jamaican Rum',
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Jamaican Rum',
                    units: 1
                },
                {
                    id: 'Cognac',
                    name: 'Cognac',
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Cognac',
                    units: 1
                },
                {
                    id: 'Dry-Oloroso-Sherry',
                    name: 'Dry Oloroso Sherry',
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Wine],
                    applications: [IngredientApplicationModel.Base, IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Dry Oloroso Sherry',
                    units: 1
                }
            ],
            glassware: [],
            prepTimeMinutes: 10,
            mainImages: [],
            rating: 1,
            serves: 1
        } as CocktailsListModel;

        render(
            <MemoryRouter>
                <CocktailTile cocktail={model} testId='cocktail-title' isFavorite={false} indicatorValue={0} indicatorPosition='Top' />
            </MemoryRouter>
        );

        const el = screen.getByText('BASE: Jamaican Rum, Cognac, Dry Oloroso Sherry');
        expect(el).toBeTruthy();
        expect(el).toHaveStyle('text-overflow: ellipsis');
        expect(el).toHaveStyle('overflow: hidden');
        expect(el).toHaveStyle('white-space: nowrap');
        expect(el.classList).toContain('baseIngredientLink');
    });

    test('renders without a search title image', async () => {
        const model = {
            id: 'test',
            title: 'My Cocktail - 1029201',
            descriptiveTitle: 'My Cocktail - 1029201 - descriptive',
            isIba: false,
            searchTiles: [],
            ingredients: [],
            glassware: [],
            prepTimeMinutes: 10,
            mainImages: [],
            rating: 1,
            serves: 1
        } as CocktailsListModel;

        render(
            <MemoryRouter>
                <CocktailTile cocktail={model} testId='cocktail-title' isFavorite={false} indicatorValue={0} indicatorPosition='Top' />
            </MemoryRouter>
        );

        const el = screen.queryByAltText(model.descriptiveTitle ?? '');
        expect(el).toBeNull();
    });

    test('renders with a search title image', async () => {
        const model = {
            id: 'test',
            title: 'My Cocktail - 1029201',
            descriptiveTitle: 'My Cocktail - 1029201 - descriptive',
            isIba: false,
            searchTiles: ['https://cezzis.com/image-tile-1.webp', 'https://cezzis.com/image-tile-2.webp'],
            ingredients: [],
            glassware: [],
            prepTimeMinutes: 10,
            mainImages: [],
            rating: 1,
            serves: 1
        } as CocktailsListModel;

        render(
            <MemoryRouter>
                <CocktailTile cocktail={model} testId='cocktail-title' isFavorite={false} indicatorValue={0} indicatorPosition='Top' />
            </MemoryRouter>
        );

        const el = screen.getByAltText(model.descriptiveTitle ?? '');
        expect(el).toBeTruthy();
        expect(el.getAttribute('src')).toBe(`https://cezzis.com/image-tile-1.webp`);
        expect(el.getAttribute('width')).toBe('100%');
        expect(el.style.getPropertyValue('max-width')).toBe('350px');
        expect(el.style.getPropertyValue('max-height')).toBe('350px');
        expect(el.getAttribute('loading')).toBe('lazy');
    });

    test('renders renders a surrounding link', async () => {
        const model = {
            id: 'test-id',
            title: 'My Cocktail - 1029201',
            descriptiveTitle: 'My Cocktail - 1029201 - descriptive',
            isIba: false,
            searchTiles: ['https://cezzis.com/image-tile-1.webp', 'https://cezzis.com/image-tile-2.webp'],
            ingredients: [],
            glassware: [],
            prepTimeMinutes: 10,
            mainImages: [],
            rating: 1,
            serves: 1
        } as CocktailsListModel;

        render(
            <MemoryRouter>
                <CocktailTile cocktail={model} testId='cocktail-title' isFavorite={false} indicatorValue={0} indicatorPosition='Top' />
            </MemoryRouter>
        );

        const el = await screen.findByTestId('cocktail-title');
        expect(el).toBeTruthy();
        expect(el.firstChild).toBeInstanceOf(HTMLAnchorElement);
        expect((el.firstChild as HTMLAnchorElement).href).toBe(`http://localhost:3000/cocktails/${model.id}`);
    });
});
