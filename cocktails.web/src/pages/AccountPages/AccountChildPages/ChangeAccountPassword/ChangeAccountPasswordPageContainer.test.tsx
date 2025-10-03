import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { toast } from 'react-toastify';
import GlobalContext from '../../../../components/GlobalContexts';
import ChangeAccountPasswordPageContainer from './ChangeAccountPasswordPageContainer';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { Auth0Provider } from '../../../../components/Auth0Provider';
import { getTestOwnedAccountProfile, getTestUser, server } from '../../../../../tests/setup';
import { auth0TestProviderOptions } from '../../../../auth0Mocks/testerConstants';
import SessionStorageService from '../../../../services/SessionStorageService';

vi.mock('react-toastify', async () => {
    const actual = await vi.importActual('react-toastify');
    return {
        ...actual,
        toast: {
            success: vi.fn(),
            error: vi.fn()
        }
    };
});

describe('Account Change Password Page Container', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
        vi.clearAllMocks();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account change password page container', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <ChangeAccountPasswordPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');
        const elements = screen.getAllByText('Change Password');
        expect(elements.length).toBe(2);

        expect(document.title).toBe('Profile Center - Change Password');
    });

    test('opens alert dialog when change password button is clicked', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <ChangeAccountPasswordPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');

        // Initially, the alert dialog should not be visible
        expect(screen.queryByText('Change your password?')).not.toBeInTheDocument();

        // Click the "Change Password" button
        const btn = await screen.findByTestId('btnChangePassword');
        fireEvent.click(btn);

        // The alert dialog should now be visible
        await waitFor(() => {
            expect(screen.getByText('Change your password?')).toBeInTheDocument();
        });

        expect(screen.getByText(/Are you sure you would like to change your password\?.*An email will be sent to you with instructions/)).toBeInTheDocument();
    });

    test('closes alert dialog when cancel button is clicked', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <ChangeAccountPasswordPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');

        // Click the "Change Password" button to open the dialog
        const btn = await screen.findByTestId('btnChangePassword');
        fireEvent.click(btn);

        // Wait for the dialog to appear
        await waitFor(() => {
            expect(screen.getByText('Change your password?')).toBeInTheDocument();
        });

        // Click the cancel button
        const cancelBtn = screen.getByTestId('alert-modal-cancel');
        fireEvent.click(cancelBtn);

        // The dialog should be closed
        await waitFor(() => {
            expect(screen.queryByText('Change your password?')).not.toBeInTheDocument();
        });
    });

    test('calls API endpoint and shows success message when password change is confirmed', async () => {
        let apiCallMade = false;

        server.use(
            http.put('http://localhost:0/api/v1/accounts/owned/profile/password', async ({ request }) => {
                apiCallMade = true;
                const body = await request.json();
                expect(body).toHaveProperty('email');
                expect(body.email).toBe('test@tester.com');

                return HttpResponse.json(null, {
                    status: 204,
                    statusText: 'No Content'
                });
            })
        );

        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <ChangeAccountPasswordPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');

        // Click the "Change Password" button to open the dialog
        const btn = await screen.findByTestId('btnChangePassword');
        fireEvent.click(btn);

        // Wait for the dialog to appear
        await waitFor(() => {
            expect(screen.getByText('Change your password?')).toBeInTheDocument();
        });

        // Click the confirm button
        const confirmBtn = screen.getByTestId('alert-modal-confirm');
        fireEvent.click(confirmBtn);

        // Wait for the API call to complete
        await waitFor(
            () => {
                expect(apiCallMade).toBe(true);
            },
            { timeout: 3000 }
        );

        // Verify success toast was called
        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('An email to change your password has been sent!', { position: 'top-left' });
        });

        // The dialog should be closed
        await waitFor(() => {
            expect(screen.queryByText('Change your password?')).not.toBeInTheDocument();
        });
    });

    test('shows error message when API call fails', async () => {
        server.use(
            http.put('http://localhost:0/api/v1/accounts/owned/profile/password', () =>
                HttpResponse.json(
                    {
                        errors: ['Failed to send password reset email']
                    },
                    {
                        status: 500,
                        statusText: 'Internal Server Error'
                    }
                )
            )
        );

        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        const profile = getTestOwnedAccountProfile();
        const sessionStorageService = new SessionStorageService();
        sessionStorageService.SetOwnedAccountProfileRequestData(profile);

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <ChangeAccountPasswordPageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');

        // Click the "Change Password" button to open the dialog
        const btn = await screen.findByTestId('btnChangePassword');
        fireEvent.click(btn);

        // Wait for the dialog to appear
        await waitFor(() => {
            expect(screen.getByText('Change your password?')).toBeInTheDocument();
        });

        // Click the confirm button
        const confirmBtn = screen.getByTestId('alert-modal-confirm');
        fireEvent.click(confirmBtn);

        // Wait for the error toast to be called
        await waitFor(
            () => {
                expect(toast.error).toHaveBeenCalledWith('We were unable to initiate the password reset. Please try again.', { position: 'top-left' });
            },
            { timeout: 3000 }
        );
    });
});
