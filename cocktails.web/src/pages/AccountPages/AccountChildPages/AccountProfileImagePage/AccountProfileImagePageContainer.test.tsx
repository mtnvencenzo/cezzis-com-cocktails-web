import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountProfileImagePageContainer from './AccountProfileImagePageContainer';

describe('Account Profile Image Page Container', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders account profile image page container', async () => {
        // Even though this is a container, using real router
        // due to component using useSubmit() which requires this router
        // and the 'ole faithful MemoryRouter doesn't work
        const router = createMemoryRouter(createRoutesFromElements(<Route path='/account/profile-center/avatar' element={<AccountProfileImagePageContainer />} />), {
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
