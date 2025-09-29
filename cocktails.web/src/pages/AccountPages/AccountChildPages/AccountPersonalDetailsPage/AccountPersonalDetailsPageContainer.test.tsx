import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountPersonalDetailsPageContainer from './AccountPersonalDetailsPageContainer';
import { getTestUser } from '../../../../../tests/setup';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { auth0ProviderOptions } from '../../../../utils/authConfig';
import { Auth0Provider } from '../../../../components/Auth0Provider';

describe('Account Personal Details Page Container', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account personal details page container', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        render(
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountPersonalDetailsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');
        await screen.findByText('Personal Details');

        expect(document.title).toBe('Profile Center - Personal Details');
    });
});
