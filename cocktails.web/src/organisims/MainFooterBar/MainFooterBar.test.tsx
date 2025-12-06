import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainFooterBar from './MainFooterBar';
import { Auth0ReactTester } from '../../auth0Mocks';
import { Auth0Provider } from '../../components/Auth0Provider';
import { auth0TestProviderOptions } from '../../auth0Mocks/testerConstants';

describe('Main Footer Bar', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders correctly', () => {
        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <MemoryRouter>
                    <MainFooterBar testId='footer-bar' />
                </MemoryRouter>
            </Auth0Provider>
        );

        const el = screen.getByTestId('footer-bar');
        expect(el).toBeDefined();
    });

    test('renders cocktails search link', async () => {
        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByTestId('footer-cocktail-search');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Cocktail Search');
    });

    test('renders cocktails list link', async () => {
        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByTestId('footer-cocktail-list');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Cocktail List');
    });

    test('renders about us link', async () => {
        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByTestId('footer-about-us');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('About Us');
    });

    test('renders contact link', async () => {
        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByTestId('footer-contact');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Contact');
    });

    test('renders terms of service link', async () => {
        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByTestId('footer-terms');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Terms of Service');
    });

    test('renders privacy link', async () => {
        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByTestId('footer-privacy');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Privacy Policy');
    });

    // Disabled test('renders cookies link', async () => {
    //     await act(async () =>
    //         render(
    //             <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
    //                 <MemoryRouter>
    //                     <MainFooterBar testId='footer-bar' />
    //                 </MemoryRouter>
    //             </Auth0Provider>
    //         )
    //     );

    //     const el = screen.getByTestId('footer-cookies');
    //     expect(el).toBeDefined();
    //     expect(el.textContent).toBe('Cookie Preferences');
    // });

    test('renders myaccount link when not authd', async () => {
        auth0Tester.isNotLogged();

        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByTestId('footer-myaccount');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Signin');
    });

    test('doesnt render myaccount link when authd', async () => {
        auth0Tester.isLogged();

        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.queryByTestId('footer-myaccount');
        expect(el).toBeNull();
    });

    test('does not render logout link when not authd', async () => {
        auth0Tester.isNotLogged();

        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.queryByTestId('footer-logout');
        expect(el).toBeNull();
    });

    test('renders logout link when authd', async () => {
        auth0Tester.isLogged();

        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByTestId('footer-logout');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Logout');
    });

    test('renders copywrite with current year', async () => {
        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByText(`© ${new Date().getFullYear()} Cezzis.com | All rights reserved.`);
        expect(el).toBeDefined();
    });

    // Disabled test('clicks cookies link', async () => {
    //     await act(async () =>
    //         render(
    //             <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
    //                 <MemoryRouter>
    //                     <MainFooterBar testId='footer-bar' />
    //                 </MemoryRouter>
    //             </Auth0Provider>
    //         )
    //     );

    //     const el = screen.getByTestId('footer-cookies');
    //     expect(el).toBeDefined();
    //     expect(el.textContent).toBe('Cookie Preferences');

    //     fireEvent.click(el);
    // });

    test('clicks myaccount link', async () => {
        await act(async () =>
            render(
                <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </Auth0Provider>
            )
        );

        const el = screen.getByTestId('footer-myaccount');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Signin');

        fireEvent.click(el);
    });
});
