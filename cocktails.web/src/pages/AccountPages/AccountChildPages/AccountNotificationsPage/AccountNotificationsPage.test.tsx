import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AccountNotificationsPage from './AccountNotificationsPage';
import GlobalContext from '../../../../components/GlobalContexts';
import { getTestUser } from '../../../../../tests/setup';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { Auth0Provider } from '../../../../components/Auth0Provider';
import { auth0ProviderOptions } from '../../../../utils/authConfig';

describe('Account Notifications Page', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account notifications page', async () => {
        const router = createMemoryRouter(createRoutesFromElements(<Route path='/account/interactions/notifications' element={<AccountNotificationsPage />} />), {
            initialEntries: ['/account/interactions/notifications']
        });

        await auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        render(
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <RouterProvider router={router} />
                </GlobalContext>
            </Auth0Provider>
        );

        expect(document.title).toBe('Account Notification Settings');
        await screen.findByText('Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');
    });
});
