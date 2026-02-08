import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { ToastContainer } from 'react-toastify';
import GlobalContext from '../../../../components/GlobalContexts';
import AccountChangeUsernamePageContainer from './AccountChangeUsernamePageContainer';
import { Auth0ReactTester } from '../../../../auth0Mocks';
import { Auth0Provider } from '../../../../components/Auth0Provider';
import { getTestUser, server } from '../../../../../tests/setup';
import { auth0TestProviderOptions } from '../../../../auth0Mocks/testerConstants';

describe('Account Change Username Page Container', () => {
    let auth0Tester: Auth0ReactTester;

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();
    });

    afterEach(() => {
        auth0Tester.resetSpyAuth0();
    });

    test('renders account change username page container', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountChangeUsernamePageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');
        const elements = screen.getAllByText('Change Username');
        expect(elements.length).toBe(2);

        expect(document.title).toBe('Profile Center - Change Username');
    });

    test('opens alert dialog when Change Username button is clicked', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountChangeUsernamePageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');

        // Initially, the alert dialog should not be visible
        expect(screen.queryByText('Change your username?')).not.toBeInTheDocument();
        expect(screen.queryByText('Are you sure you would like to change your username?')).not.toBeInTheDocument();

        // Click the Change Username button
        const changeUsernameButton = screen.getByTestId('btnChangeUsername');
        await userEvent.click(changeUsernameButton);

        // Alert dialog should now be visible
        expect(screen.getByText('Change your username?')).toBeInTheDocument();
        expect(screen.getByText('Are you sure you would like to change your username?')).toBeInTheDocument();
    });

    test('closes alert dialog when Cancel button is clicked', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountChangeUsernamePageContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');

        // Click the Change Username button to open the dialog
        const changeUsernameButton = screen.getByTestId('btnChangeUsername');
        await userEvent.click(changeUsernameButton);

        // Verify dialog is open
        expect(screen.getByText('Change your username?')).toBeInTheDocument();

        // Click the Cancel button in the alert dialog
        const cancelButton = screen.getByTestId('alert-modal-cancel');
        await userEvent.click(cancelButton);

        // Alert dialog should be closed
        await waitFor(() => {
            expect(screen.queryByText('Change your username?')).not.toBeInTheDocument();
            expect(screen.queryByText('Are you sure you would like to change your username?')).not.toBeInTheDocument();
        });
    });

    test('successfully changes username when confirmed in alert dialog', async () => {
        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        // Mock the API endpoint for successful username change
        server.use(
            http.put('http://localhost:2/v1/accounts/owned/profile/username', async ({ request }) => {
                const body = (await request.json()) as { username: string };

                // Verify the request body contains the new username
                expect(body.username).toBe('newusername');

                return HttpResponse.json(null, {
                    status: 204,
                    statusText: 'No Content'
                });
            })
        );

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountChangeUsernamePageContainer />
                        <ToastContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');

        // Type new username
        const usernameInput = screen.getByTestId('txtUsername') as HTMLInputElement;
        await userEvent.clear(usernameInput);
        await userEvent.type(usernameInput, 'newusername');

        // Click the Change Username button
        const changeUsernameButton = screen.getByTestId('btnChangeUsername');
        await userEvent.click(changeUsernameButton);

        // Verify dialog is open
        expect(screen.getByText('Change your username?')).toBeInTheDocument();

        // Click the confirm button in the alert dialog
        const confirmButton = screen.getByTestId('alert-modal-confirm');
        await userEvent.click(confirmButton);

        // Wait for the success toast message
        await waitFor(() => {
            expect(screen.getByText('Your username has been changed!')).toBeInTheDocument();
        });

        // Alert dialog should be closed
        await waitFor(() => {
            expect(screen.queryByText('Change your username?')).not.toBeInTheDocument();
        });
    });

    test('displays error message when username change fails', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        auth0Tester.isLogged();
        auth0Tester.user = getTestUser();

        // Mock the API endpoint for failed username change
        server.use(
            http.put('http://localhost:2/v1/accounts/owned/profile/username', async () =>
                HttpResponse.json(
                    {
                        title: 'Validation Error',
                        status: 400,
                        detail: 'Username is already taken'
                    },
                    {
                        status: 400,
                        statusText: 'Bad Request'
                    }
                )
            )
        );

        render(
            <Auth0Provider {...auth0TestProviderOptions} onClientCreated={() => auth0Tester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <AccountChangeUsernamePageContainer />
                        <ToastContainer />
                    </MemoryRouter>
                </GlobalContext>
            </Auth0Provider>
        );

        await screen.findByText('Profile Center');

        // Type new username
        const usernameInput = screen.getByTestId('txtUsername') as HTMLInputElement;
        await userEvent.clear(usernameInput);
        await userEvent.type(usernameInput, 'existingusername');

        // Click the Change Username button
        const changeUsernameButton = screen.getByTestId('btnChangeUsername');
        await userEvent.click(changeUsernameButton);

        // Verify dialog is open
        expect(screen.getByText('Change your username?')).toBeInTheDocument();

        // Click the confirm button in the alert dialog
        const confirmButton = screen.getByTestId('alert-modal-confirm');
        await userEvent.click(confirmButton);

        // Wait for the error toast message
        await waitFor(() => {
            expect(screen.getByText('We were unable to change your username. Please try again.')).toBeInTheDocument();
        });

        consoleSpy.mockRestore();
    });
});
