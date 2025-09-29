import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import LoggedInAppBarMenu from './LoggedInAppBarMenu';
import GlobalContext from '../../components/GlobalContexts';
import SessionStorageService from '../../services/SessionStorageService';
import { getTestOwnedAccountProfile, getTestUser } from '../../../tests/setup';
import { Auth0ReactTester } from '../../auth0Mocks';
import { auth0ProviderOptions } from '../../utils/authConfig';
import { Auth0Provider } from '../../components/Auth0Provider';

describe('LoggedIn App Bar Menu', () => {
    let auth0Tester: Auth0ReactTester;
    const sessionStorageService = new SessionStorageService();

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders correctly', async () => {
        await act(async () =>
            render(
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <LoggedInAppBarMenu testId='loggedin-app-bar-menu' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByTestId('loggedin-app-bar-menu');
        expect(el).toBeDefined();
    });

    test.each([
        [false, false, true, false], // un-authenticated and not popped
        [false, true, true, true], // un-authenticated and popped
        [true, false, false, false], // authenticated and not popped
        [true, true, false, false] // authenticated and popped
    ])('renders signin menu item when authed:%s and menu popped:%s  => defined:(%s) visibility:(%s)', async (authed, popped, expectedDefined, expectedVisible) => {
        sessionStorage.removeItem(SessionStorageService.OwnedAccountProfileGroupCacheKey);

        if (authed) {
            sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
            await auth0Tester.isLogged();
            auth0Tester.user = getTestUser();
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                        <MemoryRouter>
                            <LoggedInAppBarMenu testId='app-bar-menu' />
                        </MemoryRouter>
                    </Auth0Provider>
                </GlobalContext>
            )
        );

        if (popped) {
            await act(async () => {
                const hamburger = await screen.findByTestId('menu-avatar');
                hamburger.click();
            });
        }

        const el = screen.queryByTestId('l-menu-signin');

        if (expectedDefined) {
            expect(el).toBeDefined();
            expect(el).toHaveTextContent('Signin');

            if (expectedVisible) {
                expect(el).toBeVisible();
            } else {
                expect(el).not.toBeVisible();
            }
        } else {
            expect(el).toBeNull();
        }
    });

    test.each([
        [false, false, false, false], // un-authenticated and not popped
        [false, true, false, false], // un-authenticated and popped
        [true, false, true, false], // authenticated and not popped
        [true, true, true, true] // authenticated and popped
    ])('renders account menu item when authed:%s and menu popped:%s => defined:(%s) visibility:(%s)', async (authed, popped, expectedDefined, expectedVisible) => {
        sessionStorage.removeItem(SessionStorageService.OwnedAccountProfileGroupCacheKey);

        if (authed) {
            sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
            await auth0Tester.isLogged();
            auth0Tester.user = getTestUser();
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                        <MemoryRouter>
                            <LoggedInAppBarMenu testId='app-bar-menu' />
                        </MemoryRouter>
                    </Auth0Provider>
                </GlobalContext>
            )
        );

        if (popped) {
            await act(async () => {
                const hamburger = await screen.findByTestId('menu-avatar');
                hamburger.click();
            });
        }

        const el = screen.queryByTestId('l-menu-myaccount');

        if (expectedDefined) {
            expect(el).toBeDefined();
            expect(el).toHaveTextContent('Billy Simms');

            if (expectedVisible) {
                expect(el).toBeVisible();
            } else {
                expect(el).not.toBeVisible();
            }
        } else {
            expect(el).toBeNull();
        }
    });

    test.each([
        [false, false, false, false], // un-authenticated and not popped
        [false, true, false, false], // un-authenticated and popped
        [true, false, true, false], // authenticated and not popped
        [true, true, true, true] // authenticated and popped
    ])('renders logout menu item when authed:%s and menu popped:%s => defined:(%s) visibility:(%s)', async (authed, popped, expectedDefined, expectedVisible) => {
        sessionStorage.removeItem(SessionStorageService.OwnedAccountProfileGroupCacheKey);

        if (authed) {
            sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
            await auth0Tester.isLogged();
            auth0Tester.user = getTestUser();
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                        <MemoryRouter>
                            <LoggedInAppBarMenu testId='app-bar-menu' />
                        </MemoryRouter>
                    </Auth0Provider>
                </GlobalContext>
            )
        );

        if (popped) {
            await act(async () => {
                const hamburger = await screen.findByTestId('menu-avatar');
                hamburger.click();
            });
        }

        const el = screen.queryByTestId('l-menu-logout');

        if (expectedDefined) {
            expect(el).toBeDefined();
            expect(el).toHaveTextContent('Logout');

            if (expectedVisible) {
                expect(el).toBeVisible();
            } else {
                expect(el).not.toBeVisible();
            }
        } else {
            expect(el).toBeNull();
        }
    });

    test.each([
        [false, false, false, false], // un-authenticated and not popped
        [false, true, false, false], // un-authenticated and popped
        [true, false, true, false], // authenticated and not popped
        [true, true, true, true] // authenticated and popped
    ])('renders usersettings menu item when authed:%s and menu popped:%s => defined:(%s) visibility:(%s)', async (authed, popped, expectedDefined, expectedVisible) => {
        sessionStorage.removeItem(SessionStorageService.OwnedAccountProfileGroupCacheKey);

        if (authed) {
            sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
            await auth0Tester.isLogged();
            auth0Tester.user = getTestUser();
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                        <MemoryRouter>
                            <LoggedInAppBarMenu testId='app-bar-menu' />
                        </MemoryRouter>
                    </Auth0Provider>
                </GlobalContext>
            )
        );

        if (popped) {
            await act(async () => {
                const hamburger = await screen.findByTestId('menu-avatar');
                hamburger.click();
            });
        }

        const el = screen.queryByTestId('l-menu-usersettings');

        if (expectedDefined) {
            expect(el).toBeDefined();
            expect(el).toHaveTextContent('Profile & settings');

            if (expectedVisible) {
                expect(el).toBeVisible();
            } else {
                expect(el).not.toBeVisible();
            }
        } else {
            expect(el).toBeNull();
        }
    });
});
