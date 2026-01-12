import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import FavoriteCocktailsPage from './FavoriteCocktailsPage';
import { CocktailsListModel, CocktailsListRs } from '../../api/cocktailsApi/cocktailsApiClient';
import LocalStorageService from '../../services/LocalStorageService';
import { getTestOwnedAccountProfile, getTestUser, server } from '../../../tests/setup';
import GlobalContext from '../../components/GlobalContexts';
import { DEFAULT_TAKE } from '../../services/CocktailsService';
import SessionStorageService from '../../services/SessionStorageService';
import { Auth0ReactTester } from '../../auth0Mocks';

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
            mainImages: [],
            rating: 0,
            serves: 1,
            glassware: [],
            prepTimeMinutes: 10
        });
    }

    return items;
};

describe('Favorite Cocktails List Page', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders and fetches favorite cocktails data', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        for (let i = 0; i < DEFAULT_TAKE; i += 1) profile.favoriteCocktails.push(`adonis-${i}`);

        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        localStorage.removeItem(LocalStorageService.CocktailsListGroupCacheKey);

        server.use(
            http.get(
                'http://localhost:1/v1/cocktails/search',
                ({ request }) => {
                    const url = new URL(request.url);
                    expect(url.searchParams.get('skip')).toBe('0');
                    expect(url.searchParams.get('take')).toBe(`${DEFAULT_TAKE}`);
                    expect(url.searchParams.getAll('inc')).toContain('searchTiles');
                    expect(url.searchParams.getAll('inc')).toContain('descriptiveTitle');

                    return HttpResponse.json<CocktailsListRs>(
                        {
                            items: getCocktailItems('adonis', DEFAULT_TAKE)
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
                    <FavoriteCocktailsPage />
                </MemoryRouter>
            </GlobalContext>
        );

        /* eslint-disable no-await-in-loop */
        for (let i = 0; i < DEFAULT_TAKE; i += 1) {
            const el = await screen.findByText(`The adonis ${i}`);
            expect(el).toBeTruthy();
            expect(el.classList).toContain('cocktailLink');
        }
        /* eslint-enable no-await-in-loop */
    });
});
