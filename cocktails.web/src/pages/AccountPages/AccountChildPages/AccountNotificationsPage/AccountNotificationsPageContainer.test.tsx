import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountNotificationsPageContainer from './AccountNotificationsPageContainer';
import { AccountOwnedProfileRs, CocktailUpdatedNotificationModel, DisplayThemeModel } from '../../../../api/cocktailsApi/cocktailsApiClient';
import SessionStorageService from '../../../../services/SessionStorageService';

describe('Account Notifications Page Container', () => {
    const getOwnedAccountProfile = (): AccountOwnedProfileRs => ({
        subjectId: '41598664-1466-4e3e-b28c-dfe9837e462e',
        loginEmail: 'test@test.com',
        displayName: 'Test User',
        email: 'test@tester.com',
        givenName: 'Ron',
        familyName: 'Vecchi',
        avatarUri: 'https://cdn.cezzis.com/account-avatars/41598664-1466-4e3e-b28c-dfe9837e462e/1e4fc827-8e47-4ebb-9f48-a81c979b3686.webp',
        primaryAddress: {
            addressLine1: '123 Test St',
            addressLine2: '',
            city: 'Testville',
            region: 'TS',
            subRegion: 'Test Region',
            postalCode: '12345',
            country: 'Testland'
        },
        accessibility: {
            theme: DisplayThemeModel.Light
        },
        notifications: {
            onNewCocktailAdditions: CocktailUpdatedNotificationModel.Always
        },
        favoriteCocktails: []
    });

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
        msalTester.accounts = [
            {
                homeAccountId: '',
                username: '',
                localAccountId: '',
                environment: '',
                tenantId: '',
                idTokenClaims: {
                    given_name: 'Bob',
                    family_name: 'Briggs'
                }
            }
        ];

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountNotificationsPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        expect(document.title).toBe('Profile Center - Notification Settings');

        await screen.findByText('Profile Center');
        await screen.findByText('Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');
    });

    test('toggle > notify me when new cocktails are added > works when initially Always', async () => {
        await msalTester.isLogged();

        msalTester.accounts = [
            {
                homeAccountId: '',
                username: '',
                localAccountId: '',
                environment: '',
                tenantId: '',
                idTokenClaims: {
                    given_name: 'Bob',
                    family_name: 'Briggs'
                }
            }
        ];

        const profile = getOwnedAccountProfile();
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

        expect(document.title).toBe('Profile Center - Notification Settings');

        await screen.findByText('Profile Center');
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
        await msalTester.isLogged();

        msalTester.accounts = [
            {
                homeAccountId: '',
                username: '',
                localAccountId: '',
                environment: '',
                tenantId: '',
                idTokenClaims: {
                    given_name: 'Bob',
                    family_name: 'Briggs'
                }
            }
        ];

        const profile = getOwnedAccountProfile();
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

        expect(document.title).toBe('Profile Center - Notification Settings');

        await screen.findByText('Profile Center');
        await screen.findByText('Notification Settings');
        await screen.findByText('Notify me when new cocktails are added');

        const el = await screen.findByTestId('chkNotifyNewCocktails');
        const chkNotifyNewCocktails = el.firstChild as HTMLInputElement;
        expect(chkNotifyNewCocktails).not.toBeNull();
        expect((chkNotifyNewCocktails as HTMLInputElement).checked).toBe(false);

        fireEvent.click(chkNotifyNewCocktails);
        expect((chkNotifyNewCocktails as HTMLInputElement).checked).toBe(true);
    });
});
