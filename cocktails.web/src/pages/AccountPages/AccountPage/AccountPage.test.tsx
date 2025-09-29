import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AccountPage from './AccountPage';
import GlobalContext from '../../../components/GlobalContexts';
import { getTestUser } from '../../../../tests/setup';
import { Auth0Provider } from '../../../components/Auth0Provider';
import { Auth0ReactTester } from '../../../auth0Mocks';
import { auth0ProviderOptions } from '../../../utils/authConfig';

describe('Account Page', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account page', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        render(
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountPage />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Manage your Cezzis.com profile and security settings across all of your devices.');

        expect(document.title).toBe('My Account');
    });
});
