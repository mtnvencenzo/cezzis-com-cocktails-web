import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import MainAppBarMenu from './MainAppBarMenu';
import SessionStorageService from '../../services/SessionStorageService';
import { AccountOwnedProfileRs, DisplayThemeModel } from '../../api/cocktailsApi/cocktailsApiClient';
import GlobalContext from '../../components/GlobalContexts';

const getOwnedAccountProfile = (): AccountOwnedProfileRs => ({
    subjectId: '41598664-1466-4e3e-b28c-dfe9837e462e',
    email: 'test@tester.com',
    givenName: 'Billy',
    familyName: 'Simms',
    avatarUri: 'https://cdn.cezzis.com/account-avatars/41598664-1466-4e3e-b28c-dfe9837e462e/1e4fc827-8e47-4ebb-9f48-a81c979b3686.webp',
    loginEmail: '',
    primaryAddress: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        region: '',
        subRegion: '',
        postalCode: '',
        country: ''
    },
    displayName: '',
    accessibility: {
        theme: DisplayThemeModel.Light
    },
    favoriteCocktails: []
});

describe('Main App Bar Menu', () => {
    let msalTester: MsalReactTester;
    const sessionStorageService = new SessionStorageService();

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders correctly', async () => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainAppBarMenu testId='app-bar-menu' isXs={false} />
                    </MemoryRouter>
                </MsalProvider>
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
            sessionStorageService.SetOwnedAccountProfileRequestData(getOwnedAccountProfile());
            await msalTester.isLogged();
            msalTester.accounts = [
                {
                    homeAccountId: '',
                    username: '',
                    localAccountId: '',
                    environment: '',
                    tenantId: '',
                    idTokenClaims: {
                        given_name: 'Billy',
                        family_name: 'Simms'
                    }
                }
            ];
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <MsalProvider instance={msalTester.client}>
                        <MemoryRouter>
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </MsalProvider>
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
            sessionStorageService.SetOwnedAccountProfileRequestData(getOwnedAccountProfile());
            await msalTester.isLogged();
            msalTester.accounts = [
                {
                    homeAccountId: '',
                    username: '',
                    localAccountId: '',
                    environment: '',
                    tenantId: '',
                    idTokenClaims: {
                        given_name: 'Billy',
                        family_name: 'Simms'
                    }
                }
            ];
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <MsalProvider instance={msalTester.client}>
                        <MemoryRouter>
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </MsalProvider>
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
            sessionStorageService.SetOwnedAccountProfileRequestData(getOwnedAccountProfile());
            await msalTester.isLogged();
            msalTester.accounts = [
                {
                    homeAccountId: '',
                    username: '',
                    localAccountId: '',
                    environment: '',
                    tenantId: '',
                    idTokenClaims: {
                        given_name: 'Billy',
                        family_name: 'Simms'
                    }
                }
            ];
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <MsalProvider instance={msalTester.client}>
                        <MemoryRouter>
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </MsalProvider>
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
            sessionStorageService.SetOwnedAccountProfileRequestData(getOwnedAccountProfile());
            await msalTester.isLogged();
            msalTester.accounts = [
                {
                    homeAccountId: '',
                    username: '',
                    localAccountId: '',
                    environment: '',
                    tenantId: '',
                    idTokenClaims: {
                        given_name: 'Billy',
                        family_name: 'Simms'
                    }
                }
            ];
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <MsalProvider instance={msalTester.client}>
                        <MemoryRouter>
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </MsalProvider>
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
            sessionStorageService.SetOwnedAccountProfileRequestData(getOwnedAccountProfile());
            await msalTester.isLogged();
            msalTester.accounts = [
                {
                    homeAccountId: '',
                    username: '',
                    localAccountId: '',
                    environment: '',
                    tenantId: '',
                    idTokenClaims: {
                        given_name: 'Billy',
                        family_name: 'Simms'
                    }
                }
            ];
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <MsalProvider instance={msalTester.client}>
                        <MemoryRouter>
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </MsalProvider>
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
            sessionStorageService.SetOwnedAccountProfileRequestData(getOwnedAccountProfile());
            await msalTester.isLogged();
            msalTester.accounts = [
                {
                    homeAccountId: '',
                    username: '',
                    localAccountId: '',
                    environment: '',
                    tenantId: '',
                    idTokenClaims: {
                        given_name: 'Billy',
                        family_name: 'Simms'
                    }
                }
            ];
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <MsalProvider instance={msalTester.client}>
                        <MemoryRouter>
                            <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
                        </MemoryRouter>
                    </MsalProvider>
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

    // test.each([
    //     [true, false, false, false, false], // xs and un-authenticated and not popped
    //     [true, false, true, false, false], // xs and un-authenticated and popped
    //     [true, true, false, true, false], // xs and authenticated and not popped
    //     [true, true, true, true, true], // xs and authenticated and popped
    //     [false, true, true, false, false], // not-xs and authenticated and popped
    //     [false, true, false, false, false], // not-xs and authenticated and not-popped
    //     [false, false, true, false, false], // not-xs and un-authenticated and popped
    //     [false, false, false, false, false] // not-xs and un-authenticated and not-popped
    // ])('renders darkmode menu item when xs:%s and authed:%s and menu popped:%s => defined:(%s) visibility:(%s)', async (isXs, authed, popped, expectedDefined, expectedVisible) => {
    //     if (authed) {
    //         await msalTester.isLogged();
    //         msalTester.accounts = [
    //             {
    //                 homeAccountId: '',
    //                 username: '',
    //                 localAccountId: '',
    //                 environment: '',
    //                 tenantId: '',
    //                 idTokenClaims: {
    //                     given_name: 'Billy',
    //                     family_name: 'Simms'
    //                 }
    //             }
    //         ];
    //     }

    //     await act(async () =>
    //         render(
    //             <MsalProvider instance={msalTester.client}>
    //                 <MemoryRouter>
    //                     <MainAppBarMenu testId='app-bar-menu' isXs={isXs} />
    //                 </MemoryRouter>
    //             </MsalProvider>
    //         )
    //     );

    //     if (popped) {
    //         await act(async () => {
    //             const hamburger = await screen.findByTestId('menu-hamburger');
    //             hamburger.click();
    //         });
    //     }

    //     const el = screen.queryByTestId('m-menu-darkmode');

    //     if (expectedDefined) {
    //         expect(el).toBeDefined();
    //         expect(el).toHaveTextContent('Dark Mode');

    //         if (expectedVisible) {
    //             expect(el).toBeVisible();
    //         } else {
    //             expect(el).not.toBeVisible();
    //         }
    //     } else {
    //         expect(el).toBeNull();
    //     }
    // });
});
