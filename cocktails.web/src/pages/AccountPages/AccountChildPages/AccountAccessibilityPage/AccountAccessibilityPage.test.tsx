import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AccountAccessibilityPage from './AccountAccessibilityPage';
import GlobalContext from '../../../../components/GlobalContexts';
import { getTestUser } from '../../../../../tests/setup';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { Auth0Provider } from '../../../../components/Auth0Provider';
import { auth0ProviderOptions } from '../../../../utils/authConfig';

describe('Account Accessibility Page', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account accessibility page', async () => {
        const router = createMemoryRouter(createRoutesFromElements(<Route path='/account/profile-center/accessibility' element={<AccountAccessibilityPage />} />), {
            initialEntries: ['/account/profile-center/accessibility']
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
        await screen.findByText('Accessibility Settings');

        expect(document.title).toBe('Profile Center - Accessibility Settings');
    });
});
