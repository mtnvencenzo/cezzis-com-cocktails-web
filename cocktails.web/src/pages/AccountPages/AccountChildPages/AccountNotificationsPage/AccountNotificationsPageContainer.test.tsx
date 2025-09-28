import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountNotificationsPageContainer from './AccountNotificationsPageContainer';
import { AccountOwnedProfileRs, CocktailUpdatedNotificationModel } from '../../../../api/cocktailsApi/cocktailsApiClient';
import SessionStorageService from '../../../../services/SessionStorageService';
import { getTestOwnedAccountProfile, getTestUser, server } from '../../../../../tests/setup';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { auth0ProviderOptions } from '../../../../utils/authConfig';
import { Auth0Provider } from '../../../../components/Auth0Provider';

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
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        render(
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
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
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        const profile = getTestOwnedAccountProfile();
        profile.notifications.onNewCocktailAdditions = CocktailUpdatedNotificationModel.Always;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
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
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        const profile = getTestOwnedAccountProfile();
        profile.notifications.onNewCocktailAdditions = CocktailUpdatedNotificationModel.Never;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
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
        savedProfile.notifications.onNewCocktailAdditions = CocktailUpdatedNotificationModel.Never;

        server.use(
            http.put(
                'http://localhost:0/api/v1/accounts/owned/profile/notifications',
                () =>
                    HttpResponse.json<AccountOwnedProfileRs>(savedProfile, {
                        status: 200,
                        statusText: 'OK'
                    }),
                { once: true }
            )
        );

        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        const profile = getTestOwnedAccountProfile();
        profile.notifications.onNewCocktailAdditions = CocktailUpdatedNotificationModel.Always;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
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
    });
});
