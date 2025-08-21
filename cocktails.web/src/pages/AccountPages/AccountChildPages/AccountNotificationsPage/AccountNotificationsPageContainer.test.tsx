import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import { http, HttpResponse } from 'msw';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountNotificationsPageContainer from './AccountNotificationsPageContainer';
import { AccountOwnedProfileRs, CocktailUpdatedNotificationModel } from '../../../../api/cocktailsApi/cocktailsApiClient';
import SessionStorageService from '../../../../services/SessionStorageService';
import { getTestAccountInfo, getTestOwnedAccountProfile, server } from '../../../../../tests/setup';

describe('Account Notifications Page Container', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders account notifications page container', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountNotificationsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        expect(document.title).toBe('Account Notification Settings');
        await screen.findByText('Account Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');
    });

    test('toggle > notify me when new cocktails are added > works when initially Always', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        const profile = getTestOwnedAccountProfile();
        profile.notifications.onNewCocktailAdditions = CocktailUpdatedNotificationModel.Always;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountNotificationsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        expect(document.title).toBe('Account Notification Settings');
        await screen.findByText('Account Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');

        const el = await screen.findByTestId('chkNotifyNewCocktails');
        const chkNotifyNewCocktails = el.firstChild as HTMLInputElement;
        expect(chkNotifyNewCocktails).not.toBeNull();
        expect((chkNotifyNewCocktails as HTMLInputElement).checked).toBe(true);

        fireEvent.click(chkNotifyNewCocktails);
        expect((chkNotifyNewCocktails as HTMLInputElement).checked).toBe(false);
    });

    test('toggle > notify me when new cocktails are added > works when initially Never', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        const profile = getTestOwnedAccountProfile();
        profile.notifications.onNewCocktailAdditions = CocktailUpdatedNotificationModel.Never;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountNotificationsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        expect(document.title).toBe('Account Notification Settings');
        await screen.findByText('Account Notification Settings');
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

        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        const profile = getTestOwnedAccountProfile();
        profile.notifications.onNewCocktailAdditions = CocktailUpdatedNotificationModel.Always;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountNotificationsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        expect(document.title).toBe('Account Notification Settings');
        await screen.findByText('Account Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');

        const el = await screen.findByTestId('chkNotifyNewCocktails');
        const chkNotifyNewCocktails = el.firstChild as HTMLInputElement;
        expect(chkNotifyNewCocktails).not.toBeNull();
        expect((chkNotifyNewCocktails as HTMLInputElement).checked).toBe(true);

        fireEvent.click(chkNotifyNewCocktails);
        expect((chkNotifyNewCocktails as HTMLInputElement).checked).toBe(false);

        const btn = await screen.findByTestId('btnSubmitNotifications');
        fireEvent.click(btn);
    });
});
