import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountPersonalDetailsPageContainer from './AccountPersonalDetailsPageContainer';
import { getTestAccountInfo } from '../../../../../tests/setup';

describe('Account Personal Details Page Container', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders account personal details page container', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountPersonalDetailsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        await screen.findByText('Profile Center');
        await screen.findByText('Personal Details');

        expect(document.title).toBe('Profile Center - Personal Details');
    });
});
