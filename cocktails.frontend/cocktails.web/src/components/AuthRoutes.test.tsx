import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AccountInfo } from '@azure/msal-browser';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import AuthRoutes from './AuthRoutes';
import AccountPage from '../pages/AccountPages/AccountPage/AccountPage';
import AnonymousRoutes from './AnonymousRoutes';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import GlobalContext from './GlobalContexts';

const testAccount: AccountInfo = {
    homeAccountId: '',
    localAccountId: '',
    environment: '',
    tenantId: '',
    username: '',
    idTokenClaims: {
        emails: ['rvecchi-test1@mailinator.com'],
        given_name: 'Billy',
        family_name: 'Briggs'
    }
};

describe('Auth routes', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders account page for already logged in user', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [testAccount];

        render(
            <GlobalContext>
                <MsalProvider instance={msalTester.client}>
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
                </MsalProvider>
            </GlobalContext>
        );

        await msalTester.waitForRedirect();

        await screen.findByText('Manage your Cezzis.com profile and security settings across all of your devices.');
        expect(document.title).toBe('My Account');
    });

    test('shows not authorized with no account data', async () => {
        await msalTester.isNotLogged();
        msalTester.accounts = [];

        render(
            <GlobalContext>
                <MsalProvider instance={msalTester.client}>
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
                </MsalProvider>
            </GlobalContext>
        );

        msalTester.waitForLogin();

        await screen.findByText('Account does not have access.');
    });

    test('shows not authorized with account data but no email', async () => {
        const badAccount: AccountInfo = {
            homeAccountId: '',
            localAccountId: '',
            environment: '',
            tenantId: '',
            username: '',
            idTokenClaims: {
                emails: []
            }
        };

        await msalTester.isNotLogged();
        msalTester.accounts = [badAccount];

        render(
            <GlobalContext>
                <MsalProvider instance={msalTester.client}>
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
                </MsalProvider>
            </GlobalContext>
        );

        msalTester.waitForLogin();

        await screen.findByText('Account does not have access.');
    });
});
