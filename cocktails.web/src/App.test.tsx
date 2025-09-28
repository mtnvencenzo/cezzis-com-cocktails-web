import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import AppErrorBoundary from './components/AppErrorBoundary/AppErrorBoundary';
import { auth0ProviderOptions } from './utils/authConfig';
import { Auth0Provider } from './components/Auth0Provider';

describe('App', () => {
    test('renders app', async () => {
        render(
            <React.StrictMode>
                <Auth0Provider {...auth0ProviderOptions}>
                    <AppErrorBoundary onError={() => <h1>Something went wrong</h1>}>
                        <App />
                    </AppErrorBoundary>
                </Auth0Provider>
            </React.StrictMode>
        );

        const searchBox = await screen.findByTestId('search-box');
        expect(searchBox).toBeTruthy();
    });
});
