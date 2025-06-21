import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import AccountProfileImagePage from './AccountProfileImagePage';
import GlobalContext from '../../../../components/GlobalContexts';

describe('Account Profile Image Page', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders profile image page', async () => {
        const router = createMemoryRouter(createRoutesFromElements(<Route path='/account/profile-center/avatar' element={<AccountProfileImagePage />} />), {
            initialEntries: ['/account/profile-center/avatar']
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

        await screen.findByText('Profile Center');
        await screen.findByText('Edit Avatar');

        expect(document.title).toBe('Profile Center - Edit Avatar');
    });
});
