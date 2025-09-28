import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountAccessibilityPageContainer from './AccountAccessibilityPageContainer';
import { getTestOwnedAccountProfile, getTestUser, server } from '../../../../../tests/setup';
import { AccountOwnedProfileRs, DisplayThemeModel } from '../../../../api/cocktailsApi/cocktailsApiClient';
import SessionStorageService from '../../../../services/SessionStorageService';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { auth0ProviderOptions } from '../../../../utils/authConfig';
import { Auth0Provider } from '../../../../components/Auth0Provider';

describe('Account Accessibility Page Container', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account accessibility page container', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        render(
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountAccessibilityPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');
        await screen.findByText('Accessibility Settings');

        expect(document.title).toBe('Profile Center - Accessibility Settings');
    });

    test('toggle > dark mode > works when initially Light', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        const profile = getTestOwnedAccountProfile();
        profile.accessibility.theme = DisplayThemeModel.Light;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountAccessibilityPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');
        await screen.findByText('Accessibility Settings');

        expect(document.title).toBe('Profile Center - Accessibility Settings');
        await screen.findByText('Dark Mode');

        const el = await screen.findByTestId('chkTheme');
        const chkTheme = el.firstChild as HTMLInputElement;
        expect(chkTheme).not.toBeNull();
        expect((chkTheme as HTMLInputElement).checked).toBe(false);

        fireEvent.click(chkTheme);
        expect((chkTheme as HTMLInputElement).checked).toBe(true);
    });

    test('toggle > dark mode > works when initially Dark', async () => {
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        const profile = getTestOwnedAccountProfile();
        profile.accessibility.theme = DisplayThemeModel.Dark;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountAccessibilityPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');
        await screen.findByText('Accessibility Settings');

        expect(document.title).toBe('Profile Center - Accessibility Settings');
        await screen.findByText('Dark Mode');

        const el = await screen.findByTestId('chkTheme');
        const chkTheme = el.firstChild as HTMLInputElement;
        expect(chkTheme).not.toBeNull();
        expect((chkTheme as HTMLInputElement).checked).toBe(true);

        fireEvent.click(chkTheme);
        expect((chkTheme as HTMLInputElement).checked).toBe(false);
    });

    test('toggle > dark mode > saves correctly', async () => {
        const savedProfile = getTestOwnedAccountProfile();
        savedProfile.accessibility.theme = DisplayThemeModel.Dark;

        server.use(
            http.put(
                'http://localhost:0/api/v1/accounts/owned/profile/accessibility',
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
        profile.accessibility.theme = DisplayThemeModel.Light;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountAccessibilityPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');
        await screen.findByText('Accessibility Settings');

        expect(document.title).toBe('Profile Center - Accessibility Settings');
        await screen.findByText('Dark Mode');

        const el = await screen.findByTestId('chkTheme');
        const chkTheme = el.firstChild as HTMLInputElement;
        expect(chkTheme).not.toBeNull();
        expect((chkTheme as HTMLInputElement).checked).toBe(false);

        fireEvent.click(chkTheme);
        expect((chkTheme as HTMLInputElement).checked).toBe(true);

        const btn = await screen.findByTestId('btnSubmitAccessibility');
        fireEvent.click(btn);
    });
});
