import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AccountChangeUsernamePage from './AccountChangeUsernamePage';
import GlobalContext from '../../../../components/GlobalContexts';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { Auth0Provider } from '../../../../components/Auth0Provider';
import { getTestUser } from '../../../../../tests/setup';
import { auth0TestProviderOptions } from '../../../../auth0Mocks/testerConstants';

describe('Account Change Username Page', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account change username page', async () => {
        const router = createMemoryRouter(createRoutesFromElements(<Route path='/account/profile-center/change-username' element={<AccountChangeUsernamePage />} />), {
            initialEntries: ['/account/profile-center/change-username']
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
        const elements = screen.getAllByText('Change Username');
        expect(elements.length).toBe(2);

        expect(document.title).toBe('Profile Center - Change Username');
    });
});
