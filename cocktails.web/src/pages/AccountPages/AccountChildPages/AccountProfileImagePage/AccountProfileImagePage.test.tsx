import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AccountProfileImagePage from './AccountProfileImagePage';
import GlobalContext from '../../../../components/GlobalContexts';
import { getTestAccountInfo } from '../../../../../tests/setup';

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
        msalTester.accounts = [getTestAccountInfo()];

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
