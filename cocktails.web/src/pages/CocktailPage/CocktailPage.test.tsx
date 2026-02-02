import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import CocktailPage from './CocktailPage';
import { server } from '../../../tests/setup';
import GlobalContext from '../../components/GlobalContexts';
import { CocktailRs, GlasswareTypeModel, IngredientApplicationModel, IngredientRequirementTypeModel, IngredientTypeModel, PreparationTypeModel, UofMTypeModel } from '../../api/cocktailsApi';

describe('Cocktail Page', () => {
    test('renders cocktail page and fetches cocktail data', async () => {
        vi.mock('react-router-dom', async () => {
            const mod = await vi.importActual('react-router-dom');
            return {
                ...mod,
                useParams: () => ({
                    id: 'adonis'
                })
            };
        });

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/adonis',
                () =>
                    HttpResponse.json<CocktailRs>(
                        {
                            item: {
                                id: 'adonis',
                                content: 'The Adonis',
                                title: '',
                                searchableTitles: ['The Adonis'],
                                tags: ['tag1', 'tag2'],
                                rating: {
                                    oneStars: 1,
                                    twoStars: 2,
                                    threeStars: 3,
                                    fourStars: 5,
                                    fiveStars: 1,
                                    totalStars: 39,
                                    rating: 3,
                                    ratingCount: 12
                                },
                                ingredients: [
                                    {
                                        name: 'Ingredient 1',
                                        units: 1,
                                        uoM: UofMTypeModel.Ounces,
                                        types: [IngredientTypeModel.Fruit, IngredientTypeModel.Spirit],
                                        applications: [IngredientApplicationModel.Additional],
                                        preparation: PreparationTypeModel.None,
                                        suggestions: 'Some friendly suggestions',
                                        requirement: IngredientRequirementTypeModel.Optional,
                                        display: '1 oz Ingredient 1'
                                    },
                                    {
                                        name: 'Ingredient 2',
                                        units: 2,
                                        uoM: UofMTypeModel.Dashes,
                                        types: [IngredientTypeModel.Protein, IngredientTypeModel.Spirit],
                                        applications: [IngredientApplicationModel.Additional],
                                        preparation: PreparationTypeModel.None,
                                        suggestions: 'Some friendly suggestions for ingredient 2',
                                        requirement: IngredientRequirementTypeModel.Required,
                                        display: '2 dashes Ingredient 2'
                                    }
                                ],
                                serves: 1,
                                glassware: [GlasswareTypeModel.WineGlass, GlasswareTypeModel.Coupe],
                                descriptiveTitle: 'This is the Adonis',
                                description: 'The adonis is a cocktail',
                                isIba: true,
                                publishedOn: new Date(),
                                modifiedOn: new Date(),
                                searchTiles: [],
                                mainImages: [],
                                prepTimeMinutes: 10,
                                instructions: [
                                    {
                                        display: 'instruction 1',
                                        order: 0
                                    },
                                    {
                                        display: 'instruction 2',
                                        order: 1
                                    }
                                ]
                            }
                        },
                        {
                            status: 200,
                            statusText: 'OK'
                        }
                    ),
                { once: true }
            )
        );
        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailPage />
                </MemoryRouter>
            </GlobalContext>
        );

        const content = await screen.findByText('The Adonis');
        expect(content).toBeTruthy();
    });
});
