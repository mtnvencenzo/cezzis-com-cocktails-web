import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AccountNotificationsPage from './AccountNotificationsPage';
import GlobalContext from '../../../../components/GlobalContexts';
import { getTestAccountInfo } from '../../../../../tests/setup';

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
        msalTester.accounts = [getTestAccountInfo()];

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <RouterProvider router={router} />
                </GlobalContext>
            </MsalProvider>
        );

        expect(document.title).toBe('Account Notification Settings');
        await screen.findByText('Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');
    });
});
