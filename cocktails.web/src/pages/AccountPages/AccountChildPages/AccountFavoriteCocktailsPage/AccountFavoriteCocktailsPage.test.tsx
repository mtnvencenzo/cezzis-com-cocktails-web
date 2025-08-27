import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import { http, HttpResponse } from 'msw';
import AccountFavoriteCocktailsPage from './AccountFavoriteCocktailsPage';
import GlobalContext from '../../../../components/GlobalContexts';
import { getTestAccountInfo, getTestOwnedAccountProfile, server } from '../../../../../tests/setup';
import { DEFAULT_TAKE } from '../../../../services/CocktailsService';
import { CocktailsListRs } from '../../../../api/cocktailsApi/cocktailsApiClient';
import SessionStorageService from '../../../../services/SessionStorageService';

describe('Account Interactions Favorite Cocktails Page', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders account interactions favorite cocktails page', async () => {
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
                        <AccountFavoriteCocktailsPage />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        await screen.findByText('Favorite Cocktail Recipes');

        expect(document.title).toBe('Account Favorite Cocktail Recipes');
    });
});
