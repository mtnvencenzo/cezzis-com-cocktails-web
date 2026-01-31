import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountChangeEmailPageContainer from './AccountChangeEmailPageContainer';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { Auth0Provider } from '../../../../components/Auth0Provider';
import { getTestUser, getTestOwnedAccountProfile, server } from '../../../../../tests/setup';
import { auth0TestProviderOptions } from '../../../../auth0Mocks/testerConstants';
import SessionStorageService from '../../../../services/SessionStorageService';
import { AccountOwnedProfileRs, ChangeAccountOwnedEmailRq } from '../../../../api/accountsApi';

describe('Account Change Email Page Container', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account change email page container', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountChangeEmailPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');
        const elements = screen.getAllByText('Change Email');
        expect(elements.length).toBe(2);

        expect(document.title).toBe('Profile Center - Change Email');
    });

    test('opens alert dialog when Change Email button is clicked', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountChangeEmailPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');

        // Enter new email
        const emailInput = (await screen.findByTestId('txtEmail')) as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'newemail@test.com' } });

        // Click Change Email button
        const changeEmailButton = await screen.findByTestId('btnChangeEmail');
        fireEvent.click(changeEmailButton);

        // Verify alert dialog is displayed
        await screen.findByText('Change your email?');
        await screen.findByText('Are you sure you would like to change your email?');

        const cancelButton = await screen.findByTestId('alert-modal-cancel');
        expect(cancelButton).toBeTruthy();

        const confirmButton = await screen.findByTestId('alert-modal-confirm');
        expect(confirmButton).toBeTruthy();
    });

    test('closes alert dialog when user cancels', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountChangeEmailPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');

        // Enter new email
        const emailInput = (await screen.findByTestId('txtEmail')) as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'newemail@test.com' } });

        // Click Change Email button
        const changeEmailButton = await screen.findByTestId('btnChangeEmail');
        fireEvent.click(changeEmailButton);

        // Verify alert dialog is displayed
        await screen.findByText('Change your email?');

        // Click cancel button
        const cancelButton = await screen.findByTestId('alert-modal-cancel');
        fireEvent.click(cancelButton);

        // Alert dialog should be closed
        await waitFor(() => {
            expect(screen.queryByText('Change your email?')).not.toBeInTheDocument();
            expect(screen.queryByText('Are you sure you would like to change your email?')).not.toBeInTheDocument();
        });
    });

    test('calls API endpoint when user confirms email change', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        const updatedProfile = getTestOwnedAccountProfile();
        updatedProfile.email = 'newemail@test.com';

        // Mock the API endpoint
        server.use(
            http.put(
                'http://localhost:2/v1/accounts/owned/profile/email',
                async ({ request }) => {
                    // Verify the request body contains the expected data
                    const body = (await request.json()) as ChangeAccountOwnedEmailRq;
                    expect(body.email).toBe('newemail@test.com');

                    return HttpResponse.json<AccountOwnedProfileRs>(updatedProfile, {
                        status: 200,
                        statusText: 'OK'
                    });
                },
                { once: true }
            )
        );

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountChangeEmailPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');

        // Enter new email
        const emailInput = (await screen.findByTestId('txtEmail')) as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'newemail@test.com' } });

        // Click Change Email button
        const changeEmailButton = await screen.findByTestId('btnChangeEmail');
        fireEvent.click(changeEmailButton);

        // Verify alert dialog is displayed
        await screen.findByText('Change your email?');

        // Click confirm button
        const confirmButton = await screen.findByTestId('alert-modal-confirm');
        fireEvent.click(confirmButton);

        // Wait for the API call to complete to avoid unhandled promise rejection
        await new Promise((resolve) => setTimeout(resolve, 100));
    });
});
