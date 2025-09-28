import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import AccountFavoriteCocktailsPage from './AccountFavoriteCocktailsPage';
import GlobalContext from '../../../../components/GlobalContexts';
import { getTestOwnedAccountProfile, getTestUser, server } from '../../../../../tests/setup';
import { DEFAULT_TAKE } from '../../../../services/CocktailsService';
import { CocktailsListRs } from '../../../../api/cocktailsApi/cocktailsApiClient';
import SessionStorageService from '../../../../services/SessionStorageService';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { auth0ProviderOptions } from '../../../../utils/authConfig';
import { Auth0Provider } from '../../../../components/Auth0Provider';

describe('Account Interactions Favorite Cocktails Page', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account interactions favorite cocktails page', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

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
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountFavoriteCocktailsPage />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Favorite Cocktail Recipes');

        expect(document.title).toBe('Account Favorite Cocktail Recipes');
    });
});
