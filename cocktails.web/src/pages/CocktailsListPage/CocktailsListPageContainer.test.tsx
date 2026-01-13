import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import CocktailsListPageContainer from './CocktailsListPageContainer';
import LocalStorageService from '../../services/LocalStorageService';
import { server } from '../../../tests/setup';
import GlobalContext from '../../components/GlobalContexts';
import { CocktailModelOutput, CocktailsSearchRs } from '../../api/aisearchApi/models';

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
            rating: 0,
            serves: 1,
            glassware: [],
            prepTimeMinutes: 10
        });
    }

    return items;
};

describe('Cocktails List Page Container', () => {
    const TAKE = 20;

    test('renders and fetches cocktails data', async () => {
        localStorage.removeItem(LocalStorageService.CocktailsListGroupCacheKey);

        server.use(
            http.get(
                'http://localhost:1/v1/cocktails/search',
                ({ request }) => {
                    const url = new URL(request.url);
                    expect(url.searchParams.get('skip')).toBe('0');
                    expect(url.searchParams.get('take')).toBe(`${TAKE}`);

                    return HttpResponse.json<CocktailsSearchRs>(
                        {
                            items: getCocktailItems('Adonis', TAKE)
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

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailsListPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        /* eslint-disable no-await-in-loop */
        for (let i = 0; i < TAKE; i += 1) {
            const el = await screen.findByText(`The Adonis ${i}`);
            expect(el).toBeTruthy();
            expect(el.classList).toContain('cocktailLink');
        }
        /* eslint-enable no-await-in-loop */
    });

    test('renders and fetches cocktails data but doesnt show cocktails without image', async () => {
        localStorage.removeItem(LocalStorageService.CocktailsListGroupCacheKey);

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
                                    rating: 1,
                                    serves: 1,
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
                                    rating: 1,
                                    serves: 1,
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

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailsListPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        let el: HTMLElement | null = await screen.findByText('Test Title 1');
        expect(el).toBeDefined();
        expect(el.classList).toContain('cocktailLink');

        el = screen.queryByText('Test Title 2');
        expect(el).toBeNull();
    });
});
