import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import CocktailsListPage from './CocktailsListPage';
import { CocktailsListModel, CocktailsListRs } from '../../api/cocktailsApi/cocktailsApiClient';
import LocalStorageService from '../../services/LocalStorageService';
import { server } from '../../../tests/setup';
import GlobalContext from '../../components/GlobalContexts';

const getCocktailItems = (name: string, count: number): CocktailsListModel[] => {
    const items: CocktailsListModel[] = [];

    for (let i = 0; i < count; i += 1) {
        items.push({
            id: `${name}-${i}`,
            title: `The ${name} ${i}`,
            isIba: true,
            descriptiveTitle: `The Alt ${name} ${i}`,
            searchTiles: [`https://cd-images-vec/cocktails/traditional-adonis-cocktail-${i}-300x300.webp`],
            ingredients: [],
            ratingCount: 0,
            serves: 1,
            glassware: [],
            prepTimeMinutes: 10,
            mainImages: [],
            rating: 0
        });
    }

    return items;
};

describe('Cocktails List Page', () => {
    const TAKE = 20;

    test('renders and fetches cocktails data', async () => {
        localStorage.removeItem(LocalStorageService.CocktailsListGroupCacheKey);

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails',
                ({ request }) => {
                    const url = new URL(request.url);
                    expect(url.searchParams.get('skip')).toBe('0');
                    expect(url.searchParams.get('take')).toBe(`${TAKE}`);
                    expect(url.searchParams.getAll('inc')).toContain('searchTiles');
                    expect(url.searchParams.getAll('inc')).toContain('descriptiveTitle');

                    return HttpResponse.json<CocktailsListRs>(
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
                    <CocktailsListPage />
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
});
