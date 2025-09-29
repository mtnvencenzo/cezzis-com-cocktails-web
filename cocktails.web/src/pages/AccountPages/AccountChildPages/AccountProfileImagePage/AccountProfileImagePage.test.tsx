import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AccountProfileImagePage from './AccountProfileImagePage';
import GlobalContext from '../../../../components/GlobalContexts';
import { getTestUser } from '../../../../../tests/setup';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { auth0ProviderOptions } from '../../../../utils/authConfig';
import { Auth0Provider } from '../../../../components/Auth0Provider';

describe('Account Profile Image Page', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders profile image page', async () => {
        const router = createMemoryRouter(createRoutesFromElements(<Route path='/account/profile-center/avatar' element={<AccountProfileImagePage />} />), {
            initialEntries: ['/account/profile-center/avatar']
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

        await screen.findByText('Profile Center');
        await screen.findByText('Edit Avatar');

        expect(document.title).toBe('Profile Center - Edit Avatar');
    });
});
