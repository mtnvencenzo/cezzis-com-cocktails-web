import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import CocktailsSearchPageContainer from './CocktailsSearchPageContainer';
import { CocktailIngredientFiltersRs } from '../../api/cocktailsApi/cocktailsApiClient';
import { server } from '../../../tests/setup';
import GlobalContext from '../../components/GlobalContexts';
import { CocktailModelOutput, CocktailsSearchRs } from '../../api/aisearchApi';
import { DEFAULT_TAKE } from '../../services/CocktailsAISearchService';

const getCocktailItems = (name: string, count: number): CocktailModelOutput[] => {
    const items: CocktailModelOutput[] = [];

    for (let i = 0; i < count; i += 1) {
        items.push({
            id: `${name}-${i}`,
            title: `The ${name} ${i}`,
            isIba: true,
            descriptiveTitle: `The ${name} ${i}`,
            searchTiles: ['https://cd-images-vec/cocktails/traditional-adonis-cocktail-300x300.webp'],
            ingredients: [],
            serves: 1,
            rating: 0,
            glassware: [],
            prepTimeMinutes: 10
        });
    }

    return items;
};

describe('Cocktails Search Page Container', () => {
    test('renders and fetches cocktails data', async () => {
        server.use(
            http.get(
                'http://localhost:1/v1/cocktails/search',
                ({ request }) => {
                    const url = new URL(request.url);
                    expect(url.searchParams.get('freetext')).toBe('');
                    expect(url.searchParams.get('skip')).toBe('0');
                    expect(url.searchParams.get('take')).toBe(`${DEFAULT_TAKE}`);

                    return HttpResponse.json<CocktailsSearchRs>(
                        {
                            items: getCocktailItems('Adonis', DEFAULT_TAKE)
                        },
                        {
                            status: 200,
                            statusText: 'OK'
                        }
                    );
                },
                { once: true }
            )
        );

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(
                        {
                            glassware: [],
                            spirits: [],
                            liqueurs: [],
                            fruits: [],
                            vegetables: [],
                            herbsAndFlowers: [],
                            syrupsAndSauces: [],
                            bitters: [],
                            proteins: [],
                            juices: [],
                            dilutions: [],
                            beerWineChampagne: [],
                            eras: []
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
                    <CocktailsSearchPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        /* eslint-disable no-await-in-loop */
        for (let i = 0; i < DEFAULT_TAKE; i += 1) {
            const el = await screen.findByText(`The Adonis ${i}`);
            expect(el).toBeTruthy();
        }
        /* eslint-enable no-await-in-loop */
    });

    test('renders and fetches cocktails data but doesnt show cocktails without image', async () => {
        server.use(
            http.get(
                'http://localhost:1/v1/cocktails/search',
                () =>
                    HttpResponse.json<CocktailsSearchRs>(
                        {
                            items: [
                                {
                                    id: 'Test-1',
                                    title: 'Test Title 1',
                                    isIba: true,
                                    descriptiveTitle: 'Test Title 1',
                                    searchTiles: ['https://cd-images-vec/cocktails/traditional-adonis-cocktail-300x300.webp'],
                                    ingredients: [],
                                    serves: 1,
                                    rating: 0,
                                    glassware: [],
                                    prepTimeMinutes: 10
                                },
                                {
                                    id: 'Test-2',
                                    title: 'Test Title 2',
                                    isIba: true,
                                    descriptiveTitle: 'Test Title 2',
                                    searchTiles: [],
                                    ingredients: [],
                                    serves: 1,
                                    rating: 0,
                                    glassware: [],
                                    prepTimeMinutes: 10
                                }
                            ]
                        },
                        {
                            status: 200,
                            statusText: 'OK'
                        }
                    ),
                { once: true }
            )
        );

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(
                        {
                            glassware: [],
                            spirits: [],
                            liqueurs: [],
                            fruits: [],
                            vegetables: [],
                            herbsAndFlowers: [],
                            syrupsAndSauces: [],
                            bitters: [],
                            proteins: [],
                            juices: [],
                            dilutions: [],
                            beerWineChampagne: [],
                            eras: []
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
                    <CocktailsSearchPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        let el: HTMLElement | null = await screen.findByText('Test Title 1');
        expect(el).toBeDefined();

        el = screen.queryByText('Test Title 2');
        expect(el).toBeNull();
    });
});
