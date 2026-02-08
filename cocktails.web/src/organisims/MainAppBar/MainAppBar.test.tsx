import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import MainAppBar from './MainAppBar';
import { getTestUser } from '../../../tests/setup';
import { Auth0ReactTester } from '../../auth0Mocks';
import { Auth0Provider } from '../../components/Auth0Provider';
import { auth0TestProviderOptions } from '../../auth0Mocks/testerConstants';

describe('Main App Bar', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test.each([
        [true], // xs
        [false] // xs
    ])('renders correctly for xs:%s', async (isXs) => {
        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <MemoryRouter>
                    <MainAppBar testId='app-bar' isXs={isXs} />
                </MemoryRouter>
            </Auth0Provider>
        );

        const el = await screen.findByTestId('app-bar');
        expect(el).toBeDefined();
    });

    test.each([
        [true], // xs
        [false] // xs
    ])('renders logo correctly for xs:%s', async (isXs) => {
        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <MemoryRouter>
                    <MainAppBar testId='app-bar' isXs={isXs} />
                </MemoryRouter>
            </Auth0Provider>
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
            auth0Tester.isLogged();
            auth0Tester.user = getTestUser();
        }

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <MemoryRouter>
                    <MainAppBar testId='app-bar' isXs={isXs} />
                </MemoryRouter>
            </Auth0Provider>
        );

        await waitFor(() => {
            const menu = screen.queryByTestId('loggedin-app-bar-menu');

            if (expected) {
                expect(menu).toBeDefined();
                expect(menu).toBeVisible();
            } else {
                expect(menu).toBeNull();
            }
        });
    });

    test.each([
        [true, true, true], // xs and authed
        [true, false, true], // xs and un-authed
        [false, true, true], // not xs and authed
        [false, false, true] // not xs and un-authed
    ])('renders main menu correctly for xs:%s and authed:%s => expected (%s)', async (isXs, authed, expected) => {
        if (authed) {
            auth0Tester.isLogged();
            auth0Tester.user = getTestUser();
        }

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <MemoryRouter>
                    <MainAppBar testId='app-bar' isXs={isXs} />
                </MemoryRouter>
            </Auth0Provider>
        );

        await waitFor(() => {
            const menu = screen.queryByTestId('main-app-bar-menu');

            if (expected) {
                expect(menu).toBeDefined();
                expect(menu).toBeVisible();
            } else {
                expect(menu).toBeNull();
            }
        });
    });
});
