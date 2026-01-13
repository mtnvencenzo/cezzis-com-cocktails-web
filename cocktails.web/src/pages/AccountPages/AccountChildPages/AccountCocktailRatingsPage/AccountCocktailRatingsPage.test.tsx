import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import AccountCocktailRatingsPage from './AccountCocktailRatingsPage';
import GlobalContext from '../../../../components/GlobalContexts';
import { getTestOwnedAccountCocktailRatings, getTestOwnedAccountProfile, getTestUser, server } from '../../../../../tests/setup';
import SessionStorageService from '../../../../services/SessionStorageService';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { Auth0Provider } from '../../../../components/Auth0Provider';
import { auth0TestProviderOptions } from '../../../../auth0Mocks/testerConstants';
import { DEFAULT_TAKE } from '../../../../services/CocktailsAISearchService';
import { CocktailsSearchRs } from '../../../../api/aisearchApi';

describe('Account Interactions Cocktail Ratings Page', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account interactions cocktail ratings page', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        const ratings = getTestOwnedAccountCocktailRatings([]);
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);
        sessionStorageService.SetOwnedAccountCocktailRatingsRequestData(ratings);

        server.use(
            http.get(
                'http://localhost:1/v1/cocktails/search',
                ({ request }) => {
                    const url = new URL(request.url);
                    expect(url.searchParams.get('skip')).toBe('0');
                    expect(url.searchParams.get('take')).toBe(`${DEFAULT_TAKE}`);

                    return HttpResponse.json<CocktailsSearchRs>(
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
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountCocktailRatingsPage />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Cocktail Ratings');

        expect(document.title).toBe('Account Cocktail Ratings');
    });
});
