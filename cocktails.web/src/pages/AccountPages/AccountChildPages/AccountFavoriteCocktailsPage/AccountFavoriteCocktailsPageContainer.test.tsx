import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import AccountFavoriteCocktailsPageContainer from './AccountFavoriteCocktailsPageContainer';
import GlobalContext from '../../../../components/GlobalContexts';
import { getTestAccountInfo, getTestCocktailsList, getTestOwnedAccountProfile, server } from '../../../../../tests/setup';
import { DEFAULT_TAKE } from '../../../../services/CocktailsService';
import { CocktailsListRs } from '../../../../api/cocktailsApi/cocktailsApiClient';
import SessionStorageService from '../../../../services/SessionStorageService';

describe('Account Interactions Favorite Cocktails Page Container', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders default content when no favorites', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        const profile = getTestOwnedAccountProfile();
        profile.favoriteCocktails = [];
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

                    return HttpResponse.json<CocktailsListRs>(
                        {
                            items: []
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
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountFavoriteCocktailsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        await screen.findByText('Favorite Cocktail Recipes');

        expect(document.title).toBe('Account Favorite Cocktail Recipes');
    });

    test('renders account profile favorites', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

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
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountFavoriteCocktailsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        await screen.findByText('Favorite Cocktail Recipes');

        expect(document.title).toBe('Account Favorite Cocktail Recipes');

        await screen.findByText('Adonis');
    });

    test('renders multiple account profile favorites', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

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
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountFavoriteCocktailsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        await screen.findByText('Favorite Cocktail Recipes');

        expect(document.title).toBe('Account Favorite Cocktail Recipes');

        await screen.findByText('Adonis');
        await screen.findByText('Absinthe Frappé');
    });

    test('renders only account profile favorites even if in returned response', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

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
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountFavoriteCocktailsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        await screen.findByText('Favorite Cocktail Recipes');

        expect(document.title).toBe('Account Favorite Cocktail Recipes');

        await screen.findByText('Adonis');

        const el = screen.queryByText('Absinthe Frappé');
        expect(el).not.toBeInTheDocument();
    });

    test('renders only account profile favorites only if has search image', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

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
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountFavoriteCocktailsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        await screen.findByText('Favorite Cocktail Recipes');

        expect(document.title).toBe('Account Favorite Cocktail Recipes');

        await screen.findByText('Adonis');

        const el = screen.queryByText('Absinthe Frappé');
        expect(el).not.toBeInTheDocument();
    });
});
