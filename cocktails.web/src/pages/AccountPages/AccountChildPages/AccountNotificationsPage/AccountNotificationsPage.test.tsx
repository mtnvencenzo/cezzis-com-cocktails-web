import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import AccountNotificationsPage from './AccountNotificationsPage';
import GlobalContext from '../../../../components/GlobalContexts';

describe('Account Notifications Page', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders account notifications page', async () => {
        const router = createMemoryRouter(createRoutesFromElements(<Route path='/account/interactions/notifications' element={<AccountNotificationsPage />} />), {
            initialEntries: ['/account/interactions/notifications']
        });

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
                    <RouterProvider router={router} />
                </GlobalContext>
            </MsalProvider>
        );

        expect(document.title).toBe('Profile Center - Notification Settings');

        await screen.findByText('Profile Center');
        await screen.findByText('Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');
    });
});
