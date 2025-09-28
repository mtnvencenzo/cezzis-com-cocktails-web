import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AccountChangeEmailPage from './AccountChangeEmailPage';
import GlobalContext from '../../../../components/GlobalContexts';

describe('Account Change Email Page', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders account change email page', async () => {
        const router = createMemoryRouter(createRoutesFromElements(<Route path='/account/profile-center/change-email' element={<AccountChangeEmailPage />} />), {
            initialEntries: ['/account/profile-center/change-email']
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
        await screen.findByText('Change Email');

        expect(document.title).toBe('Profile Center - Change Email');
    });
});
