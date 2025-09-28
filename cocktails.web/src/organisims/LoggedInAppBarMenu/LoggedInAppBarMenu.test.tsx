import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import LoggedInAppBarMenu from './LoggedInAppBarMenu';
import GlobalContext from '../../components/GlobalContexts';
import SessionStorageService from '../../services/SessionStorageService';
import { getTestAccountInfo, getTestOwnedAccountProfile } from '../../../tests/setup';

describe('LoggedIn App Bar Menu', () => {
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
                        <LoggedInAppBarMenu testId='loggedin-app-bar-menu' />
                    </MemoryRouter>
                </MsalProvider>
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
            await msalTester.isLogged();
            msalTester.accounts = [getTestAccountInfo()];
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <MsalProvider instance={msalTester.client}>
                        <MemoryRouter>
                            <LoggedInAppBarMenu testId='app-bar-menu' />
                        </MemoryRouter>
                    </MsalProvider>
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
            await msalTester.isLogged();
            msalTester.accounts = [getTestAccountInfo()];
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <MsalProvider instance={msalTester.client}>
                        <MemoryRouter>
                            <LoggedInAppBarMenu testId='app-bar-menu' />
                        </MemoryRouter>
                    </MsalProvider>
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
            await msalTester.isLogged();
            msalTester.accounts = [getTestAccountInfo()];
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <MsalProvider instance={msalTester.client}>
                        <MemoryRouter>
                            <LoggedInAppBarMenu testId='app-bar-menu' />
                        </MemoryRouter>
                    </MsalProvider>
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
            await msalTester.isLogged();
            msalTester.accounts = [getTestAccountInfo()];
        }

        await act(async () =>
            render(
                <GlobalContext>
                    <MsalProvider instance={msalTester.client}>
                        <MemoryRouter>
                            <LoggedInAppBarMenu testId='app-bar-menu' />
                        </MemoryRouter>
                    </MsalProvider>
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

    // test.each([
    //     [false, false, false, false], // un-authenticated and not popped
    //     [false, true, false, false], // un-authenticated and popped
    //     [true, false, true, false], // authenticated and not popped
    //     [true, true, true, true] // authenticated and popped
    // ])('renders darkmode menu item when authed:%s and menu popped:%s => defined:(%s) visibility:(%s)', async (authed, popped, expectedDefined, expectedVisible) => {
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
    //                     family_name: 'Simmy'
    //                 }
    //             }
    //         ];
    //     }

    //     await act(async () =>
    //         render(
    //             <MsalProvider instance={msalTester.client}>
    //                 <MemoryRouter>
    //                     <LoggedInAppBarMenu testId='app-bar-menu' />
    //                 </MemoryRouter>
    //             </MsalProvider>
    //         )
    //     );

    //     if (popped) {
    //         await act(async () => {
    //             const hamburger = await screen.findByTestId('menu-avatar');
    //             hamburger.click();
    //         });
    //     }

    //     const el = screen.queryByTestId('l-menu-darkmode');

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
