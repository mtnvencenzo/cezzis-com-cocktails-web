import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { User } from '@auth0/auth0-spa-js';
import AuthRoutes from './AuthRoutes';
import AccountPage from '../pages/AccountPages/AccountPage/AccountPage';
import AnonymousRoutes from './AnonymousRoutes';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import GlobalContext from './GlobalContexts';
import { Auth0ReactTester } from '../auth0Mocks';
import { auth0ProviderOptions } from '../utils/authConfig';
import { Auth0Provider } from './Auth0Provider';

const testUser: User = {
    name: 'John Doe',
    email: 'rvecchi-test1@mailinator.com',
    picture: 'https://example.com/john-doe.jpg',
    sub: 'auth0|123456789',
    updated_at: '2021-01-01T00:00:00.000Z',
    nickname: 'johnny',
    email_verified: true,
    given_name: 'Billy',
    family_name: 'Briggs',
    locale: 'en-US'
};

describe('Auth routes', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account page for already logged in user', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = testUser;

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter initialEntries={['/account']}>
                        <Routes>
                            <Route element={<AnonymousRoutes />} path='/'>
                                <Route element={<WelcomePage />} path='' />
                            </Route>
                            <Route element={<AuthRoutes />} path='/account'>
                                <Route element={<AccountPage />} path='' />
                            </Route>
                        </Routes>
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        await auth0Tester.waitForRedirect();

        await screen.findByText('Manage your Cezzis.com profile and security settings across all of your devices.');
        expect(document.title).toBe('My Account');
    });

    test('shows not authorized with no account data', async () => {
        await auth0Tester.isNotLogged();

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter initialEntries={['/account']}>
                        <Routes>
                            <Route element={<AnonymousRoutes />} path='/'>
                                <Route element={<WelcomePage />} path='' />
                            </Route>
                            <Route element={<AuthRoutes />} path='/account'>
                                <Route element={<AccountPage />} path='' />
                            </Route>
                        </Routes>
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        auth0Tester.waitForLogin();

        await screen.findByAltText('Loading...');
    });
});
