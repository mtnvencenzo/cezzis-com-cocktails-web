import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import MainFooterBar from './MainFooterBar';

describe('Main Footer Bar', () => {
    let msalTester: MsalReactTester;

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
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-bar');
        expect(el).toBeDefined();
    });

    test('renders cocktails search link', async () => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-cocktail-search');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Cocktail Search');
    });

    test('renders cocktails list link', async () => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-cocktail-list');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Cocktail List');
    });

    test('renders about us link', async () => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-about-us');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('About Us');
    });

    test('renders contact link', async () => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-contact');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Contact');
    });

    test('renders terms of service link', async () => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-terms');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Terms of Service');
    });

    test('renders privacy link', async () => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-privacy');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Privacy Policy');
    });

    test('renders cookies link', async () => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-cookies');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Cookie Preferences');
    });

    test('renders myaccount link when not authd', async () => {
        await msalTester.isNotLogged();

        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-myaccount');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Signin');
    });

    test('doesnt render myaccount link when authd', async () => {
        await msalTester.isLogged();

        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.queryByTestId('footer-myaccount');
        expect(el).toBeNull();
    });

    test('does not render logout link when not authd', async () => {
        await msalTester.isNotLogged();

        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.queryByTestId('footer-logout');
        expect(el).toBeNull();
    });

    test('renders logout link when authd', async () => {
        await msalTester.isLogged();

        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-logout');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Logout');
    });

    test('renders copywrite with current year', async () => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByText(`© ${new Date().getFullYear()} Cezzis.com | All rights reserved.`);
        expect(el).toBeDefined();
    });

    test('clicks cookies link', async () => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-cookies');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Cookie Preferences');

        fireEvent.click(el);
    });

    test('clicks myaccount link', async () => {
        await act(async () =>
            render(
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <MainFooterBar testId='footer-bar' />
                    </MemoryRouter>
                </MsalProvider>
            )
        );

        const el = screen.getByTestId('footer-myaccount');
        expect(el).toBeDefined();
        expect(el.textContent).toBe('Signin');

        fireEvent.click(el);
    });
});
