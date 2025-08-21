import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import MainAppBar from './MainAppBar';
import { getTestAccountInfo } from '../../../tests/setup';

describe('Main App Bar', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test.each([
        [true], // xs
        [false] // xs
    ])('renders correctly for xs:%s', async (isXs) => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainAppBar testId='app-bar' isXs={isXs} />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('app-bar');
        expect(el).toBeDefined();
    });

    test.each([
        [true], // xs
        [false] // xs
    ])('renders logo correctly for xs:%s', async (isXs) => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainAppBar testId='app-bar' isXs={isXs} />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = (await screen.findAllByTestId('logo-text-link'))[0] as HTMLAnchorElement;
        expect(el).toBeDefined();
        expect(el.href).toBe('http://localhost:3000/');

        const img = (await screen.findAllByTestId('logo-icon-link'))[0] as HTMLImageElement;
        expect(img).toBeDefined();
        expect(img.src).toBe('http://localhost:3000/src/assets/logo-42x42.png');
    });

    test.each([
        [true, true, false], // xs and authed
        [true, false, false], // xs and un-authed
        [false, true, true], // not xs and authed
        [false, false, true] // not xs and un-authed
    ])('renders logged in avatar menu correctly for xs:%s and authed:%s => expected (%s)', async (isXs, authed, expected) => {
        if (authed) {
            await msalTester.isLogged();
            msalTester.accounts = [getTestAccountInfo()];
        }

        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainAppBar testId='app-bar' isXs={isXs} />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const menu = screen.queryByTestId('loggedin-app-bar-menu');

        if (expected) {
            expect(menu).toBeDefined();
            expect(menu).toBeVisible();
        } else {
            expect(menu).toBeNull();
        }
    });

    test.each([
        [true, true, true], // xs and authed
        [true, false, true], // xs and un-authed
        [false, true, true], // not xs and authed
        [false, false, true] // not xs and un-authed
    ])('renders main menu correctly for xs:%s and authed:%s => expected (%s)', async (isXs, authed, expected) => {
        if (authed) {
            await msalTester.isLogged();
            msalTester.accounts = [getTestAccountInfo()];
        }

        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainAppBar testId='app-bar' isXs={isXs} />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const menu = screen.queryByTestId('main-app-bar-menu');

        if (expected) {
            expect(menu).toBeDefined();
            expect(menu).toBeVisible();
        } else {
            expect(menu).toBeNull();
        }
    });
});
