import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import { http, HttpResponse } from 'msw';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountAccessibilityPageContainer from './AccountAccessibilityPageContainer';
import { getTestAccountInfo, getTestOwnedAccountProfile, server } from '../../../../../tests/setup';
import { AccountOwnedProfileRs, DisplayThemeModel } from '../../../../api/cocktailsApi/cocktailsApiClient';
import SessionStorageService from '../../../../services/SessionStorageService';

describe('Account Accessibility Page Container', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders account accessibility page container', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountAccessibilityPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        await screen.findByText('Profile Center');
        await screen.findByText('Accessibility Settings');

        expect(document.title).toBe('Profile Center - Accessibility Settings');
    });

    test('toggle > dark mode > works when initially Light', async () => {
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        const profile = getTestOwnedAccountProfile();
        profile.accessibility.theme = DisplayThemeModel.Light;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountAccessibilityPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
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
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        const profile = getTestOwnedAccountProfile();
        profile.accessibility.theme = DisplayThemeModel.Dark;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountAccessibilityPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
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

        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        const profile = getTestOwnedAccountProfile();
        profile.accessibility.theme = DisplayThemeModel.Light;
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountAccessibilityPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
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
