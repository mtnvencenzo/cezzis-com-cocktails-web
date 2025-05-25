import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import AccountPage from './AccountPage';
import GlobalContext from '../../../components/GlobalContexts';

describe('Account Page', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders account page', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [
            {
                homeAccountId: '',
                username: '',
                localAccountId: '',
                environment: '',
                tenantId: '',
                idTokenClaims: {
                    given_name: 'Bob',
                    family_name: 'Briggs'
                }
            }
        ];

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountPage />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        await screen.findByText('Manage your Cezzis.com profile and security settings across all of your devices.');

        expect(document.title).toBe('My Account');
    });
});
