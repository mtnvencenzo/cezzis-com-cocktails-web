import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountProfileImagePageContainer from './AccountProfileImagePageContainer';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { Auth0Provider } from '../../../../components/Auth0Provider';
import { getTestUser } from '../../../../../tests/setup';
import { auth0TestProviderOptions } from '../../../../auth0Mocks/testerConstants';

describe('Account Profile Image Page Container', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account profile image page container', async () => {
        // Even though this is a container, using real router
        // due to component using useSubmit() which requires this router
        // and the 'ole faithful MemoryRouter doesn't work
        const router = createMemoryRouter(createRoutesFromElements(<Route path='/account/profile-center/avatar' element={<AccountProfileImagePageContainer />} />), {
            initialEntries: ['/account/profile-center/avatar']
        });

        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
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
