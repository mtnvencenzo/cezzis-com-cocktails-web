import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountNotificationsPageContainer from './AccountNotificationsPageContainer';
import SessionStorageService from '../../../../services/SessionStorageService';
import { getTestOwnedAccountProfile, getTestUser, server } from '../../../../../tests/setup';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { Auth0Provider } from '../../../../components/Auth0Provider';
import { auth0TestProviderOptions } from '../../../../auth0Mocks/testerConstants';
import { AccountOwnedProfileRs, CocktailUpdatedNotificationModel, UpdateAccountOwnedNotificationSettingsRq } from '../../../../api/accountsApi';

describe('Account Notifications Page Container', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account notifications page container', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountNotificationsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        expect(document.title).toBe('Account Notification Settings');
        await screen.findByText('Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');
    });

    test('toggle > notify me when new cocktails are added > works when initially Always', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();

        if (profile?.notifications) profile.notifications.onNewCocktailAdditions = CocktailUpdatedNotificationModel.Always;

        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountNotificationsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        expect(document.title).toBe('Account Notification Settings');
        await screen.findByText('Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');

        const el = await screen.findByTestId('chkNotifyNewCocktails');
        const chkNotifyNewCocktails = el.firstChild as HTMLInputElement;
        expect(chkNotifyNewCocktails).not.toBeNull();
        expect((chkNotifyNewCocktails as HTMLInputElement).checked).toBe(true);

        fireEvent.click(chkNotifyNewCocktails);
        expect((chkNotifyNewCocktails as HTMLInputElement).checked).toBe(false);
    });

    test('toggle > notify me when new cocktails are added > works when initially Never', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();

        if (profile?.notifications) profile.notifications.onNewCocktailAdditions = CocktailUpdatedNotificationModel.Never;

        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountNotificationsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        expect(document.title).toBe('Account Notification Settings');
        await screen.findByText('Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');

        const el = await screen.findByTestId('chkNotifyNewCocktails');
        const chkNotifyNewCocktails = el.firstChild as HTMLInputElement;
        expect(chkNotifyNewCocktails).not.toBeNull();
        expect((chkNotifyNewCocktails as HTMLInputElement).checked).toBe(false);

        fireEvent.click(chkNotifyNewCocktails);
        expect((chkNotifyNewCocktails as HTMLInputElement).checked).toBe(true);
    });

    test('toggle > notify me when new cocktails are added > saves correctly', async () => {
        const savedProfile = getTestOwnedAccountProfile();

        if (savedProfile?.notifications) savedProfile.notifications.onNewCocktailAdditions = CocktailUpdatedNotificationModel.Never;

        server.use(
            http.put(
                'http://localhost:2/v1/accounts/owned/profile/notifications',
                async ({ request }) => {
                    // Verify the request body contains the expected data
                    const body = (await request.json()) as UpdateAccountOwnedNotificationSettingsRq;
                    expect(body.onNewCocktailAdditions).toBe('never'); // Verify it's sending lowercase

                    return HttpResponse.json<AccountOwnedProfileRs>(savedProfile, {
                        status: 200,
                        statusText: 'OK'
                    });
                },
                { once: true }
            )
        );

        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();

        if (profile?.notifications) profile.notifications.onNewCocktailAdditions = CocktailUpdatedNotificationModel.Always;

        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountNotificationsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        expect(document.title).toBe('Account Notification Settings');
        await screen.findByText('Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');

        const el = await screen.findByTestId('chkNotifyNewCocktails');
        const chkNotifyNewCocktails = el.firstChild as HTMLInputElement;
        expect(chkNotifyNewCocktails).not.toBeNull();

        const isChecked = (chkNotifyNewCocktails as HTMLInputElement).checked;
        fireEvent.click(chkNotifyNewCocktails);
        const newIsChecked = (chkNotifyNewCocktails as HTMLInputElement).checked;

        if (isChecked) {
            expect(newIsChecked).toBe(false);
        } else {
            expect(newIsChecked).toBe(true);
        }

        const btn = await screen.findByTestId('btnSubmitNotifications');
        fireEvent.click(btn);

        // Wait for the API call and async state updates to complete
        await waitFor(() => {});
    });
});
