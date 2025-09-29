import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import MainAppBarMenu from './MainAppBarMenu';
import SessionStorageService from '../../services/SessionStorageService';
import GlobalContext from '../../components/GlobalContexts';
import { getTestOwnedAccountProfile, getTestUser } from '../../../tests/setup';
import { Auth0ReactTester } from '../../auth0Mocks';
import { auth0ProviderOptions } from '../../utils/authConfig';
import { Auth0Provider } from '../../components/Auth0Provider';

describe('Main App Bar Menu', () => {
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
                        <MainAppBarMenu testId='app-bar-menu' isXs={false} />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByTestId('app-bar-menu');
        expect(el).toBeDefined();
    });

    test.each([
        [true, false, false, true, false], // xs and un-authenticated and not popped
        [true, false, true, true, true], // xs and un-authenticated and popped
        [true, true, false, false, false], // xs and authenticated and not popped
        [true, true, true, false, false], // xs and authenticated and popped
        [false, true, true, false, false], // not-xs and authenticated and popped
        [false, true, false, false, false], // not-xs and authenticated and not-popped
        [false, false, true, false, false], // not-xs and un-authenticated and popped
        [false, false, false, false, false] // not-xs and un-authenticated and not-popped
    ])('renders signin menu item when xs:%s and authed:%s and menu popped:%s  => defined:(%s) visibility:(%s)', async (isXs, authed, popped, expectedDefined, expectedVisible) => {
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
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </Auth0Provider>
                </GlobalContext>
            )
        );

        if (popped) {
            await act(async () => {
                const hamburger = await screen.findByTestId('menu-hamburger');
                hamburger.click();
            });
        }

        const el = screen.queryByTestId('m-menu-signin');

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
        [true, false, false, false, false], // xs and un-authenticated and not popped
        [true, false, true, false, false], // xs and un-authenticated and popped
        [true, true, false, true, false], // xs and authenticated and not popped
        [true, true, true, true, true], // xs and authenticated and popped
        [false, true, true, false, false], // not-xs and authenticated and popped
        [false, true, false, false, false], // not-xs and authenticated and not-popped
        [false, false, true, false, false], // not-xs and un-authenticated and popped
        [false, false, false, false, false] // not-xs and un-authenticated and not-popped
    ])('renders account menu item when xs:%s and authed:%s and menu popped:%s => defined:(%s) visibility:(%s)', async (isXs, authed, popped, expectedDefined, expectedVisible) => {
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
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </Auth0Provider>
                </GlobalContext>
            )
        );

        if (popped) {
            await act(async () => {
                const hamburger = await screen.findByTestId('menu-hamburger');
                hamburger.click();
            });
        }

        const el = screen.queryByTestId('m-menu-myaccount');

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
        [true, false, false, false, false], // xs and un-authenticated and not popped
        [true, false, true, false, false], // xs and un-authenticated and popped
        [true, true, false, true, false], // xs and authenticated and not popped
        [true, true, true, true, true], // xs and authenticated and popped
        [false, true, true, false, false], // not-xs and authenticated and popped
        [false, true, false, false, false], // not-xs and authenticated and not-popped
        [false, false, true, false, false], // not-xs and un-authenticated and popped
        [false, false, false, false, false] // not-xs and un-authenticated and not-popped
    ])('renders logout menu item when xs:%s and authed:%s and menu popped:%s => defined:(%s) visibility:(%s)', async (isXs, authed, popped, expectedDefined, expectedVisible) => {
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
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </Auth0Provider>
                </GlobalContext>
            )
        );

        if (popped) {
            await act(async () => {
                const hamburger = await screen.findByTestId('menu-hamburger');
                hamburger.click();
            });
        }

        const el = screen.queryByTestId('m-menu-logout');

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
        [true, false, false, false, false], // xs and un-authenticated and not popped
        [true, false, true, false, false], // xs and un-authenticated and popped
        [true, true, false, true, false], // xs and authenticated and not popped
        [true, true, true, true, true], // xs and authenticated and popped
        [false, true, true, false, false], // not-xs and authenticated and popped
        [false, true, false, false, false], // not-xs and authenticated and not-popped
        [false, false, true, false, false], // not-xs and un-authenticated and popped
        [false, false, false, false, false] // not-xs and un-authenticated and not-popped
    ])('renders usersettings menu item when xs:%s and authed:%s and menu popped:%s => defined:(%s) visibility:(%s)', async (isXs, authed, popped, expectedDefined, expectedVisible) => {
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
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </Auth0Provider>
                </GlobalContext>
            )
        );

        if (popped) {
            await act(async () => {
                const hamburger = await screen.findByTestId('menu-hamburger');
                hamburger.click();
            });
        }

        const el = screen.queryByTestId('m-menu-usersettings');

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

    test.each([
        [true, false, false, true, false], // xs and un-authenticated and not popped
        [true, false, true, true, true], // xs and un-authenticated and popped
        [true, true, false, true, false], // xs and authenticated and not popped
        [true, true, true, true, true], // xs and authenticated and popped
        [false, true, true, true, true], // not-xs and authenticated and popped
        [false, true, false, true, false], // not-xs and authenticated and not-popped
        [false, false, true, true, true], // not-xs and un-authenticated and popped
        [false, false, false, true, false] // not-xs and un-authenticated and not-popped
    ])('renders cocktailslist menu item when xs:%s and authed:%s and menu popped:%s => defined:(%s) visibility:(%s)', async (isXs, authed, popped, expectedDefined, expectedVisible) => {
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
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </Auth0Provider>
                </GlobalContext>
            )
        );

        if (popped) {
            await act(async () => {
                const hamburger = await screen.findByTestId('menu-hamburger');
                hamburger.click();
            });
        }

        const el = screen.queryByTestId('m-menu-cocktailslist');

        if (expectedDefined) {
            expect(el).toBeDefined();
            expect(el).toHaveTextContent('Complete Cocktails List');

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
        [true, false, false, true, false], // xs and un-authenticated and not popped
        [true, false, true, true, true], // xs and un-authenticated and popped
        [true, true, false, true, false], // xs and authenticated and not popped
        [true, true, true, true, true], // xs and authenticated and popped
        [false, true, true, true, true], // not-xs and authenticated and popped
        [false, true, false, true, false], // not-xs and authenticated and not-popped
        [false, false, true, true, true], // not-xs and un-authenticated and popped
        [false, false, false, true, false] // not-xs and un-authenticated and not-popped
    ])('renders cocktailssearch menu item when xs:%s and authed:%s and menu popped:%s => defined:(%s) visibility:(%s)', async (isXs, authed, popped, expectedDefined, expectedVisible) => {
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
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </Auth0Provider>
                </GlobalContext>
            )
        );

        if (popped) {
            await act(async () => {
                const hamburger = await screen.findByTestId('menu-hamburger');
                hamburger.click();
            });
        }

        const el = screen.queryByTestId('m-menu-cocktailssearch');

        if (expectedDefined) {
            expect(el).toBeDefined();
            expect(el).toHaveTextContent('Search Cocktail Recipes');

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
