import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import FavoriteCocktailsPageContainer from './FavoriteCocktailsPageContainer';
import { CocktailsListModel, CocktailsListRs } from '../../api/cocktailsApi/cocktailsApiClient';
import LocalStorageService from '../../services/LocalStorageService';
import { getTestUser, getTestCocktailsList, getTestOwnedAccountProfile, server } from '../../../tests/setup';
import GlobalContext from '../../components/GlobalContexts';
import { DEFAULT_TAKE } from '../../services/CocktailsService';
import SessionStorageService from '../../services/SessionStorageService';
import { auth0ProviderOptions } from '../../utils/authConfig';
import { Auth0Provider } from '../../components/Auth0Provider';
import { Auth0ReactTester } from '../../auth0Mocks';

const getCocktailItems = (name: string, count: number): CocktailsListModel[] => {
    const items: CocktailsListModel[] = [];

    for (let i = 0; i < count; i += 1) {
        items.push({
            id: `${name}-${i}`,
            title: `The ${name} ${i}`,
            isIba: true,
            descriptiveTitle: `The ${name} ${i}`,
            searchTiles: ['https://cd-images-vec/cocktails/traditional-adonis-cocktail-300x300.webp'],
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

describe('Favorite Cocktails Page Container', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders and fetches cocktails data', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();

        for (let i = 0; i < DEFAULT_TAKE; i += 1) profile.favoriteCocktails.push(`adonis-${i}`);

        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        localStorage.removeItem(LocalStorageService.CocktailsListGroupCacheKey);

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails',
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
                    <FavoriteCocktailsPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        expect(document.title).toBe('My Favorite Cocktails');

        /* eslint-disable no-await-in-loop */
        for (let i = 0; i < DEFAULT_TAKE; i += 1) {
            const el = await screen.findByText(`The adonis ${i}`);
            expect(el).toBeTruthy();
            expect(el.classList).toContain('cocktailLink');
        }
        /* eslint-enable no-await-in-loop */
    });

    test('renders and fetches cocktails data but doesnt show cocktails without image', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        profile.favoriteCocktails.push('Test-1');
        profile.favoriteCocktails.push('Test-2');
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        localStorage.removeItem(LocalStorageService.CocktailsListGroupCacheKey);

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails',
                () =>
                    HttpResponse.json<CocktailsListRs>(
                        {
                            items: [
                                {
                                    id: 'Test-1',
                                    title: 'Test Title 1',
                                    isIba: true,
                                    descriptiveTitle: 'Test Title 1',
                                    searchTiles: ['https://cd-images-vec/cocktails/traditional-adonis-cocktail-300x300.webp'],
                                    ingredients: [],
                                    mainImages: [],
                                    rating: 0,
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
                                    mainImages: [],
                                    rating: 0,
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
                    <FavoriteCocktailsPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        expect(document.title).toBe('My Favorite Cocktails');

        let el: HTMLElement | null = await screen.findByText('Test Title 1');
        expect(el).toBeDefined();
        expect(el.classList).toContain('cocktailLink');

        el = screen.queryByText('Test Title 2');
        expect(el).toBeNull();
    });

    test('renders account profile favorites', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        profile.favoriteCocktails = ['adonis'];
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails',
                ({ request }) => {
                    const url = new URL(request.url);
                    expect(url.searchParams.get('skip')).toBe('0');
                    expect(url.searchParams.get('take')).toBe(`${DEFAULT_TAKE}`);
                    expect(url.searchParams.getAll('inc')).toContain('searchTiles');
                    expect(url.searchParams.getAll('inc')).toContain('descriptiveTitle');
                    expect(url.searchParams.get('match-exclusive')).toBe('true');
                    expect(url.searchParams.getAll('m')).toContain('adonis');

                    return HttpResponse.json<CocktailsListRs>(
                        {
                            items: [getTestCocktailsList().filter((x) => x.id === 'adonis')[0]]
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
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <FavoriteCocktailsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        expect(document.title).toBe('My Favorite Cocktails');

        await screen.findByText('Adonis');
    });

    test('renders multiple account profile favorites', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        profile.favoriteCocktails = ['adonis', 'absinthe-frappe'];
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails',
                ({ request }) => {
                    const url = new URL(request.url);
                    expect(url.searchParams.get('skip')).toBe('0');
                    expect(url.searchParams.get('take')).toBe(`${DEFAULT_TAKE}`);
                    expect(url.searchParams.getAll('inc')).toContain('searchTiles');
                    expect(url.searchParams.getAll('inc')).toContain('descriptiveTitle');
                    expect(url.searchParams.get('match-exclusive')).toBe('true');
                    expect(url.searchParams.getAll('m')).toContain('absinthe-frappe');
                    expect(url.searchParams.getAll('m')).toContain('adonis');

                    return HttpResponse.json<CocktailsListRs>(
                        {
                            items: [getTestCocktailsList().filter((x) => x.id === 'absinthe-frappe')[0], getTestCocktailsList().filter((x) => x.id === 'adonis')[0]]
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
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <FavoriteCocktailsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        expect(document.title).toBe('My Favorite Cocktails');

        await screen.findByText('Adonis');
        await screen.findByText('Absinthe Frappé');
    });

    test('renders only account profile favorites even if in returned response', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        profile.favoriteCocktails = ['adonis'];
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails',
                ({ request }) => {
                    const url = new URL(request.url);
                    expect(url.searchParams.get('skip')).toBe('0');
                    expect(url.searchParams.get('take')).toBe(`${DEFAULT_TAKE}`);
                    expect(url.searchParams.getAll('inc')).toContain('searchTiles');
                    expect(url.searchParams.getAll('inc')).toContain('descriptiveTitle');
                    expect(url.searchParams.get('match-exclusive')).toBe('true');
                    expect(url.searchParams.getAll('m')).toContain('adonis');
                    expect(url.searchParams.getAll('m').length).toBe(1);

                    return HttpResponse.json<CocktailsListRs>(
                        {
                            items: [getTestCocktailsList().filter((x) => x.id === 'absinthe-frappe')[0], getTestCocktailsList().filter((x) => x.id === 'adonis')[0]]
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
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <FavoriteCocktailsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        expect(document.title).toBe('My Favorite Cocktails');

        await screen.findByText('Adonis');

        const el = screen.queryByText('Absinthe Frappé');
        expect(el).not.toBeInTheDocument();
    });

    test('renders only account profile favorites only if has search image', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        profile.favoriteCocktails = ['adonis', 'absinthe-frappe'];
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails',
                ({ request }) => {
                    const url = new URL(request.url);
                    expect(url.searchParams.get('skip')).toBe('0');
                    expect(url.searchParams.get('take')).toBe(`${DEFAULT_TAKE}`);
                    expect(url.searchParams.getAll('inc')).toContain('searchTiles');
                    expect(url.searchParams.getAll('inc')).toContain('descriptiveTitle');
                    expect(url.searchParams.get('match-exclusive')).toBe('true');
                    expect(url.searchParams.getAll('m')).toContain('adonis');
                    expect(url.searchParams.getAll('m')).toContain('absinthe-frappe');
                    expect(url.searchParams.getAll('m').length).toBe(2);

                    const cocktailNoImage = getTestCocktailsList().filter((x) => x.id === 'absinthe-frappe')[0];
                    cocktailNoImage.searchTiles = [];

                    return HttpResponse.json<CocktailsListRs>(
                        {
                            items: [cocktailNoImage, getTestCocktailsList().filter((x) => x.id === 'adonis')[0]]
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
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <FavoriteCocktailsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        expect(document.title).toBe('My Favorite Cocktails');

        await screen.findByText('Adonis');

        const el = screen.queryByText('Absinthe Frappé');
        expect(el).not.toBeInTheDocument();
    });
});
